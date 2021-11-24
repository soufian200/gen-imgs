import { AiFillCheckCircle } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import { saveAs } from 'file-saver'
import JSZip from "jszip";



interface IData {

    msg: string
    images: Buffer[]
    metadataList: string
    jsonFiles: string[]
}

const GenerateFormFinished = ({ data }: any) => {



    /**
     * Download files: images & json
     * */

    const handleDownloadZipFiles = () => {

        var zip = new JSZip();
        const {
            images,
            metadataList,
            jsonFiles,

        }: IData = data;


        /** make zip for images folder **/
        let imagesDir: any = zip.folder("images");
        images.forEach((img: any, index: number) => {

            imagesDir.file(`${index + 1}.png`, img.data, { base64: true })
        })


        /** make zip for metadata **/
        let json: any = zip.folder("json");
        json.file("_metadata.json", metadataList);


        /* make zip for json folder */
        jsonFiles.forEach((jsonFile: string, index: number) => json.file(`${index + 1}.json`, jsonFile));


        /** save files to local **/
        zip.generateAsync({ type: "blob" }).then((content) => saveAs(content, "output.zip"))

    }





    return <>
        <div className={`text-green-400`}>
            <AiFillCheckCircle size={120} />
        </div>
        <h1 className={`mt-2 font-bold`}>Finished</h1>
        <p className={`mt-10 text-center text-gray-500`}>{data.msg}</p>


        <div
            onClick={handleDownloadZipFiles}
            title="Download Zip File"
            className={`flex bg-black border-2 border-black hover:text-black transitio cursor-pointer hover:bg-white text-white px-16 py-5 rounded-lg mt-14`}>
            <BsDownload size={25} />
            <h1 className={`ml-3 text-lg`}>Download (.zip)</h1>
        </div>
    </>
}

export default GenerateFormFinished;