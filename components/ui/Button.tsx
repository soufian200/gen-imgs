import { FC, MouseEventHandler } from "react";
import cn from 'classnames';
import Loader from "./Loader";
import Center from "../common/Center";

interface CenterProps {
    label: string
    loading?: boolean
    disabled?: boolean
    styles?: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    [x: string]: any
}

const Button: FC<CenterProps> = ({ onClick, label, loading = false, disabled = false, styles = `bg-blue-400 hover:bg-blue-300 text-white `, ...rest }) => <button
    onClick={onClick}
    className={cn(` py-4 px-20 capitalize  m-px hover:opacity-90`, styles, { "pointer-events-none": loading || disabled, })}
    {...rest}
>
    {loading ? <Center><Loader /></Center> : label}
</button>

export default Button;