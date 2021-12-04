import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { COOKIES_NAMES } from "../../../../../constants/cookiesNames";
import apiHandler from "../../../../../lib/api/apiHandler";
import AppRes, { AppResData } from "../../../../../lib/api/AppRes";
import * as crypto from "../../../../../lib/utils/crypto";
import User from "../../../../../services/firebase/classes/User";
/**
 * 
 * @param req Request
 * @param res Response
 * 
 */
const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<AppResData>
) => {
    // check password match
    const { password, passwordConfirmation } = req.body;
    if (!password || !passwordConfirmation)
        return AppRes(res, 400, "please provide passwords")
    if (password !== passwordConfirmation)
        return AppRes(res, 400, "password must match")

    // Get Cookie From Client
    const cookie = req.cookies[COOKIES_NAMES.resetEmail];
    if (!cookie)
        return AppRes(res, 400, "cookie not found")
    // Decrypt Cookie And Get Original Email
    const originalEmail = crypto.decrypt(cookie);
    if (!originalEmail)
        return AppRes(res, 400, "corrupted cookie")

    const user = new User()
    const userId = await user.getSub(originalEmail)
    if (!userId) return AppRes(res, 401, "no user found")
    const userData = await user.getUserData(userId);
    if (!userData?.resetToken) return AppRes(res, 403, "expired")
    // Get Token 
    const { token } = req.query;
    // descrypt user's resetToken property
    const decodedToken = crypto.decrypt(userData.resetToken);
    // If decodedToken And token Not Equal Or Token Hasn Expired
    const isValid = decodedToken === token && Date.now() < userData?.resetTokenExpiresIn;
    if (!isValid) return AppRes(res, 401, "invalid token")
    // uodate password
    const updated = await user.updatePassword(userId, password);
    if (!updated) return AppRes(res, 500, "fail to update password")
    // Clear Cookie
    res.setHeader("Set-Cookie", serialize(COOKIES_NAMES.resetEmail, 'none', { maxAge: -1, path: '/' }))
    return AppRes(res, 200, "password has been updated")
}
export default apiHandler(handler);