import { NextApiRequest, NextApiResponse } from "next";
import signupForm from "../../lib/schemas/singupSchema";
import { v4 as uuidv4 } from 'uuid';
import User from "../../services/firebase/classes/User";
import Stat from "../../services/firebase/classes/Stat";
import { IUser } from "../../utils/interfaces";
import AppRes, { AppResData } from "../../lib/api/AppRes";






export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AppResData>
) {

    // Global 
    const date = new Date()


    // Allow Post Method Only
    if (req.method === "GET") return AppRes(res, 405, "Method Not Allowed")

    // Get Data From Client
    const body = req.body;

    try {

        const { username, email, password } = await signupForm.validate(body)

        // Prepare Data For User

        let newUser: IUser = {

            id: uuidv4(),
            username,
            email,
            password,
            passwordChangedAt: date.getTime(),
            role: "user",
            activated: false,
            createdAt: date.getTime(),

        }


        const stat = new Stat();
        const user = new User()

        const usersCount = await stat.getCountUsers()
        if (usersCount === 0) {

            // First User Is Admin
            newUser.role = "admin";
            newUser.activated = true;

        }

        // Check If Email Exists
        const id = await user.getSub(email)
        if (id) return AppRes(res, 400, "Email already exists")


        const data = await user.signUp(newUser)

        // increate count of user in stats collection
        stat.increaseCountUsers(usersCount + 1)



        console.log('=======================')
        console.log(data)

        return AppRes(res, 200, "signup")


    } catch (err) {

        return AppRes(res, 400, (err as Error).message)
    }





    // console.log('-----------------------------')
    // console.log(user)


    // Check If Stats Contain A User (put role user | admin)

    // Check If User Exist

    // 







}