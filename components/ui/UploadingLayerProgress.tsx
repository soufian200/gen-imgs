
import { FC } from "react"
import Image from 'next/image';
import Loader from "./Loader";
import { AiFillCheckCircle } from "react-icons/ai";

interface IUploadingLayerCard {
    imgPath: string;
    progress: number;
}

const UploadingLayerProgress: FC<IUploadingLayerCard> = ({ progress, imgPath }) => {
    return <div className={` relative border rounded-lg w-full p-4 mb-4 hover:shadow-lg`}>
        <div
            style={{ width: `${progress}%` }}
            className={`absolute z-0 left-0 top-0 h-full bg-blue-50`}></div>

        <div className={`flex w-full relative z-10`}>
            <div className={``}>

                <div className={`w-20 h-20 border rounded-lg bg-gray-200 overflow-hidden`}>
                    {imgPath && <Image alt="trait" width="100px" height="100px" src={imgPath} layout="responsive" />}

                </div>
            </div>

            <div className={`w-full ml-3 flex flex-col justify-center `}>
                <div className={`flex justify-between  `} >
                    <div className={`mb-4`}>
                        <h1 className={` `}>{progress !== 100 ? "Uploading..." : "Completed"}</h1>
                        <h1 className={`text-gray-500 text-sm `} >{progress}%</h1>
                    </div>
                    <div >
                        {
                            progress !== 100
                                ? <Loader color="text-black" />
                                : <AiFillCheckCircle className={`text-green-400 hover:text-green-500`} size={30} />
                        }
                    </div>
                </div>
                <div className={`w-full bg-blue-200 h-1 relative overflow-hidden rounded-full`}>
                    <div style={{ width: `${progress}%` }} className={`absolute top-0 left-0 h-full bg-blue-400 rounded-full`}></div>
                </div>
            </div>
        </div>
    </div>
}

export default UploadingLayerProgress