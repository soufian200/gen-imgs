import { NextRequest, NextResponse } from 'next/server'
import { COOKIES_NAMES } from '../../constants/cookiesNames';
import routes from '../../constants/routes';
/**
 * If User Logged in Reddirect him to Home page
 * 
*/
export function middleware(req: NextRequest) {

    const response = NextResponse.next();

    const token = req.cookies[COOKIES_NAMES.token]



    if (token) {
        return NextResponse.redirect(routes.CONTENT + routes.HOME)
    }

    return response
}