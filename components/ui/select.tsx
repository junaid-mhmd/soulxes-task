import { forwardRef } from "react";
import type { ReactNode } from "react";
import styles from "./styles.module.scss";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  inputSize?: "sm" | "md";
  leftIcon?: ReactNode;
  placeholder?: string;
};

const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { className, inputSize = "md", leftIcon, placeholder, children, ...props },
  ref,
) {
  const selectProps = { ...props };

  if (placeholder && props.value === undefined && props.defaultValue === undefined) {
    selectProps.defaultValue = "";
  }

  return (
    <div className={styles.inputWrapper}>
      {leftIcon && <div className={styles.inputIcon}>{leftIcon}</div>}
      <select
        ref={ref}
        className={[styles.input, styles.select, inputSize === "sm" ? styles.fieldSizeSm : styles.fieldSizeMd, leftIcon && styles.inputWithIcon, className].filter(Boolean).join(" ")}
        {...selectProps}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    </div>
  );
});

export default Select;
