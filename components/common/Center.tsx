import { FC } from "react";

interface CenterProps {
    children: React.ReactNode
    styles?: string
}

const Center: FC<CenterProps> = ({ children, styles = "" }) => <div className={`w-full flex justify-center items-center ${styles}`}>{children}</div>


export default Center;