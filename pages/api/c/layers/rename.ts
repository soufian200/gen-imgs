import type { NextApiRequest, NextApiResponse } from 'next'
import AppRes, { AppResData } from '../../../../lib/api/AppRes'
import getPayload from '../../../../lib/api/getPayload'
import getToken from '../../../../lib/api/getToken'
import apiHandler from '../../../../lib/api/middlewares/apiHandler'
import requireJWT from '../../../../lib/api/middlewares/requireJWT'
import Layer from '../../../../services/firebase/classes/Layer'
/**
 * 
 * Handler rename layer's name
 * @param req Request
 * @param res Response
 * @returns AppRes
 */
async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AppResData>
) {
    /** Prevent GET Method */
    if (req.method === 'GET') return AppRes(res, 405, "Method not allowed")
    /** Get Current User */
    const token = getToken(req)
    const { sub } = await getPayload(token)
    /** Get LayerName From Client */
    const { layerId, layerName } = req.body;
    /** Instantiate new Layer */
    const layer = new Layer(sub as string);
    /** Get Layer Doc With Name That's Gonna Be Changed */
    const layerDoc = layer.getLayerDoc(layerId);
    const layerData = await layerDoc.get()
    if (!layerData.exists) return AppRes(res, 400, "layer not found");
    /** Check If layerId Exists With _layerName */
    const layerNames = await layer.getLayersNames()
    if (layerNames.includes(layerName)) return AppRes(res, 400, 'layer already exists')
    /** Update Layer Name */
    layerDoc.update({ folderName: layerName })
    return AppRes(res, 200, `layer '${layerData.data()?.folderName}' renamed to '${layerName}'`)
}
export default apiHandler(
    requireJWT(handler)
)