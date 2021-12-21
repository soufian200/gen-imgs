
import { useState } from "react";
import axios from "axios";
import { LayerInterface } from "../../../utils/interfaces";
import { BsArrowLeft } from "react-icons/bs";
import Center from "../../../components/common/Center";
import Main from "../../../components/ui/Main";
import GenerateFormFinished from "../../../components/ui/generate/GenerateFormFinished";
import GenerateFormErr from "../../../components/ui/generate/GenerateFormErr";
import GenerateFormProccessing from "../../../components/ui/generate/GenerateFormProccessing";
import GenerateForm from "../../../components/ui/generate/GenerateForm";
import routes from "../../../constants/routes";



export interface Values {
    width: string;
    height: string;
    size: string;
    collectionName: string;
    isShuffle: boolean;
}

export interface configValsProps extends Values {
    layers: LayerInterface[];
}
const Generate = () => {

    const [loading, setLoading] = useState(false)
    const [finished, setFinished] = useState(false)
    const [data, setData] = useState([]);
    const [error, setError] = useState<{ error: string, status: number } | null>()


    // call it if request succeeded or failed
    const finish = () => {
        // hide loader
        setLoading(false)

        // allow download button to rise
        setFinished(true)
    }

    const handleOnSubmit = async (values: Values) => {


        // TODO: send layers ids

        const configVals = { ...values };

        try {

            // show loader
            setLoading(true)

            // send config value to server
            const res = await axios.post(routes.CONTENT + routes.TOOLS + routes.GENERATE, configVals)
            const { payload, message } = await res.data.data
            setData({ ...payload, msg: message as string })

            finish()


        } catch (err: any) {

            finish()

            const { data, status } = err.response

            setError({
                error: data.error || "",
                status
            })

        }

    }

    // Reset every
    const handleReset = () => {
        setFinished(false);
        setLoading(false);
        setData([])
        setError(null)
    }



    const layers = [
        {
            folderName: "bgs",
            imgs: [
                {
                    filename: 'pink#2.png',
                    path: "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Fbg%2Fpink%232.png?alt=media&token=83fee278-440b-4281-b6e7-5ebfe5c0581f",
                },
                {
                    filename: 'purple#3.png',
                    path: "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Fbg%2Fpurple%233.png?alt=media&token=0e5505e3-a938-4d2e-a900-e50ff261bf5d",
                },
                {
                    filename: 'yellow#1.png',
                    path: "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Fbg%2Fyellow%231.png?alt=media&token=a13c7ac6-88b7-4235-b4fb-bbd82886ea30"

                },

            ]
        },
        {
            folderName: "body",
            imgs: [
                {
                    filename: 'Untitled#1.png',
                    path: "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Feye%2FGreen%231.png?alt=media&token=6042142c-9c4f-4d03-8907-973414366dc9"
                },
                {
                    filename: 'Untitled#2.png',
                    path: "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Feye%2FPink%231.png?alt=media&token=73c41f95-0e85-4908-a597-646561292309"
                },
                {
                    filename: 'Untitled#3.png',
                    path: "https://firebasestorage.googleapis.com/v0/b/nfts-generator-fe3a2.appspot.com/o/layers%2Feye%2FPurple%231.png?alt=media&token=a8d42354-b190-4741-803a-9614321ec9ff"

                },
            ]
        },];



    return <Main>
        <div className={` p-10 rounded-md`}>
            <Center>

                {!loading && !finished
                    ? <GenerateForm onSubmit={handleOnSubmit} />
                    : <Center styles="flex-col h-full">
                        {!finished
                            ? <GenerateFormProccessing />
                            : <Center styles={`flex-col`}>
                                {error
                                    ? <GenerateFormErr err={error} />
                                    : <GenerateFormFinished data={data} />
                                }
                                <button
                                    onClick={handleReset}
                                    className={`flex items-center mt-3 text-blue-500 hover:text-blue-700`}>
                                    <BsArrowLeft />
                                    <h1 className={`ml-2`}>Return</h1>
                                </button>

                            </Center>
                        }
                    </Center>
                }
            </Center>
        </div>
    </Main>
}
export default Generate;