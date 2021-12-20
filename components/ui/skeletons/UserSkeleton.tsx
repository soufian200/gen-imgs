const UserSkeleton = () => {
    return <div className="animate-pulse flex items-center space-x-8">
        <div className={`rounded bg-gray-200 h-8 w-20`}></div>
        <div className={`flex items-center`}>
            <div className="rounded-full bg-gray-200 h-10 w-10"></div>
            <div className={`rounded-full bg-gray-200 h-4 w-16 ml-1`}></div>
        </div>
    </div>
}
export default UserSkeleton