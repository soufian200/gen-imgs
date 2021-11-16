import classNames from "classnames";
import { FC } from "react";
import Center from "../common/Center";

interface ActionProps {
    foc?: boolean
    label?: string
    title?: string
    Icon: React.ReactNode

}


const Action: FC<ActionProps> = ({ label, title, Icon, foc = false }) => <div title={label ? label : title}
    className={classNames(`hover:bg-gray-100 cursor-pointer py-2 px-4 rounded-md `, { "bg-gray-100": foc })}>
    <Center>
        {Icon}
        {label && <h2 className={`capitalize ml-3`}>{label}</h2>}
    </Center>
</div>

export default Action;