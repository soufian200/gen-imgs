import type { NextApiRequest, NextApiResponse } from 'next'
import { TOKEN_NAMEPREFIX } from '../../../constants/config';
import Layer from '../../../services/firebase/classes/Layer';



type Data = {
    msg: string
}

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    // try {

    //     const user = new User();

    //     // get token from req

    //     // check if valid


    //     const data = await user.login("soufianxlm@gmail.com", "1234")

    //     console.log(data)

    // } catch (err: any) {

    //     // return 400 
    //     console.log(err?.message)
    // }

    // if (req.method !== 'GET') {
    //     return res.status(405).json({
    //         msg: 'Method not allowed',
    //     })
    // }

    // console.log(req.cookies)

    // 1. Get Token
    const token = req.cookies[TOKEN_NAMEPREFIX];


    // 2. Get Sub (user id) From Decode

    // const payload: UserJwtPayload = verifyToken(token);


    const id = '3ee91bdd-74b9-48bb-a27f-3c99b04e6fb2';

    try {

        const layer = new Layer(id);

        // add layer
        // const layerId = await layer.add("eyes")
        // console.log("layerId: ", layerId)


        // const names = await layer.getLayersNames()
        // console.log(names)

        // get layer
        // const layerData = await layer.get(layerId)
        // console.log("layerData: ", layerData)


        // const imgsLength = await layer.addImages(layerId, [
        //     { filename: "black#33", path: "fakepath-1" },
        //     { filename: "red#55", path: "fakepath-2" },
        // ])

        // console.log(imgsLength)



        // get all layers

        // const layers = await layer.getAll()
        // const items = await layer.getLayerImgs("eyes")
        // console.log("layers: ", layers)


        // update layer name
        // const newName = await layer.rename("7TTzK4NIanvuOe4t96Jqg", "noses");
        // console.log(newName)

        // const size = await layer.deleteImgs("y2-ZDhrRV0KIDCqaqi2q9", ["DYZeKWLtTFDHZ5AaibtFm", "SpZcwx4bEeMriCmbc6OHt"])
        const size = await layer.delete(["w1446UY3GeBp3LvSEBgKb"])
        console.log(size)



        return res.json({ msg: "create" })

    } catch (error: any) {

        console.log(error.message)

        res.status(500).json({ msg: error.message })
    }







}

export default handler;

