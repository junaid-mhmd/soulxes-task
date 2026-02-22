import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./styles.module.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonSize?: "sm" | "md";
  leftIcon?: ReactNode;
};

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, buttonSize = "md", leftIcon, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={`${styles.button} ${buttonSize === "sm" ? styles.fieldSizeSm : styles.fieldSizeMd} ${leftIcon ? styles.buttonWithLeftIcon : ""} ${className || ""}`.trim()}
      {...props}
    >
      {leftIcon && <span className={styles.buttonLeftIcon}>{leftIcon}</span>}
      {children && <span className={styles.buttonContent}>{children}</span>}
    </button>
  );
});

export default Button;
