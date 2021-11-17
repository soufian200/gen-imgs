import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import AppContext, { ContextArgs } from '../contexts/AppContext'
import { useState } from 'react'
import { AssetProps } from '../components/ui/AssetContainer'
import { AssetImgProps } from '../components/ui/Asset'
import getItemsIds from '../lib/getItemsIds'

function MyApp({ Component, pageProps }: AppProps) {

  const [display, setDisplay] = useState<"Large" | "Small">("Large")
  const [isReversed, setIsReversed] = useState<boolean>(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [folders, setFolders] = useState<AssetProps[]>([
    {
      id: '1',
      title: 1,
      createdAt: 'nov, 2020'
    },
    {
      id: '2',
      title: 2,
      createdAt: 'nov, 2021'
    },
    {
      id: '3',
      title: 3,
      createdAt: 'nov, 2020'
    },
    {
      id: '4',
      title: 4,
      createdAt: 'nov, 2021'
    },
    {
      id: '5',
      title: 5,
      createdAt: 'nov, 2021'
    },
    {
      id: '6',
      title: 6,
      createdAt: 'oct, 2021'
    },
  ])
  const [exported, setExported] = useState<AssetImgProps[]>([
    {
      id: '133',
      title: 1,
      createdAt: 'nov, 2020',
      path: 'fakepath'
    },
    {
      id: '2',
      title: 2,
      createdAt: 'nov, 2021',
      path: 'fakepath'
    },
    {
      id: '3',
      title: 3,
      createdAt: 'nov, 2020',
      path: 'fakepath'
    },
    {
      id: '4',
      title: 4,
      createdAt: 'nov, 2021',
      path: 'fakepath'
    },
    {
      id: '5',
      title: 5,
      createdAt: 'nov, 2021',
      path: 'fakepath'
    },
    {
      id: '6',
      title: 6,
      createdAt: 'oct, 2021',
      path: 'fakepath'
    },
  ])

  const [itemsIds, setItemsIds] = useState<any[]>(getItemsIds(folders))

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
  }

  return <AppContext.Provider value={vals}>
    <Component {...pageProps} />
  </AppContext.Provider>
}
export default MyApp
