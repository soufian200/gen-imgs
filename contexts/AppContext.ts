import { createContext } from "react";
import { AssetImgProps } from "../components/ui/Asset";
import { FolderProps } from "../components/ui/Folder";


export enum DisplayState {
    Large = 'Large',
    SMALL = 'SMALL',
}

export enum ActionTypes {
    EDIT = "EDIT",
    DELETE = "DELETE",
    NEWFOLDER = "NEWFOLDER"
}
/**
 * User Interface
 * */
export interface UserInterface {
    id: string;
    username: string;
    email: string;
    isVerified: boolean
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
    folders: FolderProps[]
    setFolders: (folders: FolderProps[]) => void

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
     * */
    user: UserInterface | undefined
    setUser: (val: UserInterface) => void
    /**
     * 
     * Show|Hide Loader When Try To Fech  User Data
     * */
    userLoading: boolean,
    setUserLoading: (val: boolean) => void
}
const AppContext = createContext({} as ContextArgs);
export default AppContext;