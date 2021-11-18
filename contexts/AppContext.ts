import { createContext } from "react";
import { AssetImgProps } from "../components/ui/Asset";
import { AssetProps } from "../components/ui/AssetContainer";

export interface ContextArgs {

    /**
     *  display assets in the page
     * */
    display: "Large" | "Small"
    setDisplay: (type: "Large" | "Small") => void


    /**
     *  if asset are reversed
     * */
    isReversed: boolean
    setIsReversed: (val: boolean) => void


    /**
    *  if asset are reversed
    * */
    selectedIds: string[]
    setSelectedIds: (vals: string[]) => void


    /**
    *  layers folders
    * */
    folders: AssetProps[]
    setFolders: (folders: AssetProps[]) => void

    /**
   *  exported items
   * */
    exported: AssetImgProps[]
    setExported: (items: AssetImgProps[]) => void


    /**
    *  which items to be select depand on current page
    * */
    itemsIds: any[]
    setItemsIds: (items: any[]) => void


    /**
    *  which items to be select depand on current page
    * */
    isOverlayVisible: boolean
    setIsOverlayVisible: (val: boolean) => void
}
const AppContext = createContext({} as ContextArgs);

export default AppContext;