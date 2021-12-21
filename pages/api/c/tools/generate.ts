import { NextApiRequest, NextApiResponse } from "next";
import AppRes, { AppResData } from "../../../../lib/api/AppRes";
import getPayload from "../../../../lib/api/getPayload";
import getToken from "../../../../lib/api/getToken";
import apiHandler from "../../../../lib/api/middlewares/apiHandler";
import ArtGenerator from "../../../../lib/classes/ArtGenerator";
import Layer from "../../../../services/firebase/classes/Layer";
import * as _ from 'lodash'
import { ImgInterface } from "../../../../utils/interfaces";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AppResData>
) {

    /** Prevent GET Method */
    if (req.method === 'GET') return AppRes(res, 405, "Method not allowed")
    /** Get Current User */
    const token = getToken(req)
    const { sub } = await getPayload(token)


    const {
        width,
        height,
        size,
        description,
        collectionName,
        ipfs,
        isShuffle
    } = req.body;

    /** Check Fields Exists */
    if (!width) return AppRes(res, 400, "Please provide width")
    if (!height) return AppRes(res, 400, "Please provide height")
    if (!size) return AppRes(res, 400, "Please provide size")
    if (!description) return AppRes(res, 400, "Please provide description")
    if (!collectionName) return AppRes(res, 400, "Please provide collectionName")

    /** Instantiate new Layer */
    const layer = new Layer(sub as string);
    const layersOfUser = await layer.getAll()
    const sortedLayers = _.sortBy(layersOfUser, [(i) => i.folderName]);
    const layers: any = sortedLayers.map(layer => {
        return {
            folderName: layer.folderName.split('-').pop(),
            imgs: layer.imgs.map((i: ImgInterface) => {
                return {
                    filename: i.filename,
                    path: i.path
                }
            })
        }
    })

    if (layers.length === 0) return AppRes(res, 400, "please upload layers")
    const artGenerator = new ArtGenerator(Number(height), Number(width), collectionName, ipfs || "ipfs://NewUriToReplace", description, layers, isShuffle)
    const { images, metadataList, jsonFiles } = await artGenerator.generate(Number(size))
    const msg = images.length < size
        ? `You need more layers or elements to grow your edition to ${size} artworks!`
        : `Generating ${size} artworks  Successfully `;

    return AppRes(res, 200, msg, { images, metadataList, jsonFiles })

}
export default apiHandler(handler)