import React from "react";

import styles from "./_styles.module.css"
import colors from "@/_themes/colors/colors"

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    label?: string,
    icon?: React.ReactNode,
}

export const OutlineButton: React.FC<Props> = ({ label, onClick, icon, disabled, style, ...props }: Props) => {
    const extra = {
        ...style,
        color: disabled ? 'grey' : style?.color ?? colors.primary,
    }

    return (
        <button
            className={styles.outline_button}
            style={extra}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {
                label && <p style={{ margin: 0, padding: 0, }}>{label}</p>
            }
            {icon && icon}
        </button>
    );
}

