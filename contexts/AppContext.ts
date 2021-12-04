import { createContext } from "react";
import { AssetImgProps } from "../components/ui/Asset";
import { AssetProps } from "../components/ui/AssetContainer";


export enum DisplayState {
    Large = 'Large',
    SMALL = 'SMALL',
}

export enum ActionTypes {
    EDIT = "EDIT",
    DELETE = "DELETE",
}
/**
 * User Interface
 * */
export interface UserInterface {
    username: string;
    email: string;
}
export interface ContextArgs {

    /**
     *  display assets in the page
     * */
    display: DisplayState
    setDisplay: (type: DisplayState) => void


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


    overlayActionType: ActionTypes
    setOverlayActionType: (type: ActionTypes) => void
    /**
     * 
     * User
     * 
     * */
    user: UserInterface | undefined
    setUser: (val: UserInterface) => void
}
const AppContext = createContext({} as ContextArgs);



export default AppContext;