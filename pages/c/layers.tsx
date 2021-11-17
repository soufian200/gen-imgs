
import Main from "../../components/ui/Main";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import { FC, useContext, useEffect, useState } from 'react';
import Asset from '../../components/ui/Asset';
import AppContext from "../../contexts/AppContext";
import { AiFillFolder } from "react-icons/ai";
import classNames from "classnames";
import Folder from "../../components/ui/Folder";
import getItemsIds from "../../lib/getItemsIds";





const Layers = () => {









    const { setSelectedFoldersIds, folders, setToSelect } = useContext(AppContext);









    useEffect(() => {

        // items to be select in layer page
        const ids = getItemsIds(folders);
        setToSelect(ids)

        // reset selected ids
        setSelectedFoldersIds([])

    }, [])




    return <Main>

        <div className={`flex flex-wrap w-full`}>
            {
                folders.map((folder, index) => <Folder
                    key={folder.id}
                    id={folder.id}
                    title={index + 1}
                    createdAt={folder.createdAt}

                />)
            }
        </div>
    </Main >

}

export default Layers;