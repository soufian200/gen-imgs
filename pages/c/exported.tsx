import { useContext, useEffect } from "react";
import Asset from "../../components/ui/Asset";
import Main from "../../components/ui/Main";
import AppContext from "../../contexts/AppContext";
import getItemsIds from "../../lib/getItemsIds";



const Exported = () => {

    const { exported, setItemsIds, setSelectedIds } = useContext(AppContext);

    useEffect(() => {

        // items to be select in layer page
        const ids = getItemsIds(exported);
        setItemsIds(ids)

        // reset selected ids
        setSelectedIds([])
    }, [])


    return <Main>
        <div className={`flex flex-wrap w-full`}>
            {
                exported.map((item, index) => <Asset
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

export default Exported;