import type { FC, PropsWithChildren } from "react";
import css from './styles.module.css';
import cn from "classnames"


interface ButtonProps {
       onClick: () => void;
       disabled?: boolean;
       className?: string;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({children, onClick, disabled, className}) => 
       <button className = {cn (css.button, className)} onClick = {onClick} disabled = {disabled}>{children}</button>

