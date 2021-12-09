import { BiError } from "react-icons/bi"
import { RiFolderOpenLine } from "react-icons/ri"
import Center from "../common/Center"

const Empty = ({ msg = "There are no items" }: { msg?: string }) => {
    return <Center styles={`p-40`} >
        <div className={`text-gray-400 flex flex-col items-center  h-full`}>
            <RiFolderOpenLine size={120} />
            <p  >{msg}</p>
        </div>
    </Center>
}

export default Empty