import { NextApiResponse } from "next";

type AppErrorData = {
    status: number;
    message: string
}

type AppSuccessData = {
    status: number;
    message: string
}

export type AppResData = {
    error?: AppErrorData;
    data?: AppSuccessData
}

const AppRes = async (res: NextApiResponse<AppResData>, status: number, message: string, payload?: any) => {

    let obj = status === 200
        ? {
            data: {
                status,
                message,
                payload
            }
        }
        : {
            error: {
                status,
                message
            }
        };

    return res.status(status).json(obj)
}

export default AppRes;