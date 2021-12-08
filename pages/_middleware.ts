import { NextRequest, NextResponse } from 'next/server'
import { COOKIES_NAMES } from '../constants/cookiesNames';
import routes from '../constants/routes';
import jwt from 'jsonwebtoken'
/**
 * If User Logged in Reddirect him to Home page
 * 
*/
export function middleware(req: NextRequest) {

    const response = NextResponse.next();

    const token = req.cookies[COOKIES_NAMES.token]

    // if (token) {
    //     try {
    //         // Get Decode JWT Token
    //         let { exp }: any = jwt.verify(token, String(process.env.JWT_SECRET));



    //         if (Date.now() > exp * 1000) {
    //             console.log('token has expired budy: ')
    //             response.clearCookie(COOKIES_NAMES.token)
    //         }
    //     } catch (err: any) {
    //         console.log('token err: ')
    //         // If Token Valid Clear JWT Token Cookie
    //         response.clearCookie(COOKIES_NAMES.token)
    //     }
    // }

    const pathname = req.nextUrl.pathname

    if (!token && pathname.includes('/c') && !pathname.includes('/api')) return NextResponse.redirect('/auth/login')

    if (token && pathname.includes('/auth') && !pathname.includes('/api')) {
        return NextResponse.redirect('/c/home')
    }




    return response
}