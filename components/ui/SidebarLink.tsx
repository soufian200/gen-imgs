import classNames from "classnames"
import { ElementType, FC } from "react"
import Link from 'next/link';


export interface SidebarLinkProps {
    dirname: string
    Icon: ElementType
    path: string
    isActive?: boolean
}


const SidebarLink: FC<SidebarLinkProps> = ({ dirname, Icon, path, isActive }) => {
    return <Link href={path}>
        <li title={dirname}>
            <a className={classNames(` text-xl flex hover:bg-gray-100 cursor-pointer rounded-tr-full rounded-br-full py-2 pl-10 mb-2`, { 'text-blue-500 bg-blue-50': isActive })}>
                <Icon size={30} />
                <h1 className={`capitalize ml-2`}>{dirname}</h1>
            </a>
        </li>
    </Link>
}

export default SidebarLink;