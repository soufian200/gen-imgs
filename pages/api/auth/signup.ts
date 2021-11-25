import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../lib/classes/User';



type Data = {
    msg: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const user = new User();
    try {

        const r = await user.signUp("tom", "soufianxlm@gmail.com", "1234")

        // return 200
        console.log(r)
    } catch (err: any) {

        // return 400 
        console.log(err?.message)
    }
    return res.json({ msg: "signup" })
}
