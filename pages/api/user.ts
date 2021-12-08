import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { COOKIES_NAMES } from "../../constants/cookiesNames";
import apiHandler from "../../lib/api/apiHandler";
import AppRes, { AppResData } from "../../lib/api/AppRes";
import User from "../../services/firebase/classes/User";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AppResData>
) {


    const { sub: id } = req.query;

    const user = new User()

    const userData: any = await user.getUserData(id as string)
    if (!userData) {
        res.setHeader("Set-Cookie", serialize(COOKIES_NAMES.token, 'none', { maxAge: -1, path: '/' }))
        return AppRes(res, 400, "user doesn't exists")
    }


    return AppRes(res, 200, "get user success", {
        email: userData.email,
        username: userData.username,
        role: userData.role,
        isVerified: userData.isVerified,
    })
}
export default apiHandler(handler)