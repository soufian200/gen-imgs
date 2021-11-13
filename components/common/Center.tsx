import { FC } from "react";

interface CenterProps {
    children: React.ReactNode;
}

const Center: FC<CenterProps> = ({ children }) => <div className="flex justify-center items-center">{children}</div>


export default Center;