import { useContext, useEffect } from "react";
import Main from "../../../components/ui/Main"
import { useRouter } from 'next/router'
import AppContext from "../../../contexts/AppContext";
import Asset from "../../../components/ui/Asset";
import Center from "../../../components/common/Center";
import getItemsIds from "../../../lib/getItemsIds";


const FolderDetail = () => {

    const router = useRouter()
    const { id } = router.query
    const { exported, setItemsIds, setSelectedIds } = useContext(AppContext);

    useEffect(() => {

        console.log(id)

        // items to be select in layer page
        const ids = getItemsIds(exported);
        setItemsIds(ids)

        // reset selected ids
        setSelectedIds([])
    }, [])
    return <Main>
        <div className={`flex flex-wrap w-full`}>
            {

            }
            {exported.length === 0
                ? <Center styles={`w-full `}>
                    <p className={`m-2 text-gray-400`}>There are no items here</p>
                </Center>
                : exported.map((item, index) => <Asset
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    createdAt={item.createdAt}
                    path={item.path}

                />)
            }
        </div>
    </Main>
}

export default FolderDetail;