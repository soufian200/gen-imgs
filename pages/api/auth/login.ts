import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../services/firebase/classes/User';



type Data = {
    msg: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    try {

        const user = new User();

        // TODO: make sure email and password exists

        const data = await user.login("soufianxlm@gmail.com", "1234")

        console.log(data)

    } catch (err: any) {

        // return 400 
        console.log(err?.message)
    }

    return res.json({ msg: "login" })

}