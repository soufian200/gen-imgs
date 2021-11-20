import { FC, useContext } from "react";
import Image from "next/image"
import classNames from "classnames";
import AppContext, { DisplayState } from "../../contexts/AppContext";
import AssetContainer, { AssetProps } from "./AssetContainer";
import punk from "../../assets/unnamed.png"

export interface AssetImgProps extends AssetProps {
    path: string
}
const Asset: FC<AssetImgProps> = ({ id, title, createdAt, path }) => {

    const { display } = useContext(AppContext)

    return <AssetContainer id={id} title={title} createdAt={createdAt} >
        <div className={classNames(`bg-gray-200 w-36 h-40 rounded-lg overflow-hidden `, { "h-160 w-160": display == DisplayState.SMALL }, { "h-260 w-260": display == DisplayState.Large })} >
            <Image src={path} width={260} height={260} />
        </div>
    </AssetContainer>


}

export default Asset;