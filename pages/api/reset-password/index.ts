import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next'
import { COOKIES_NAMES } from '../../../constants/cookiesNames';
import AppRes, { AppResData } from '../../../lib/api/AppRes';
import randomString from '../../../lib/randomString';
import sendEmail from '../../../lib/sendEmail';
import * as crypto from "../../../lib/utils/crypto"
import getResetUrl from '../../../lib/utils/getResetUrl';
import User from '../../../services/firebase/classes/User';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AppResData>
) {
    try {
        // get location data and email
        const { email, location } = req.body;
        // check if there is an email
        if (!email) return AppRes(res, 400, "please provide an email")
        // check if user exists
        const user = new User();
        const userId = await user.getSub(email);
        if (!userId) return AppRes(res, 400, "this email doesn't exists")
        // make token
        const token = randomString();
        // encrypt token
        const hashedToken = crypto.encrypt(token);
        // save hashed token in db 
        const isUpdated = await user.updateResetToken(userId, hashedToken)
        if (!isUpdated) return AppRes(res, 400, "making reset token failed")
        // make reset password url
        const urlToSendInEmail = getResetUrl(location.protocol, location.host, token)
        // prepare data and send email to user
        await sendEmail({
            to: email,
            subject: `Reset Your password (valid for ${Number(process.env.RESET_EMAIL_COOKIE_EXPIRES)} min)`,
            text: `Reset Your password Url: ${urlToSendInEmail}`
        })
        // encrypt email and set it as cookie
        const hashedEmail = crypto.encrypt(email);
        const cookieOptions = {
            path: "/",
            secure: true,
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * Number(process.env.RESET_EMAIL_COOKIE_EXPIRES))
        }
        res.setHeader("Set-Cookie", serialize(COOKIES_NAMES.resetEmail, hashedEmail, cookieOptions))
        // return a friendly message to user
        return AppRes(res, 200, `You have ${Number(process.env.RESET_EMAIL_COOKIE_EXPIRES)} min to change your password`)
    } catch (err) {
        // catch error
        return AppRes(res, 500, (err as Error).message)
    }
}