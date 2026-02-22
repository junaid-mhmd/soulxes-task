import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./styles.module.scss";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  inputSize?: "sm" | "md";
  leftIcon?: ReactNode;
};

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, inputSize = "md", leftIcon, ...props },
  ref,
) {
  return (
    <div className={styles.inputWrapper}>
      {leftIcon && <div className={styles.inputIcon}>{leftIcon}</div>}
      <input
        ref={ref}
        className={`${styles.input} ${inputSize === "sm" ? styles.fieldSizeSm : styles.fieldSizeMd} ${leftIcon ? styles.inputWithIcon : ""} ${className || ""}`.trim()}
        {...props}
      />
    </div>
  );
});

export default Input;
