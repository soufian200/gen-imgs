import { NextApiRequest, NextApiResponse } from "next";
import AppRes from "./AppRes";

const apiHandler = (handler: any) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {

        try {

            return handler(req, res)

        } catch (err) {
            return AppRes(res, 500, (err as Error).message)
        }
    }
}

export default apiHandler;