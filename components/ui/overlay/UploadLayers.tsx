import axios, { AxiosError } from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import routes from "../../../constants/routes";
import AppContext from "../../../contexts/AppContext";
import storage from "../../../services/firebase/storage";
import Button from "../Button";
import FailedOperation from "../FailedOperation";
import UploadingLayerProgress from "../UploadingLayerProgress";

const UploadLayers = () => {
    const router = useRouter()
    const { files, user } = useContext(AppContext);
    const blobPaths = files.map((file) => URL.createObjectURL(file))
    const [error, setError] = useState<string>('')
    const [progress, setProgress] = useState<{ [x: number]: number }>({})
    // Used to store current progress for each file
    const tempObj: any = {};
    /**
     * 
     * Save Imgs To Layer
     * Upload img to Firebase Storage
     * Save img's path to Firestore
     */
    const saveImgToLayer = () => {
        // Get Layer ID
        const layerId: any = router.query.layerId;
        // Go Through Each File And Upload it to Firebase Storage
        // Save It's Path To Firestore
        files.forEach((file: File, index: number) => {
            // Meta data for file
            const metadata = { contentType: 'image/png' };
            // Img path in firebase storage
            const imgPath = `users/${user?.id}/layers/${layerId}/imgs/${file.name}`
            // Upload file and metadata to the object 'users/tom/layers/bg/mountains.png'
            const storageRef = ref(storage, imgPath);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes 
                    // uploaded and the total number of bytes to be uploaded
                    let prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    prog = Number(prog.toFixed(2))
                    // console.log('Upload is (index : ' + index + ')' + prog + '% done');
                    tempObj[index] = prog;
                    setProgress({ ...progress, ...tempObj })
                },
                (error) => {
                    console.log(error.message)
                    setError('something went wrong')
                },
                async () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        // console.log('File available at', downloadURL);
                        try {
                            const values = { layerId, imgs: [{ filename: file.name, path: downloadURL }] }
                            console.log("values: ", values)
                            await axios.post(routes.CONTENT + routes.LAYERS + routes.IMGS + routes.ADDIMG, values)
                        } catch (err) {
                            console.log((err as AxiosError).response?.data)
                            setError("Cound't save img path")
                        }
                    });
                }
            );
        })
    }

    useEffect(() => {
        if (!router.isReady) return;
        saveImgToLayer()
    }, [router.isReady]);


    return <div  >
        <h1 className={`text-lg mb-5 font-bold`}>Upload Layers {blobPaths.length > 0 && `( ${blobPaths.length} )`} </h1>
        <div className={` max-h-96 overflow-auto`} style={{ width: '600px' }}>
            {
                progress[blobPaths.length - 1] === 100 && <div className={`w-full mb-3`}><Button label="Done" onClick={router.reload} /></div>
            }
            {!error
                ? blobPaths.map((i, index) => <UploadingLayerProgress
                    key={index}
                    imgPath={i}
                    progress={progress[index] || 0}
                />)
                : <FailedOperation msg={error + '. Please reload you page!'} />}
        </div>
    </div>
}
export default UploadLayers;