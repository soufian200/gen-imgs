import { AiFillSetting, AiOutlineFileProtect, AiOutlineGif } from "react-icons/ai";
import Main from "../../components/ui/Main";
import { useRouter } from "next/router";
import routes from "../../constants/routes";
import { FC } from "react";


interface ITool {
    label: string
    description: string
    Icon: React.ReactNode
    href: string
}

interface ToolProps {
    tool: ITool
}

const Generate = () => {





    const TOOLS: ITool[] = [
        {
            label: "Generate Art",
            description: "Generate Up To 10,000 NFTs Art Easyl And In Seconds ",
            Icon: <AiOutlineFileProtect size={60} />,
            href: routes.GENERATE
        },
        {
            label: "Add IPFS ",
            description: "Change IPFS Uri and other properties in json files",
            Icon: <AiFillSetting size={60} />,
            href: routes.UPDATEJSON
        },
        {
            label: "Generate Gif Image",
            description: "Generate gif images easly",
            Icon: <AiOutlineGif size={60} />,
            href: routes.GENERATEGIF
        },

    ]


    return <Main>

        <div className={`mt-5`} >
            <div>
                <h1 className={`font-bold text-2xl`}>Tools</h1>
            </div>
            <div className={`flex flex-wrap`}>
                {
                    TOOLS.map(tool => <Tool tool={tool} />)
                }
            </div>
        </div>
    </Main>
}



/**
 * Tools Component
 * */
const Tool: FC<ToolProps> = ({ tool }) => {

    const router = useRouter()
    const handleGoToTool = (href: string) => router.push(href)


    return <div

        onClick={() => handleGoToTool(routes.CONTENT + routes.TOOLS + tool.href)}
        className={`
   w-60 h-60
    mr-4 
    mt-4
    border
    p-4 
    rounded-lg 
    hover:shadow-lg 
    cursor-pointer 
    transition duration-300
    overflow-auto `}>
        <div className={`text-blue`}>
            {
                tool.Icon
            }
        </div>
        <h1 className={`mt-6 mb-2 font-bold text`}>{tool.label}</h1>
        <p className={`text-sm text-gray-600  `}>{tool.description}</p>
    </div>
}


export default Generate;