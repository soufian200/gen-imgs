import { NextRequest, NextResponse, NextFetchEvent } from 'next/server'
// import { setUserCookie } from '@lib/auth'

export function middleware(req: NextRequest) {
    // Add the user token to the response
    return setUserCookie(req, NextResponse.next())
}

export async function setUserCookie(
    request: NextRequest,
    response: NextResponse
) {
    const cookie = request.cookies['tom']

    if (false) {

        // response.cookie("tom", "token/tom",)
        return NextResponse.redirect("/login")


    }

    return response
}


