import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import AppContext, { ActionTypes, ContextArgs, DisplayState, LayersImgs, UserInterface } from '../contexts/AppContext'
import { useEffect, useState } from 'react'
import { AssetImgProps } from '../components/ui/Asset'
import axios, { AxiosError } from 'axios'
import jwt from 'jsonwebtoken'
import { useRouter } from 'next/router'
import routes from '../constants/routes'
import { FolderProps } from '../components/ui/Folder'
import { ImgInterface } from '../utils/interfaces'
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
  const path = router.asPath

  const [display, setDisplay] = useState<DisplayState>(DisplayState.Large)
  const [isReversed, setIsReversed] = useState<boolean>(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [folders, setFolders] = useState<FolderProps[]>([])
  const [exported, setExported] = useState<AssetImgProps[]>([
    {
      id: '133',
      title: '1',
      createdAt: Date.now(),
      path: 'https://lh3.googleusercontent.com/BbpH_5EIqgvig7lXsS4H9eN5WfORHko01Wnab7oXkUJGIAQtzwXpyV88AVAkdFVOf5dGrJn3G0ACCe-l-7zeoIBM8YdJwZH7qJZC_3o=w600'
    },
    {
      id: '2',
      title: '1',
      createdAt: Date.now(),
      path: 'https://lh3.googleusercontent.com/VqWHjABPo6PwS-nszlRoPR0y3Oph939lSm8U4dJLZqGpi7YfSHvv7V59y8QmIA-b9hoI288LFplFsCGSPukSG05UB0dlfI8fBpjJ=w283'
    },
    {
      id: '3',
      title: '1',
      createdAt: Date.now(),
      path: 'https://lh3.googleusercontent.com/kvgUlnCq6O_PiboWcmkg5p3_9lkeWzvZWWc8v0LvcESKdmS5ztk-PaIdNUPmDVD36bmgIjiK0RmMekPvxEm2rnw=w283'
    },
    {
      id: '4',
      title: '1',
      createdAt: Date.now(),
      path: 'https://lh3.googleusercontent.com/FuWUWN5Oe4Tmr3nwi569Lgvq65J8kLOcVvwW2gZ_2A9bwQLv2Ie2C7KiZOHEbZF--s5zUTqFaGkGIkeKcunoEBytVqaxy6txifj9UQ=w283'
    },
    {
      id: '5',
      title: '1',
      createdAt: Date.now(),
      path: 'https://lh3.googleusercontent.com/cUFfR7uogaHyU6OXsqLEDiJL8iGkCWWn92JGn_b5CxFl61h022kUKkQ0euNvlFyq4vqsz4C6vQbMXyc8YgXYq1MGSUZS12SbCrSA=w600'
    },
    {
      id: '6',
      title: '1',
      createdAt: Date.now(),
      path: 'https://lh3.googleusercontent.com/_oMP8QlIdvuea--sdgpBaCDkYfRhNnj8LXUK64iCW2X83ER7hxEx9CokyeJ8DSRrO9tz7nHPXRQqkgGcy49zyE2sVMFCeGbEaSY-5pE=w283'
    },
    {
      id: '7',
      title: '1',
      createdAt: Date.now(),
      path: 'https://lh3.googleusercontent.com/oBPQbj8fDq6tWdIBlebeDO8LcIcCCgtI2nd0n0HveIsaCIhI9gnIPsJ2GuIE-7LgKdQ3m0IXHfRBrVfx0WlKIW81HU30oh_reZfe1Co=w600'
    },
  ])

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
   * 
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

    exported,
    setExported,

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
  /**
   * 
   * @param _token for current user
   * @returns 
   */
  const getUser = async () => {
    /** If Path Not Content Don't Load Current User  */
    if (!path.includes(routes.CONTENT)) return;

    try {
      // show loader in nav
      setUserLoading(true)
      // get response
      const res = await axios.get(`/user`)
      const { payload } = res.data.data;
      // set current user
      console.log(payload)
      setUser(payload)
      // console.log(res.data)
      // if (!res.data.payload.isVerified) {
      //   router.replace('/c/verify')
      // }
      // hide loader
      setUserLoading(false)
    } catch (error) {
      /**  Remove token from local storage */
      // localStorage.removeItem(COOKIES_NAMES.token)
      // If There Is No Token Response Will Remove Cookie
      // Axios Will Catch 400 with error `user doesn't exists`
      // reload to trigger middleware to check if there is a token
      // router.reload()


      if ((error as AxiosError).response?.status === 401) {
        router.push(routes.LOGIN)
      }


    }
  }

  // When Page Loaded Get Current User
  useEffect(() => {
    // if not logged in

    // Get token id user logged in
    // const token = localStorage.getItem(COOKIES_NAMES.token);
    // if (!token) return
    // fetch user data
    // FIXME: activate below
    getUser()
  }, [])
  // Global Rendring
  return <AppContext.Provider value={vals}>
    <Component {...pageProps} />
  </AppContext.Provider>
}
export default MyApp
