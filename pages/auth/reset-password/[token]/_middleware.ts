import { NextRequest, NextResponse, NextFetchEvent } from 'next/server'
import { COOKIES_NAMES } from '../../../../constants/cookiesNames';
import routes from '../../../../constants/routes';
import * as crypto from "../../../../lib/utils/crypto";

export function middleware(req: NextRequest) {
    // Add the user token to the response
    return checkEmailCookie(req, NextResponse.next())
}

async function checkEmailCookie(
    request: NextRequest,
    response: NextResponse
) {
    // Get Cookie From Client
    const cookie = request.cookies[COOKIES_NAMES.resetEmail];
    // If Cookie Not Exists Redirect To "/reset-password" Page
    if (!cookie) return NextResponse.redirect(routes.RESETPASSWORD)
    // Decrypt Cookie And Get Original Email
    const originalEmail = crypto.decrypt(cookie);
    // If Cookie Corrupted Clear It
    if (!originalEmail) return response.clearCookie(COOKIES_NAMES.resetEmail)
    // If All Good Go To Next Res
    return response
}


