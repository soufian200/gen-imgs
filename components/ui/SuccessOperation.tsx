import { AiFillCheckCircle } from "react-icons/ai";
/**
 * 
 * @param msg Message Coming From Server 
 * 
 */
const SuccessOperation = ({ msg }: { msg: string }) => {
    return <div className={`flex items-center mt-10 text-green-600 flex-col justify-center`}>
        <AiFillCheckCircle size={120} />
        <h1 className={`mt-6 capitalize`}>{msg}</h1>
    </div>
}
export default SuccessOperation;