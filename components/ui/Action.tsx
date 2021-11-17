import classNames from "classnames";
import { FC, MouseEventHandler } from "react";
import Center from "../common/Center";

interface ActionProps {
    foc?: boolean
    label?: string
    title?: string
    Icon?: React.ReactNode
    onClick?: MouseEventHandler<HTMLDivElement>
    disabled?: boolean
}


const Action: FC<ActionProps> = ({ label, title, Icon, foc = false, onClick, disabled = false }) => <div onClick={onClick}
    title={label ? label : title}
    className={classNames(`hover:bg-gray-100 cursor-pointer py-2 px-4 rounded-md m-px transition `, { "bg-blue-100": foc, "text-gray-300 pointer-events-none": disabled })}>
    <Center>
        {Icon}
        {label && <h2 className={`capitalize ml-3`}>{label}</h2>}
    </Center>
</div>

export default Action;