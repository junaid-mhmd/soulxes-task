import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

type Props = InputHTMLAttributes<HTMLInputElement>;

const Checkbox = forwardRef<HTMLInputElement, Props>(function Checkbox(
  { className, type = "checkbox", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      className={`${styles.checkbox} ${className || ""}`.trim()}
      {...props}
    />
  );
});

export default Checkbox;
