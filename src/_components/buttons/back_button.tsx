import { IoArrowBackSharp } from "react-icons/io5";

import styles from "./_styles.module.css"

export const BackButton: React.FC<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = (props) => {
    return <button
        className={styles.button}
        onClick={() => history.back()}
        {...props}
    >
        <IoArrowBackSharp size={22} />
    </button>
}