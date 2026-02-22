"use client";

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.scss";

const MAX_SUGGESTIONS = 8;

export default function AutocompleteInput({
  options,
  value,
  onChange,
  onBlur,
  placeholder,
  inputSize = "md",
  className,
  leftIcon,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  inputSize?: "sm" | "md";
  className?: string;
  leftIcon?: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [listRect, setListRect] = useState({ top: 0, left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(value.trim().toLowerCase()),
  );
  const suggestions = filtered.slice(0, MAX_SUGGESTIONS);

  const updateListPosition = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setListRect({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setHighlightIndex(0);
  }, []);

  useLayoutEffect(() => {
    if (isOpen && suggestions.length > 0) updateListPosition();
  }, [isOpen, suggestions.length, updateListPosition]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current?.contains(target) || listRef.current?.contains(target)) return;
      close();
    };
    const handleScrollResize = () => updateListPosition();
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScrollResize, true);
    window.addEventListener("resize", handleScrollResize);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScrollResize, true);
      window.removeEventListener("resize", handleScrollResize);
    };
  }, [isOpen, close, updateListPosition]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === "Escape") close();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => (i + 1) % suggestions.length);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      onChange(suggestions[highlightIndex] ?? value);
      close();
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  return (
    <div ref={containerRef} className={styles.autocompleteWrapper}>
      <div className={styles.inputWrapper}>
        {leftIcon && <div className={styles.inputIcon}>{leftIcon}</div>}
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
            setHighlightIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            onBlur?.();
            setTimeout(close, 150);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className={`${styles.input} ${inputSize === "sm" ? styles.fieldSizeSm : styles.fieldSizeMd} ${leftIcon ? styles.inputWithIcon : ""} ${className ?? ""}`.trim()}
        />
      </div>
      {isOpen &&
        suggestions.length > 0 &&
        createPortal(
          <ul
            ref={listRef}
            className={styles.autocompleteList}
            role="listbox"
            style={{
              position: "fixed",
              top: listRect.top,
              left: listRect.left,
              width: listRect.width,
            }}
            onMouseDown={(e) => e.preventDefault()}
          >
            {suggestions.map((opt, i) => (
              <li
                key={opt}
                role="option"
                aria-selected={i === highlightIndex}
                className={i === highlightIndex ? styles.autocompleteItemActive : styles.autocompleteItem}
                onMouseEnter={() => setHighlightIndex(i)}
                onMouseDown={() => {
                  onChange(opt);
                  close();
                }}
              >
                {opt}
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </div>
  );
}
