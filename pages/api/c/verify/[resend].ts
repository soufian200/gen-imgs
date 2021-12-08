import { NextApiRequest, NextApiResponse } from "next";
import { COOKIES_NAMES } from "../../../../constants/cookiesNames";
import apiHandler from "../../../../lib/api/apiHandler";
import AppRes, { AppResData } from "../../../../lib/api/AppRes";
import verifyToken from "../../../../lib/api/verifyToken";
import User from "../../../../services/firebase/classes/User";
/**
 * 
 * Resend Verification Code
 * @param req Request
 * @param res Response
 */
async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AppResData>
) {
    // Global
    const hoursToResend = Number(process.env.RESEND_VERIFICATION_CODE_AFTER);
    // get user in jwt token
    const token = req.cookies[COOKIES_NAMES.token]

    if (!token) return AppRes(res, 401, 'token is missing')

    // get hashed code from user 
    const { sub }: any = verifyToken(token)

    const user = new User()
    // decrypt hashed code
    const userData = await user.getUserData(sub)
    if (!userData) return AppRes(res, 400, `user doesn't exists`)
    console.log("userData:", userData)
    if (userData.isVerified) return AppRes(res, 200, 'already verified')
    if (Date.now() < userData?.sendAfter) {
        return AppRes(res, 403, `you cannot resend code for now. please try again after ${hoursToResend} hours`)
    }
    // How many times user try to resend code
    const sendedTimes = userData.sendedTimes;
    if (sendedTimes === 3) {
        // set send after to 1 day (24 hours)
        const sendAfter: number = Date.now() + 1000 * 60 * 60 * hoursToResend
        // set sendTimes to 0 (reset sendTimes)
        await user.getUserDoc(sub).update({
            sendedTimes: 0,
            sendAfter
        })
        // return forbidden error
        return AppRes(res, 403, `you cannot resend code for now. please try again after ${hoursToResend} hours`)
    }
    await user.sendVerificationCode(sub)
    return AppRes(res, 200, 'resend code')
}
export default apiHandler(handler)