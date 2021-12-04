import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { COOKIES_NAMES } from "../../../constants/cookiesNames";
import AppRes, { AppResData } from "../../../lib/api/AppRes";
import User from "../../../services/firebase/classes/User";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AppResData>
) {

    const { email, password } = req.body;

    // create new user 
    const user = new User();



    const userData = await user.login(email, password);
    if (!('token' in userData)) return AppRes(res, 400, "email or password incorrect")

    const cookieOptions = {
        path: "/",
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * Number(process.env.JWT_COOKIE_EXPIRES_IN)) // 24h | 1day
    }
    res.setHeader("Set-Cookie", serialize(COOKIES_NAMES.token, userData.token as string, cookieOptions))


    return AppRes(res, 200, "login success")
}