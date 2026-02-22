import ReactRangeSliderInput from "react-range-slider-input";
import type { InputEvent } from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import styles from "./styles.module.scss";

export default function RangeSlider({
  min = 0,
  max = 100,
  value = [0, 100],
  onInput,
  step = 1,
  disabled = false,
  className,
}: {
  min?: number;
  max?: number;
  value?: [number, number];
  onInput?: (value: InputEvent) => void;
  step?: number | "any";
  disabled?: boolean;
  className?: string;
}) {
  return (
    <div className={`${styles.rangeSliderWrap} ${className || ""}`.trim()}>
      <ReactRangeSliderInput
        min={min}
        max={max}
        value={value}
        onInput={onInput}
        step={step}
        disabled={disabled}
        className={styles.rangeSlider}
      />
    </div>
  );
}
