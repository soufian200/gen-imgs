import { NextApiRequest, NextApiResponse } from "next";
import AppRes from "../AppRes";


const apiHandler = (handler: any) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {

        try {

            return await handler(req, res)

        } catch (err) {
            console.log('========== from apiHandler ==========')
            console.log((err as Error).message)
            return AppRes(res, 500, (err as Error).message)
        }
    }
}

export default apiHandler;