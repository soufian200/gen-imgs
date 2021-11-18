import { useContext, useState } from "react"
import AppContext from "../../../contexts/AppContext"
import Button from "../Button"
import Field from "../form/Field"

const DeleteItem = () => {




    const { setIsOverlayVisible, selectedIds } = useContext(AppContext)



    return <div className={`p-4`}>
        <h1 className={`text-lg mb-5`}>Delete</h1>
        <div>

            <h1 className={`my-10`}> <span className={`text-red-500 `}>
                {selectedIds.length}
            </span>  items will be removed. Are you sure ?</h1>

            <div className={`mt-5 flex items-center`}>
                <Button
                    onClick={() => setIsOverlayVisible(false)}
                    label="No"
                    styles={`bg-gray-200 hover:bg-gray-300 text-black px-16 py-4 rounded-lg mr-1`}
                />
                <Button
                    onClick={() => console.log("delete: ", selectedIds)}
                    loading={false}
                    label="Yes"
                    styles={`bg-blue-400 hover:bg-blue-300 px-16 py-4 rounded-lg text-white ml-1`}
                />
            </div>
        </div>
    </div>
}

export default DeleteItem;