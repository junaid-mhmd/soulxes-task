"use client";

import Checkbox from "@/components/ui/checkbox";
import type { FilterGroup } from "../types";
import styles from "./styles.module.scss";

export default function FilterItem({
  group,
  selected,
  onToggle,
}: {
  group: FilterGroup;
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className={styles.filterGroup}>
      <div className={styles.filterGroupHeader}>
        <h4>{group.title}</h4>
        <span>From</span>
      </div>
      {group.options.map((option) => (
        <label
          key={`${group.filterKey}-${option.value}`}
          className={styles.filterOption}
        >
          <Checkbox
            checked={selected.includes(option.value)}
            onChange={() => onToggle(option.value)}
          />
          <span>{option.label}</span>
          <strong>{option.price}</strong>
        </label>
      ))}
    </div>
  );
}
