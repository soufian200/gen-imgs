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
    selectedFoldersIds: string[]
    setSelectedFoldersIds: (vals: string[]) => void


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
    toSelect: any[]
    setToSelect: (items: any[]) => void
}
const AppContext = createContext({} as ContextArgs);

export default AppContext;