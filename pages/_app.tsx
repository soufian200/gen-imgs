import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import AppContext, { ActionTypes, ContextArgs, DisplayState, LayersImgs, UserInterface } from '../contexts/AppContext'
import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import routes from '../constants/routes'
import { FolderProps } from '../components/ui/Folder'
/**
 * 
 * Set A Default API BaseUrl 
 */
axios.defaults.baseURL = String(process.env.NEXT_PUBLIC_API_BASE_URL);
/**
 * 
 * @param Component 
 * @param pageProps 
 * 
 */
function MyApp({ Component, pageProps }: AppProps) {
  // Get pathname from router
  const router = useRouter()

  const [display, setDisplay] = useState<DisplayState>(DisplayState.Large)
  const [isReversed, setIsReversed] = useState<boolean>(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [folders, setFolders] = useState<FolderProps[]>([])
  const [itemsIds, setItemsIds] = useState<any[]>([])
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false)
  const [overlayActionType, setOverlayActionType] = useState<ActionTypes>("" as ActionTypes)
  const [user, setUser] = useState<UserInterface | undefined>()
  const [userLoading, setUserLoading] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([])
  const [imgs, setImgs] = useState<LayersImgs>({})
  /**
   * 
   * App State
   * */
  const vals: ContextArgs = {
    display,
    setDisplay,
    isReversed,
    setIsReversed,
    selectedIds,
    setSelectedIds,
    folders,
    setFolders,
    itemsIds,
    setItemsIds,
    isOverlayVisible,
    setIsOverlayVisible,
    overlayActionType,
    setOverlayActionType,
    user,
    setUser,
    userLoading,
    setUserLoading,
    files,
    setFiles,
    imgs,
    setImgs,
  }

  useEffect(() => {
    const path = router.asPath
    /**
   * 
   * Get Current User
   * @returns 
   */
    const getUser = async () => {
      /** If Path Not Content Don't Load Current User  */
      if (!path.includes(routes.CONTENT)) return;

      try {
        /** Show Loader */
        setUserLoading(true)
        /** Get response */
        const res = await axios.get(`/user`)
        const { payload } = res.data.data;
        setUser(payload)
        /** Hide loader */
        setUserLoading(false)
      } catch (error) {
        /** If Token Missing Or Expired Go To Login Page */
        if ((error as AxiosError).response?.status === 401) router.push(routes.LOGIN)
      }
    }

    getUser()
  }, [])
  // Global Rendring
  return <AppContext.Provider value={vals}>
    <Component {...pageProps} />
  </AppContext.Provider>
}
export default MyApp
