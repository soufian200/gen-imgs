const AssetSkeleton = () => {
    return <div className="animate-pulse flex flex-col mr-4 mt-4
    border
    p-4 
    rounded-lg ">
        <div className={`rounded bg-gray-200 h-56 w-56 `}></div>
        <div className={`flex flex-col mt-5`}>
            <div className={`rounded-full bg-gray-200 h-4 w-28 mb-2`}></div>
            <div className={`rounded-full bg-gray-200 h-4 w-16 mb-2`}></div>
        </div>
    </div>
}
export default AssetSkeleton