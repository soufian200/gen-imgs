import { NextRequest, NextResponse } from 'next/server'
import { COOKIES_NAMES } from '../constants/cookiesNames';

/**
 * If User Logged in Reddirect him to Home page
 * 
*/
export function middleware(req: NextRequest) {

    // const response = NextResponse.next();

    // console.log("middleware client triggerd======")
    // FIXME: activeate below
    const token = req.cookies[COOKIES_NAMES.token]

    const { pathname } = req.nextUrl

    if (!token && pathname.includes('/c') && !pathname.includes('/api')) return NextResponse.redirect('/auth/login')

    if (token && pathname.includes('/auth') && !pathname.includes('/api')) {
        return NextResponse.redirect('/c/home')
    }





}