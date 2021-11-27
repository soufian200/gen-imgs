import admin from "../admin";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid';



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
    private signToken(sub: string) {

        const token = jwt.sign(
            { sub },
            process.env.JWT_SECRET || "this-a-jwt-secret",
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )

        return token;
    }



    /**
    * Add A Sub
    * */
    private async addSub(_email: string) {

        const id = uuidv4()

        // map email to subs
        const emailDoc = this.subsCollection.doc(_email);
        emailDoc.set({ id })
        return id;
    }



    /**
    * Get A Sub
    * */
    private async getSub(_email: string) {

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
     * Make A User
     * */

    async signUp(_username: string, _email: string, _password: string) {


        // hash passowrd
        const hashedPassword = await this.hashPassword(_password)

        // this.addSub(_email)

        const id = await this.getSub("soufianxlm@gmail.com")

        if (id) throw new Error("This email Exists")

        // add map email & id to subs
        const newId = await this.addSub(_email)


        // add user with newId
        const newUserDoc = this.usersCollection.doc(newId)

        newUserDoc.set({

            username: _username,
            email: _email,
            password: hashedPassword

            //TODO:  add role
        });




        // generate token
        const token = this.signToken(newUserDoc.id);


        // update stats users count

        return {
            token
        }

    }



    /**
    * Login A User
    * */

    async login(_email: string, _password: string) {


        // Get Sub
        const id = await this.getSub(_email)


        // Get User
        const user = await this.getUserData(id);


        // If User Not Exists
        if (!user) throw new Error("Invalid Email")


        // Check Passowrd
        const isPasswordValid = await this.decodeHash(user.password, _password);


        // If Password Not Invalid
        if (!isPasswordValid) throw new Error("Incorrect Password")


        // Sign Token
        const token = this.signToken(id)

        return { token }

    }




}



export default User;