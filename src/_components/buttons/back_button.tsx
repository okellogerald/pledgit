import { IoArrowBackSharp } from "react-icons/io5";

import styles from "./_styles.module.css";
import classNames from "classnames";

export const BackButton: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = (props) => {
  return (
    <button
      className={classNames(styles.transparent_button, styles.back_button)}
      onClick={() => history.back()}
      {...props}
    >
      <IoArrowBackSharp size={22} />
    </button>
  );
};
