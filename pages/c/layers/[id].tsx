import { useContext, useEffect, useCallback, useState, FC } from "react";
import Main from "../../../components/ui/Main"
import { useRouter } from 'next/router'
import AppContext from "../../../contexts/AppContext";
import Asset from "../../../components/ui/Asset";
import Center from "../../../components/common/Center";
import getItemsIds from "../../../lib/getItemsIds";
import { AiFillCheckCircle, } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Image from "next/image"


import { useDropzone } from 'react-dropzone'
import classNames from "classnames";
import storage from "../../../services/firebase/storage";
import Loader from "../../../components/ui/Loader";
import Button from "../../../components/ui/Button";
import { ImgInterface } from "../../../utils/interfaces";
import axios, { AxiosError } from "axios";
import routes from "../../../constants/routes";






const FolderDetail = () => {

    const router = useRouter()
    const { setItemsIds, setSelectedIds, user, userLoading } = useContext(AppContext);
    // const exported = []
    const [traits, setTraits] = useState<ImgInterface[]>([]);
    const [paths, setPaths] = useState<string[]>([])
    const [progress, setProgress] = useState<{ [x: number]: number }>({})
    const [imgs, setImgs] = useState<ImgInterface[]>([])
    const [layerId, setLayerId] = useState<string>('')
    const [imgsLoading, setImgsLoading] = useState(true)
    const tempObj: any = {};

    const getImgsOfLayer = async (_layerId: string) => {
        // console.log(router)
        // console.log(layerId)
        // return
        try {
            // setError('')
            // Show Loader
            // setLoading(true)
            // Post Data To Reset Password Api & Get Response
            const values = { layerId: _layerId }
            console.log(values)
            const res = await axios.post(routes.CONTENT + routes.LAYERS + routes.IMGS, values)
            const data = await res.data.data
            setTraits(data.payload.imgs)
            /**  Set token in local storage */
            // localStorage.setItem(COOKIES_NAMES.token, payload?.sub)
            /** Hide loader */
            setImgsLoading(false)
            // Go to Home
            // router.reload()
            console.log(data)
            // router.replace(routes.CONTENT + routes.HOME)
        } catch (err) {
            setImgsLoading(false)
            // Set Error If Post Request Wasn't Successful
            console.log((err as AxiosError).response?.data)
            // Hide Loader
            // setLoading(false)
            // console.log(err.response)
        }
    }

    const onDrop = useCallback(async (acceptedFiles) => {

        // Create Blob Path For Each file
        const blobPaths = acceptedFiles.map((file: File) => URL.createObjectURL(file))
        setPaths(blobPaths)

        // Store The Pendings Promises
        const pendings = acceptedFiles.map((file: File, index: number) => {

            // To Push Every Pending Promise
            const promises = []

            // Meta data for file
            const metadata = { contentType: 'image/png' };
            // Img path in firebase storage
            const imgPath = `users/${user?.id}/layers/${layerId}/imgs/${file.name}`

            // Upload file and metadata to the object 'users/tom/layers/bg/mountains.png'
            const storageRef = ref(storage, imgPath);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);

            // Push Promise
            promises.push(uploadTask)

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
                (snapshot) => {

                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    let prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    prog = Number(prog.toFixed(2))
                    console.log('Upload is (index : ' + index + ')' + prog + '% done');

                    tempObj[index] = prog;
                    setProgress({ ...progress, ...tempObj })


                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {

                    console.log(error.message)
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {

                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            // console.log("Something went Wrong. Please reload your page and try again :) .")
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                async () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        setImgs(urls => [...urls, { filename: file.name, path: downloadURL }])
                        console.log('File available at', downloadURL);
                        try {
                            // setError('')
                            // Show Loader
                            // setLoading(true)
                            // Post Data To Reset Password Api & Get Response
                            const values = { layerId, imgs: [{ filename: file.name, path: downloadURL }] }
                            console.log(values)
                            const res = await axios.post(routes.CONTENT + routes.LAYERS + routes.IMGS + routes.ADDIMG, values)
                            const data = await res.data.data
                            /**  Set token in local storage */
                            // localStorage.setItem(COOKIES_NAMES.token, payload?.sub)
                            /** Hide loader */
                            // setLoading(false)
                            // Go to Home
                            // router.reload()
                            console.log(data)
                            // router.replace(routes.CONTENT + routes.HOME)
                        } catch (err) {
                            // Set Error If Post Request Wasn't Successful
                            console.log((err as AxiosError).response?.data)
                            // Hide Loader
                            // setLoading(false)
                            // console.log(err.response)
                        }
                    });
                }
            );

        })

        Promise.all(pendings).then(() => {
            console.log("finished.........")
            console.log("imgs: ", imgs)


        }).catch(err => {
            console.log(err)
        })

        // await saveImgToFirestore();



    }, [userLoading])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    useEffect(() => {

        const splitedPathname = location.pathname.split('/')
        setLayerId(splitedPathname[splitedPathname.length - 1])


        // items to be select in layer page
        const ids = getItemsIds(traits);
        setItemsIds(ids)

        // reset selected ids
        setSelectedIds([])
    }, [])
    useEffect(() => {
        const { id } = router.query
        console.log(id)
        if (!id) return
        getImgsOfLayer(id)

    }, [router])










    return <Main>
        <div className={`flex flex-wrap w-full`}>

            {imgsLoading
                ? <h1>imgs Loading...</h1>
                : traits.length > 0
                    ? traits.map((item, index) => <Asset
                        key={item.id}
                        id={item.id || 'id'}
                        title={item.title}
                        createdAt={item?.createdAt || 1222}
                        path={item.path || 'pth'}

                    />)
                    : <h1>Empty</h1>
            }



            {/* {userLoading
                ? <h1>Loading...</h1>
                : traits.length === 0
                    ?
                    (paths.length > 0)
                        ? <div className={`w-full p-10`}>

                            {
                                paths.map((i, index) => <UploadingLayerCard key={index} imgPath={i} progress={progress[index] || 0} />)
                            }
                            <div className="w-full flex justify-center">
                                <Button
                                    onClick={() => router.reload()}
                                    label="Done" styles={`rounded-lg bg-blue-400  text-white `} />
                            </div>
                        </div>
                        : <Center styles={`w-full pt-10 `}>
                            <div {...getRootProps()}
                                className={classNames(`cursor-pointer w-full h-96 border-4 border-black border-dotted  rounded-xl`, { "bg-black text-white": isDragActive })}>
                                <Center styles={` h-full `}>
                                    <input {...getInputProps()} accept="image/png" />
                                    <Center styles={` flex-col `}>
                                        <div className={``}>
                                            ? <h1>Imgs Loading...</h1>           <BsImages size={120} />
                                        </div>
                                        <h1 className={`font-bold text-xl mt-12`}>Drop your image here, or <span className={`text-blue-500 `}>browse</span></h1>
                                        <h1 className={`text-gray-500 mt-2`}>Support: PNG (e.g. image_name.png)</h1>
                                    </Center>
                                </Center>
                            </div>
                        </Center>
                    : traits.map((item, index) => <Asset
                        key={item.id}
                        id={item.id || 'id'}
                        title={item.title}
                        createdAt={item?.createdAt || 1222}
                        path={item.path || 'pth'}

                    />)
            } */}
        </div>
    </Main>
}

interface IUploadingLayerCard {

    imgPath: string;
    progress: number;


}
const UploadingLayerCard: FC<IUploadingLayerCard> = ({ progress, imgPath }) => {


    return <div className={` relative border rounded-lg w-full p-4 mb-4 hover:shadow-lg`}>
        <div
            style={{ width: `${progress}%` }}
            className={`absolute z-0 left-0 top-0 h-full bg-blue-50`}></div>

        <div className={`flex w-full relative z-10`}>
            <div className={`w-1/12`}>

                <div className={`w-20 h-20 border rounded-lg bg-gray-200 overflow-hidden`}>
                    {imgPath && <Image width="100px" height="100px" src={imgPath} layout="responsive" />}

                </div>
            </div>

            <div className={`w-11/12 flex flex-col justify-center `}>
                <div className={`flex justify-between  `} >
                    <div className={`mb-4`}>
                        <h1 className={` font-bold`}>{progress !== 100 ? "Uploading..." : "Completed"}</h1>
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
export default FolderDetail;