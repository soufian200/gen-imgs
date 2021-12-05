/**
 * 
 * @param errors Errors Return From Server
 * 
 */
const Error = ({ error }: { error: string }) => {
    return <div className={` bg-red-100 border border-red-300 p-3 text-red-500 mb-5`}>
        <p className={` text-sm capitalize ml-2`}> {error} </p>
    </div>

}
export default Error;