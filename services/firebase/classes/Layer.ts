import { ImgInterface, LayerInterface } from "../../../utils/interfaces";
import User from "./User";
import { nanoid } from "nanoid"


type LayerData = {
    /**
     * Layer Name
     * */
    folderName: string
}


class Layer extends User {


    private layersCollection;

    constructor(userId: string) {

        super();
        /**
         * Layers Collection For A User
         * */
        this.layersCollection = this.getUserDoc(userId).collection("layers")

    }

    /**
    * Get Layer Doc
    * */
    getLayerDoc(_layerId: string) {

        return this.layersCollection.doc(_layerId)
    }



    /**
     * Get A Layer
     * */
    async get(_layerId: string) {

        /** Get Layer Doc */
        const layerDoc = await this.getLayerDoc(_layerId).get();



        if (!layerDoc.exists) return


        return {
            id: _layerId,
            ...layerDoc.data()
        }

    }

    /**
     * Get Img Document
     * */
    getImgDoc(_layerId: string, _imgId: string) {

        return this.getLayerDoc(_layerId).collection("imgs").doc(_imgId)
    }

    /**
    * 
    * Add A Image To Layer
    * @param _layerId layer's id
    * @param _imgs ImgInterface[]
    * @return count images added
    * */
    async addImages(_layerId: string, _imgs: ImgInterface[]) {
        /** iterate over imgs and set img */
        _imgs.forEach((img) => {
            /** Generate A Layer ID */
            const imgId = nanoid();
            /** Create New Img Doc */
            const imgDoc = this.getImgDoc(_layerId, imgId);
            imgDoc.set(img)
        })
        return _imgs.length
    }

    /**
    * 
    * Add All Image Of A Layer
    * @param _layerId
    * @return ImgInterface[]
    * */
    async getLayerImgs(_layerId: string) {

        /** Collect Img To Arr */
        const imgs: any[] = [];

        /** Get Imgs Of A Layer */
        const imgsOfLayer = await this.getLayerDoc(_layerId).collection("imgs").get();

        imgsOfLayer.forEach(imgOfLayer => {

            if (imgOfLayer.exists)
                imgs.push({ id: imgOfLayer.id, ...imgOfLayer.data(), })

        })

        /** Return Layer With It's Images */
        return imgs

    }

    /**
    * Get Layers's IDs
    * */
    async getLayersIds() {


        const layersIds = await this.layersCollection.get();

        const ids: string[] = [];

        layersIds.forEach(layerId => {
            ids.push(layerId.id as string);
        })

        return ids

    }

    /**
    * Get Layers's Names
    * */
    async getLayersNames() {

        /** Get Layers IDs */
        const layersIds = await this.getLayersIds();

        /** Pending Promises */
        const pendingNames: Promise<LayerInterface>[] = []


        layersIds.forEach((layerId) => {

            /** Get Each Layer With By Its ID */
            const layerData = this.get(layerId);

            /** Push Promise To Pending Promise */
            pendingNames.push(layerData as Promise<LayerInterface>)
        })

        /** Fulfill Pending Promises Names */
        let names: LayerInterface[] = await Promise.all(pendingNames)

        /** Return Names Array */
        return names.map(name => name.folderName);

    }

    /**
    * Get 
    * */
    async getAll() {

        /** Get All Layers Of A User */
        const layersIds = await this.layersCollection.get();

        const pendingLayers: Promise<LayerInterface>[] = [];
        const pendingImgs: Promise<any>[] = [];

        layersIds.forEach((layerId) => {

            const layer = this.get(layerId.id)
            const imgs = this.getLayerImgs(layerId.id)
            pendingLayers.push(layer as Promise<LayerInterface>)
            pendingImgs.push(imgs)
        })



        const layers = await Promise.all(pendingLayers)
        const imgs = await Promise.all(pendingImgs)

        const layersOfUser = layers.map((layer, index) => {
            return {
                ...layer,
                imgs: imgs[0]
            }
        })





        return layersOfUser;
    }


    /**
     * Add A Image To Layer
     * @param _layerId Id Of Layer That's Gonna Be Changed
     * @param _imgsIds Array Of IDs Of Imgs 
     * */
    async deleteImgs(_layerId: string, _imgsIds: string[]) {

        const deletedPending = _imgsIds.map(async (_imgId) => {
            await this.getImgDoc(_layerId, _imgId).delete();
        })

        const deletedImgs = await Promise.all(deletedPending);
        return deletedImgs.length

    }

    private async _getImgsIdsOfLayer(_layerId: string) {
        const imgsOfLayer = await this.getLayerDoc(_layerId).collection("imgs").get();
        const imgsIds: string[] = [];
        imgsOfLayer.forEach((imgOfLayer) => {
            if (imgOfLayer.exists) imgsIds.push(imgOfLayer.id)
        })
        return imgsIds
    }

    /**
    * Delete One Layer Or More
    * 
    * @param _layersIds Array Of IDs of A Layer
    * @return Count Of Deleted Layers
    * 
    * */
    async delete(_layersIds: string[]) {
        /** @dev Array of Promises */
        const deletedPending = _layersIds.map(async (_layerId, index) => {
            /** Get Of Ids Of Images Of Layer Thas's Gonna Be Deleted */
            const imgsIds = await this._getImgsIdsOfLayer(_layerId)
            /** Delete Imgs Of Layer (imgs is subCollection of layer) */
            await this.deleteImgs(_layerId, imgsIds)
            /** Delete Layer */
            await this.layersCollection.doc(_layerId).delete();
            /** Return Index In Each Deletion */
            return index;
        })
        /** Resolve Pending Array */
        const deletedLayers = await Promise.all(deletedPending);
        /** How Many Layer Has Been Deleted */
        return deletedLayers.length
    }



}

export default Layer;