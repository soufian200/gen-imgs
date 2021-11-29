import { NextApiRequest, NextApiResponse } from "next";
import signupForm from "../../lib/schemas/singupSchema";

type AppErrorData = {
    status: number;
    message: string
}
type Data = {
    msg?: string
    error?: AppErrorData
}
interface IUser {

    username: string;
    email: string;
    password: string;
    passwordChangedAt: number;
    role: "user" | "admin";
    activated: boolean;
    createdAt: number;

}

function AppError(res: NextApiResponse<{ error: AppErrorData }>, status: number, message: string) {
    return res.status(status).json({
        error: {
            status,
            message
        }
    })
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    // Global 
    const date = new Date()

    // Allow Post Method Only
    if (req.method === "GET")
        return AppError(res, 405, "Method Not Allowed")




    // Get Data From Client

    const body = req.body;

    try {

        const { username, email, password } = await signupForm.validate(body)


        // Prepare Data For User

        const user: IUser = {
            username,
            email,
            password,
            passwordChangedAt: date.getTime(),
            role: "user",
            activated: false,
            createdAt: date.getTime(),

        }



        console.log(user)

    } catch (err) {

        return AppError(res, 400, (err as Error).message)
    }





    // console.log('-----------------------------')
    // console.log(user)


    // Check If Stats Contain A User (put role user | admin)

    // Check If User Exist

    // 



    return res.status(200).json({ msg: "sign up" })



}