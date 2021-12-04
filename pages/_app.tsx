import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import AppContext, { ActionTypes, ContextArgs, DisplayState, UserInterface } from '../contexts/AppContext'
import { useState } from 'react'
import { AssetProps } from '../components/ui/AssetContainer'
import { AssetImgProps } from '../components/ui/Asset'
import getItemsIds from '../lib/getItemsIds'
import axios from 'axios'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

function MyApp({ Component, pageProps }: AppProps) {

  const [display, setDisplay] = useState<DisplayState>(DisplayState.Large)
  const [isReversed, setIsReversed] = useState<boolean>(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [folders, setFolders] = useState<AssetProps[]>([
    {
      id: '1',
      title: 'Backgrounds',
      createdAt: 'nov, 2020'
    },
    {
      id: '2',
      title: "Eyes",
      createdAt: 'nov, 2021'
    },
    {
      id: '3',
      title: "Heads",
      createdAt: 'nov, 2020'
    },
    {
      id: '4',
      title: "Legs",
      createdAt: 'nov, 2021'
    },
    {
      id: '5',
      title: "Hats",
      createdAt: 'nov, 2021'
    },

  ])
  const [exported, setExported] = useState<AssetImgProps[]>([
    {
      id: '133',
      title: 1,
      createdAt: 'nov, 2020',
      path: 'https://lh3.googleusercontent.com/BbpH_5EIqgvig7lXsS4H9eN5WfORHko01Wnab7oXkUJGIAQtzwXpyV88AVAkdFVOf5dGrJn3G0ACCe-l-7zeoIBM8YdJwZH7qJZC_3o=w600'
    },
    {
      id: '2',
      title: 2,
      createdAt: 'nov, 2021',
      path: 'https://lh3.googleusercontent.com/VqWHjABPo6PwS-nszlRoPR0y3Oph939lSm8U4dJLZqGpi7YfSHvv7V59y8QmIA-b9hoI288LFplFsCGSPukSG05UB0dlfI8fBpjJ=w283'
    },
    {
      id: '3',
      title: 3,
      createdAt: 'nov, 2020',
      path: 'https://lh3.googleusercontent.com/kvgUlnCq6O_PiboWcmkg5p3_9lkeWzvZWWc8v0LvcESKdmS5ztk-PaIdNUPmDVD36bmgIjiK0RmMekPvxEm2rnw=w283'
    },
    {
      id: '4',
      title: 4,
      createdAt: 'nov, 2021',
      path: 'https://lh3.googleusercontent.com/FuWUWN5Oe4Tmr3nwi569Lgvq65J8kLOcVvwW2gZ_2A9bwQLv2Ie2C7KiZOHEbZF--s5zUTqFaGkGIkeKcunoEBytVqaxy6txifj9UQ=w283'
    },
    {
      id: '5',
      title: 5,
      createdAt: 'nov, 2021',
      path: 'https://lh3.googleusercontent.com/cUFfR7uogaHyU6OXsqLEDiJL8iGkCWWn92JGn_b5CxFl61h022kUKkQ0euNvlFyq4vqsz4C6vQbMXyc8YgXYq1MGSUZS12SbCrSA=w600'
    },
    {
      id: '6',
      title: 6,
      createdAt: 'oct, 2021',
      path: 'https://lh3.googleusercontent.com/_oMP8QlIdvuea--sdgpBaCDkYfRhNnj8LXUK64iCW2X83ER7hxEx9CokyeJ8DSRrO9tz7nHPXRQqkgGcy49zyE2sVMFCeGbEaSY-5pE=w283'
    },
    {
      id: '7',
      title: 7,
      createdAt: 'oct, 2021',
      path: 'https://lh3.googleusercontent.com/oBPQbj8fDq6tWdIBlebeDO8LcIcCCgtI2nd0n0HveIsaCIhI9gnIPsJ2GuIE-7LgKdQ3m0IXHfRBrVfx0WlKIW81HU30oh_reZfe1Co=w600'
    },
  ])

  const [itemsIds, setItemsIds] = useState<any[]>(getItemsIds(folders))
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false)
  const [overlayActionType, setOverlayActionType] = useState<ActionTypes>("" as ActionTypes)
  const [user, setUser] = useState<UserInterface | undefined>()
  /**
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

    exported,
    setExported,

    itemsIds,
    setItemsIds,

    isOverlayVisible,
    setIsOverlayVisible,

    overlayActionType,
    setOverlayActionType,

    user,
    setUser
  }



  return <AppContext.Provider value={vals}>
    <Component {...pageProps} />
  </AppContext.Provider>
}
export default MyApp
