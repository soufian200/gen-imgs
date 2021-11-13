import { FC } from "react";

interface ContainerProps {
    children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {

    return <div className="container m-auto">{children}</div>
}


export default Container;