import { NextRequest, NextResponse } from 'next/server'
import { COOKIES_NAMES } from '../../constants/cookiesNames';
import routes from '../../constants/routes';
import jwt from 'jsonwebtoken'
/**
 * If User Not Logged in Reddirect him to Login page
 * 
*/
export function middleware(req: NextRequest) {
    // Add the user token to the response
    return verifyJwt(req, NextResponse.next())
}

export async function verifyJwt(
    request: NextRequest,
    response: NextResponse
) {
    // Get Cookie From Client
    const cookie = request.cookies[COOKIES_NAMES.token];
    // If Cookie Not Exists Redirect To "/reset-password" Page
    if (!cookie) return NextResponse.redirect(routes.LOGIN)
    try {
        // Get Decode JWT Token
        let { exp }: any = jwt.verify(cookie, String(process.env.JWT_SECRET));
        //If Token Expired Yer Go To Home
        if (Date.now() >= exp * 1000) return NextResponse.redirect(routes.LOGIN)
    } catch (err: any) {
        // If Token Valid Clear JWT Token Cookie
        response.clearCookie(COOKIES_NAMES.token)
        return NextResponse.redirect(routes.LOGIN)
    }

    return response
}


