import type { FC, ChangeEvent } from "react"
import css from "./styles.module.css"

interface InputProps {
       value:string;
       onChange: (e: ChangeEvent<HTMLInputElement>) => void;

}

export const Input: FC<InputProps> = ({value, onChange}) => <input className = {css.input} value = {value} onChange = {onChange}/>
