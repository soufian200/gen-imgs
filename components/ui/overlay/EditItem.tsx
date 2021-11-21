import { useContext, useState } from "react"
import AppContext from "../../../contexts/AppContext"
import Button from "../Button"
import Field from "../form/Field"

const EditItem = () => {

    const [value, setValue] = useState('')


    const { setIsOverlayVisible } = useContext(AppContext)



    return <div >
        <h1 className={`text-lg mb-5 font-bold`}>Edit</h1>
        <div>

            <Field
                value={value}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
            />
            <div className={`mt-5 flex items-center`}>


                <Button
                    onClick={() => setIsOverlayVisible(false)}
                    label="Cancel"
                    styles={`bg-gray-200 hover:bg-gray-300 text-black px-16 py-4 rounded-lg mr-1`}
                />
                <Button
                    onClick={() => console.log("new name: ", value)}
                    loading={false}
                    label="Save"
                    styles={`bg-blue-400 hover:bg-blue-300 px-16 py-4 rounded-lg text-white ml-1`}
                />
            </div>
        </div>
    </div>
}

export default EditItem;