import type { NextApiRequest, NextApiResponse } from 'next'
import sendEmail from '../../lib/sendEmail'
import { nanoid } from 'nanoid'
import randomBytes from 'randombytes'
import randomString from '../../lib/randomString';



type Data = {
    msg: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const location = {
        protocol: 'http:',
        host: 'localhost:3000',

    }





    const token = randomString();
    // console.log(token)












    // console.log(getUrl())
    try {

        // const url = `${req.protocol}://${req.get('host')}/reset/1234`
        // await sendEmail({
        //     to: "soufianxlm@gmail.com",
        //     subject: `Reset Your password (valid for 5 min)`,
        //     text: "Code: 834402"
        // })

        return res.json({ msg: "send email" })
    } catch (err) {

        return res.send({ msg: (err as Error).message })
    }



}