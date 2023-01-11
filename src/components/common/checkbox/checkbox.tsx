import type { FC, ChangeEvent} from "react";

interface CheckboxProps {
       checked: boolean;
       onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: FC<CheckboxProps> = ({checked, onChange}) =>
       <input type = "checkbox" onChange={ onChange } checked = { checked } />

