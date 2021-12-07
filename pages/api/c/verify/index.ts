import { NextApiRequest, NextApiResponse } from "next";
import { COOKIES_NAMES } from "../../../../constants/cookiesNames";
import apiHandler from "../../../../lib/api/apiHandler";
import AppRes, { AppResData } from "../../../../lib/api/AppRes";
import verifyToken from "../../../../lib/api/verifyToken";
import User from "../../../../services/firebase/classes/User";
import { IUser } from "../../../../utils/interfaces";
import * as crypto from '../../../../lib/utils/crypto'
import Stat from "../../../../services/firebase/classes/Stat";
import { serialize } from "cookie";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AppResData>
) {
    if (req.method === 'GET') return AppRes(res, 405, 'method not allowed')
    // console.log(req.body)
    const { code } = req.body;
    // get user in jwt token
    const token = req.cookies[COOKIES_NAMES.token]
    if (!token) return AppRes(res, 401, 'token is missing')


    // get hashed code from user 
    const { sub }: any = verifyToken(token)

    const user = new User()
    // decrypt hashed code
    const userData = await user.getUserData(sub)
    if (!userData) return AppRes(res, 400, `user doesn't exists`)

    const { expiresIn, hashed } = userData;
    // check if hashed not null
    if (!hashed) return AppRes(res, 400, `there's no code hashed`)
    // check if code has expired
    if (Date.now() > expiresIn) return AppRes(res, 400, 'verification code expired')
    // hash the coming code
    const originalCode = crypto.decrypt(hashed);
    // compare code and hashed code
    if (originalCode !== code) return AppRes(res, 400, 'wrong code')
    // verify user by set isVerified to true
    const verifiedToken = await user.verify(sub);
    const stat = new Stat();
    // get unverified users count
    const unverifiedUsers = await stat.getUnverfiedUsers();
    // increase unverified users count
    stat.setUnverfiedUsers(unverifiedUsers - 1)
    // Token Cookie Option
    const cookieOptions = {
        path: "/",
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * Number(process.env.JWT_COOKIE_EXPIRES_IN)) // 24h | 1day
    }
    if (!verifiedToken) {
        throw new Error('verifiedToken not assigned')
    }
    res.setHeader("Set-Cookie", serialize(COOKIES_NAMES.token, verifiedToken as string, cookieOptions))

    return AppRes(res, 200, 'Your account has been verified.', { sub: verifiedToken })
}
export default apiHandler(handler)