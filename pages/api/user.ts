import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { COOKIES_NAMES } from "../../constants/cookiesNames";
import AppRes, { AppResData } from "../../lib/api/AppRes";
import getPayload from "../../lib/api/getPayload";
import getToken from "../../lib/api/getToken";
import apiHandler from "../../lib/api/middlewares/apiHandler";
import requireJWT from "../../lib/api/middlewares/requireJWT";
import User from "../../services/firebase/classes/User";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AppResData>
) {
    /** Prevent any method except GET */
    if (req.method !== 'GET') {
        return AppRes(res, 405, "Method not allowed")
    }


    /** Get token from cookies */
    const token = getToken(req)

    /** Get user id */
    const { sub } = await getPayload(token)
    /** Instantiate new user */
    const user = new User()
    /** Get user from DB */
    const userData: any = await user.getUserData(sub as string)
    /** If There is no user remove token from cookies */
    if (!userData) {
        res.setHeader("Set-Cookie", serialize(COOKIES_NAMES.token, 'none', { maxAge: -1, path: '/' }))
        return AppRes(res, 400, "user doesn't exists")
    }
    return AppRes(res, 200, "get user success", {
        id: sub,
        email: userData.email,
        username: userData.username,
        role: userData.role,
        isVerified: userData.isVerified,
    })
}
export default apiHandler(handler)