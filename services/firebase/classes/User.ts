import admin from "../admin";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as crypto from '../../../lib/utils/crypto'
import { IUser } from "../../../utils/interfaces";
import sendEmail from "../../../lib/sendEmail";



class User {

    private db;
    private usersCollection;
    private subsCollection;


    constructor() {

        // init database
        this.db = admin.firestore()

        // users collection ref
        this.usersCollection = this.db.collection('users');

        // subs collection ref
        this.subsCollection = this.db.collection('subs');


    }



    /**
    * Get User Doc
    * */
    getUserDoc(_userId: string) {

        return this.usersCollection.doc(_userId)
    }



    /**
    * Hash Password
    * */
    private async hashPassword(_password: string) {

        const saltRound = 12;
        const salt = await bcrypt.genSalt(saltRound);
        const hashedPassword = await bcrypt.hash(_password, salt)
        return hashedPassword;
    }



    /**
     * Validate User Password
     * */
    private async decodeHash(_hash: string, _data: string) {

        const isValid = await bcrypt.compare(_data, _hash)
        return isValid;
    }



    /**
    * Get a User
    * */

    private async getUser(_id: string) {

        const userDoc = this.usersCollection.doc(_id)
        const user = await userDoc.get();
        return user
    }



    /**
     * Sign A Token For A User
     * */
    private signToken(sub: string, isVerified: boolean) {

        const token = jwt.sign(
            { sub, isVerified },
            String(process.env.JWT_SECRET),
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )

        return token;
    }



    /**
    * Add A Sub
    * */
    private async addSub(_id: string, _email: string) {

        // map email to subs
        const emailDoc = this.subsCollection.doc(_email);
        emailDoc.set({ id: _id })
        return _id;
    }



    /**
    * Get A Sub
    * */
    async getSub(_email: string) {

        const sub = await this.subsCollection.doc(_email).get();
        return sub.exists ? sub.data()?.id : null;
    }



    /**
     * Get User Data
     * */

    async getUserData(_id: string) {

        const user = await this.getUser(_id);

        if (user.exists) return user.data()
        return null;
    }



    /**
     * Make A New User
     * @param _user 
     * @return token
     * */
    async signUp(_user: IUser) {
        // get user data
        const { id, password, email } = _user;
        // hash passowrd
        const hashedPassword = await this.hashPassword(password)
        // add map email & id to subs
        const newId = await this.addSub(id, email)
        // add user with newId
        const newUserDoc = this.usersCollection.doc(newId)
        // save data to firestore (firebase db)
        newUserDoc.set({ ..._user, password: hashedPassword });
        // generate token
        const token = this.signToken(newUserDoc.id, _user.isVerified || false);
        // update stats users count
        return { id, username: _user.username, email, token }

    }



    /**
    * Login A User
    * */

    async login(_email: string, _password: string) {



        // Get Sub
        const id = await this.getSub(_email)
        if (!id) return {}

        // Get User
        const user = await this.getUserData(id);


        if (!user) return {}

        // Check Passowrd
        const isPasswordValid = await this.decodeHash(user.password, _password);


        // If Password Not Invalid
        if (!isPasswordValid) return {}

        // console.log("user:", user)


        // Sign Token
        const token = this.signToken(id, user.isVerified)
        // console.log("token:", token)

        return {
            token,
            username: user.username,
            email: user.email
        }

    }
    /**
    * 
    * Update Reset Token
    * @param _userId
    * @param _resetToken
    * @return true (update success) | false (update failed)
    * */
    async updateResetToken(_userId: string, _resetToken: string | null = null,) {
        const date = new Date()
        try {
            // set hashed token and expire date to user
            await this.getUserDoc(_userId).update({
                // hashed token
                resetToken: _resetToken,
                // valid for 5 min
                resetTokenExpiresIn: !_resetToken
                    ? null
                    : date.getTime() + 1000 * 60 * Number(process.env.RESET_EMAIL_COOKIE_EXPIRES)
            })
            return true
        } catch (err) { return false }
    }
    /**
     * 
    * Update Reset Token
    * @param _userId
    * @param _newPassword
    * @return true (update success) | false (update failed)
    * */
    async updatePassword(_userId: string, _newPassword: string) {
        try {
            // hash password
            const hashedPassword = await this.hashPassword(_newPassword);

            // set hashed token and expire date to user
            await this.getUserDoc(_userId).update({
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiresIn: null,
                passwordChangedAt: Date.now()
            })

            return true
        } catch (err) { return false }
    }
    /**
     * 
     * @returns 6 random number
     */
    private generateCode() {
        const length = 6;
        let rand = '';
        for (let i = 0; i < length; i++) {
            const randNum = Math.floor(Math.random() * 10);
            if (rand.length === 0 && randNum === 0) {
                rand += 1;
            } else {
                rand += randNum;
            }
        }
        return rand
    }
    /**
     * 
     * Send Verification Code To User
     * @param _userId
     * @return if verification code sended to user's email
     */
    async sendVerificationCode(_userId: string) {
        try {


            // console.log("_userId: ", _userId)



            // check if already Verified
            const userData = await this.getUserData(_userId)


            // Generate 6 randum nums (code)
            const code = this.generateCode()
            // console.log("code: ", code)
            // hash code 
            const hashedCode = crypto.encrypt(code);
            // Valid for 2min
            const expiresIn = Date.now() + 1000 * 60 * Number(process.env.VERIFICATION_CODE_EXPIRES_IN)
            // set hashed token and expire date to user
            await this.getUserDoc(_userId).update({
                hashed: hashedCode,
                expiresIn,
                sendedTimes: (userData?.sendedTimes || 0) + 1
            })

            // sending email options
            const emailOptions = {
                to: userData?.email,
                subject: `Verification Code (valid for ${Number(process.env.VERIFICATION_CODE_EXPIRES_IN)} min)`,
                text: `Verification Code: ${code}`
            }
            // Send Verification Code To User In Email
            await sendEmail(emailOptions)
            return true
        } catch (err) {
            return (err as Error).message
        }
    }
    /**
     * 
     * @param _userId 
     * @returns true (update success) | false (error occur)
     */
    async verify(_userId: string) {
        try {
            // set hashed token and expire date to user
            await this.getUserDoc(_userId).update({
                isVerified: true,
                hashed: null,
                expiresIn: null
            })

            // update stat verified users
            // Sign Token
            const token = this.signToken(_userId, true)
            console.log("verified token:", token)


            return token
        } catch (err) { return false }
    }



}



export default User;