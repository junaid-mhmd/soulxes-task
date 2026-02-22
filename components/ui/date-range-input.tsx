"use client";

import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import { createPortal } from "react-dom";
import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./styles.module.scss";

type DateRange = {
  start: string;
  end: string;
};

type Props = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "type"
> & {
  inputSize?: "sm" | "md";
  leftIcon?: ReactNode;
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  dateFormat?: (date: string) => string;
};

const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const DateRangeInput = forwardRef<HTMLInputElement, Props>(
  function DateRangeInput(
    {
      className,
      inputSize = "md",
      leftIcon,
      value,
      onChange,
      dateFormat = formatDate,
      ...props
    },
    ref,
  ) {
    const [isOpen, setIsOpen] = useState(false);
    const [pickerRect, setPickerRect] = useState({ top: 0, left: 0, width: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const pickerRef = useRef<HTMLDivElement>(null);
    const startInputRef = useRef<HTMLInputElement>(null);
    const endInputRef = useRef<HTMLInputElement>(null);

    const updatePickerPosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setPickerRect({
          top: rect.bottom + 8,
          left: rect.left,
          width: rect.width,
        });
      }
    };

    useLayoutEffect(() => {
      if (isOpen) updatePickerPosition();
    }, [isOpen]);

    useEffect(() => {
      if (!isOpen) return;
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          containerRef.current?.contains(target) ||
          pickerRef.current?.contains(target)
        ) {
          return;
        }
        setIsOpen(false);
      };
      const onScrollResize = () => updatePickerPosition();
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", onScrollResize, true);
      window.addEventListener("resize", onScrollResize);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("scroll", onScrollResize, true);
        window.removeEventListener("resize", onScrollResize);
      };
    }, [isOpen]);

    const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.({
        start: e.target.value,
        end: value?.end || "",
      });
    };

    const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.({
        start: value?.start || "",
        end: e.target.value,
      });
    };

    const handleInputClick = () => {
      setIsOpen(true);
    };

    const getDisplayValue = (): string => {
      if (!value?.start && !value?.end) return "";
      if (value.start && value.end) {
        return `${dateFormat(value.start)} - ${dateFormat(value.end)}`;
      }
      if (value.start) return dateFormat(value.start);
      if (value.end) return dateFormat(value.end);
      return "";
    };

    return (
      <div ref={containerRef} className={styles.dateRangeContainer}>
        <div className={styles.inputWrapper}>
          {leftIcon && <div className={styles.inputIcon}>{leftIcon}</div>}
          <input
            ref={ref}
            type="text"
            readOnly
            className={`${styles.input} ${inputSize === "sm" ? styles.fieldSizeSm : styles.fieldSizeMd} ${leftIcon ? styles.inputWithIcon : ""} ${className || ""}`.trim()}
            value={getDisplayValue()}
            onClick={handleInputClick}
            placeholder={props.placeholder || "Select date range"}
            {...props}
          />
        </div>
        {isOpen &&
          createPortal(
            <div
              ref={pickerRef}
              className={styles.dateRangePicker}
              style={{
                position: "fixed",
                top: pickerRect.top,
                left: pickerRect.left,
                width: pickerRect.width,
              }}
            >
              <div className={styles.dateRangePickerContent}>
                <div className={styles.dateRangePickerField}>
                  <label className={styles.dateRangeLabel}>Start Date</label>
                  <input
                    ref={startInputRef}
                    type="date"
                    className={`${styles.input} ${inputSize === "sm" ? styles.fieldSizeSm : styles.fieldSizeMd}`.trim()}
                    value={value?.start || ""}
                    onChange={handleStartChange}
                  />
                </div>
                <div className={styles.dateRangePickerField}>
                  <label className={styles.dateRangeLabel}>End Date</label>
                  <input
                    ref={endInputRef}
                    type="date"
                    className={`${styles.input} ${inputSize === "sm" ? styles.fieldSizeSm : styles.fieldSizeMd}`.trim()}
                    value={value?.end || ""}
                    onChange={handleEndChange}
                  />
                </div>
              </div>
            </div>,
            document.body,
          )}
      </div>
    );
  },
);

export default DateRangeInput;
