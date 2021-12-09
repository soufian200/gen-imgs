import { BiError } from "react-icons/bi"
import Center from "../common/Center"

const FailedOperation = ({ msg = "Something went wrong" }: { msg?: string }) => {
    return <Center styles={`p-40`} >
        <div className={`text-red-500 flex flex-col items-center  h-full`}>
            <BiError size={120} />
            <p  >{msg}</p>
        </div>
    </Center>
}
export default FailedOperation