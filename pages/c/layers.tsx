
import Main from "../../components/ui/Main";
import Navbar from "../../components/ui/Navbar";
import Sidebar from "../../components/ui/Sidebar";
import { useState } from 'react';
import Asset from '../../components/ui/Asset';




const Content = () => {

    const [display, setDisplay] = useState("large")



    return <Main>

        <div className={`flex flex-wrap w-full`}>
            {
                [1, 2, 3, 4, 5, 6, 7, 8].map((i, index) => {
                    return <Asset key={index} date="Mon, Nov 2021 - 22:41" name={(index + 1).toString()} display={display} />
                })
            }
        </div>
    </Main>

}

export default Content;