import Loader from "../Loader";

const GenerateFormProccessing = () => {
    return <>
        <Loader size={70} color="text-black" />
        <div className={`mt-4 text-center`}>
            <h1 className={`font-bold`}>Generating...</h1>
            <h1 className={`text-gray-600 mt-10`}>This is may take a while</h1>
        </div>
    </>
}

export default GenerateFormProccessing;