import React, { FC } from "react";

interface FieldProp {
    value: string
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void
}

const Field: FC<FieldProp> = ({ value, onChange }) => {
    return <input
        className={`border rounded-lg border-gray-300 py-4 px-3 w-full`}
        placeholder="New Name"
        value={value}
        onChange={onChange}
    />
}

export default Field;