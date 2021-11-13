import { FC } from "react";
import cn from 'classnames';

interface CenterProps {
    label: string
    styles?: string
}

const Button: FC<CenterProps> = ({ label, styles }) => <button
    className={cn(`bg-blue-500 text-white py-4 px-20 capitalize font-bold `, styles)}
>{label}</button>

export default Button;