import { AiOutlineCloseCircle } from "react-icons/ai";

interface IError {
    error: string;
    status: number
}
const GenerateFormErr = ({ err }: { err: IError | null }) => {

    return <>
        <div className={`text-red-400`}>
            <AiOutlineCloseCircle size={120} />
        </div>
        <h1 className={`mt-2 font-bold text-red-400`}>Error</h1>
        {err && <h1 className={`mt-2 text-red-500`}>{err.status === 500 ? "Something went wrong!" : err.error}</h1>}

        <h1 className={`mt-4`}>Try again!.</h1>
    </>
}

export default GenerateFormErr;