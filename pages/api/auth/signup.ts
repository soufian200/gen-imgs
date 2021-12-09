import { NextApiRequest, NextApiResponse } from "next";
import signupForm from "../../../lib/schemas/singupSchema";
import { v4 as uuidv4 } from 'uuid';
import User from "../../../services/firebase/classes/User";
import Stat from "../../../services/firebase/classes/Stat";
import { IUser } from "../../../utils/interfaces";
import AppRes, { AppResData } from "../../../lib/api/AppRes";
import setJWTCookie from "../../../lib/api/setJWTCookie";
import apiHandler from "../../../lib/api/middlewares/apiHandler";
/**
 * 
 * Sign up handler
 * @param req 
 * @param res 
 * @returns AppRes
 */
async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AppResData>
) {
    console.log("hello...")
    // Global 
    const date = new Date()
    // Allow Post Method Only
    if (req.method === "GET") return AppRes(res, 405, "Method Not Allowed")
    // Get Data From Client
    const body = req.body;
    // Validate Data Coming From Client
    const { username, email, password } = await signupForm.validate(body)
    // Prepare Data For User
    let newUser: IUser = {
        id: uuidv4(),
        username,
        email,
        password,
        passwordChangedAt: date.getTime(),
        role: "user",
        isVerified: false,
        createdAt: date.getTime(),
    }
    // Instantiate Stat (for global stats)
    const stat = new Stat();
    // Instantiate User
    const user = new User();
    // Check If Email Exists
    const id = await user.getSub(email)
    if (id) return AppRes(res, 400, "Email already exists")
    // How Many User In DB
    const usersCount = await stat.getCountUsers()
    if (usersCount === 0) {
        // First User Is Admin
        newUser.role = "admin";
        newUser.isVerified = true;
    }
    // Save User In DB
    const userData = await user.signUp(newUser)
    // Send Verification Code
    console.log("userData: ", userData)
    if (usersCount > 0) {

        const isSendedorErrMsg = await user.sendVerificationCode(userData.id)
        if (!isSendedorErrMsg) return AppRes(res, 400, isSendedorErrMsg.toString())

        // get unverified users count
        const unverifiedUsers = await stat.getUnverfiedUsers();
        // increase unverified users count
        stat.setUnverfiedUsers(unverifiedUsers + 1)
    }
    // increase count of user in stats collection
    stat.increaseCountUsers(usersCount + 1)

    // Send JWT Via Cookie
    res.setHeader("Set-Cookie", setJWTCookie(userData.token))
    // Return Success Operation
    return AppRes(res, 200, "signup success", { sub: userData.token })
}
export default apiHandler(handler)