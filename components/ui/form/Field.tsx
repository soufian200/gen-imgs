import React, { FC } from "react";

interface FieldProp {
    value: string;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
    [x: string]: any;
}

const Field: FC<FieldProp> = ({ value, onChange, ...rest }) => {
    return <input
        className={`border rounded-lg border-gray-300 py-4 px-3 w-full`}
        onChange={onChange}
        value={value}
        {...rest}
    />
}

export default Field;