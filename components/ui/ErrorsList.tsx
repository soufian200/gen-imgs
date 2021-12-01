/**
 * 
 * @param errors Errors Return From Server
 * 
 */
const ErrorsList = ({ errors }: { errors: string[] }) => {
    return <>
        {errors.length > 0 &&
            <div className={` text-red-500 my-5`}>
                {errors.length > 0 &&
                    errors.map((error, index) => <li key={index} className={` text-sm capitalize ml-2`}> {error} </li>)
                }
            </div>
        }</>
}
export default ErrorsList;