import type { NextApiRequest, NextApiResponse } from 'next'
import { nanoid } from 'nanoid'
import { FolderProps } from '../../../../components/ui/Folder'
import AppRes, { AppResData } from '../../../../lib/api/AppRes'
import getPayload from '../../../../lib/api/getPayload'
import getToken from '../../../../lib/api/getToken'
import apiHandler from '../../../../lib/api/middlewares/apiHandler'
import requireJWT from '../../../../lib/api/middlewares/requireJWT'
import Layer from '../../../../services/firebase/classes/Layer'
/**
 * 
 * Handler add new layer
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
    /** Instantiate new Layer */
    const layer = new Layer(sub as string);
    /** Get LayerName From Client */
    const { layerName } = req.body;
    if (!layerName) return AppRes(res, 400, "Please provide layerName")
    /** Generate A Layer ID */
    const layerId = nanoid();
    /** Create New Doc Layer */
    const layerDoc = layer.getLayerDoc(layerId);
    /** Check If layerId Exists With _layerName */
    const layerNames = await layer.getLayersNames()
    if (layerNames.includes(layerName)) return AppRes(res, 400, 'layer already exists')
    /** Add Layer To User's Layers */
    const createdAt = Date.now();
    const folderName = `${layerNames.length + 1}-${layerName}`
    layerDoc.set({ folderName, createdAt })
    /** Return newLayer (newFolder) */
    const newFolder: FolderProps = { id: layerDoc.id, folderName, createdAt, imgs: [] }
    return AppRes(res, 200, `'${layerName}' layer has been created`, newFolder)
}
export default apiHandler(handler)