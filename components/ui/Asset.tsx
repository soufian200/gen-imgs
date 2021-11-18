import classNames from "classnames";
import { FC, useContext } from "react";
import AppContext, { DisplayState } from "../../contexts/AppContext";
import AssetContainer, { AssetProps } from "./AssetContainer";

export interface AssetImgProps extends AssetProps {
    path: string
}
const Asset: FC<AssetImgProps> = ({ id, title, createdAt }) => {

    const { display } = useContext(AppContext)

    return <AssetContainer id={id} title={title} createdAt={createdAt} >
        <div className={classNames(`bg-gray-200 w-36 h-40 rounded-lg overflow-hidden `, { "h-160 w-160": display == DisplayState.SMALL }, { "h-260 w-260": display == DisplayState.Large })} ></div>
    </AssetContainer>


}

export default Asset;