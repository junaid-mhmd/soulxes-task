"use client";

import { useState } from "react";
import RangeSlider from "@/components/ui/range-slider";
import type { FilterGroup } from "../types";
import FilterItem from "./filter-item";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import styles from "./styles.module.scss";

const filterKeys = {
  stops: parseAsArrayOf(parseAsString, ",").withDefault([] as string[]),
  airlines: parseAsArrayOf(parseAsString, ",").withDefault([] as string[]),
  baggage: parseAsArrayOf(parseAsString, ",").withDefault([] as string[]),
  depTime: parseAsArrayOf(parseAsInteger, ",").withDefault([0, 100]),
  arrTime: parseAsArrayOf(parseAsInteger, ",").withDefault([0, 100]),
};

const emptyFilters = {
  stops: [] as string[],
  airlines: [] as string[],
  baggage: [] as string[],
  depTime: [0, 100] as [number, number],
  arrTime: [0, 100] as [number, number],
};

function SideFilter({ groups }: { groups: FilterGroup[] }) {
  const [applied, setApplied] = useQueryStates(filterKeys);
  const [draft, setDraft] = useState(applied);

  const toggleDraft =
    (key: "stops" | "airlines" | "baggage") => (value: string) => {
      setDraft((prev) => {
        const arr = prev[key].includes(value)
          ? prev[key].filter((s) => s !== value)
          : [...prev[key], value];
        return { ...prev, [key]: arr };
      });
    };

  const applyFilters = () => {
    setApplied(draft);
  };

  const handleReset = () => {
    setDraft(emptyFilters);
    setApplied(emptyFilters);
  };

  return (
    <div className={styles.filtersPanel}>
      <h3>Filter By</h3>

      <div className={styles.filterGroups}>
        {groups.map((group) => (
          <FilterItem
            key={group.title}
            group={group}
            selected={draft[group.filterKey] ?? []}
            onToggle={toggleDraft(group.filterKey)}
          />
        ))}
      </div>

      <div className={styles.timeGroup}>
        <h4>Departure Time</h4>
        <p>Mon 5:00 AM - Tue 12:00 AM</p>
        <RangeSlider
          min={0}
          max={100}
          value={[draft.depTime[0], draft.depTime[1]]}
          onInput={([start, end]) =>
            setDraft((p) => ({ ...p, depTime: [start, end] }))
          }
        />
      </div>

      <div className={styles.timeGroup}>
        <h4>Arrival Time</h4>
        <p>Mon 5:00 AM - Tue 12:00 AM</p>
        <RangeSlider
          min={0}
          max={100}
          value={[draft.arrTime[0], draft.arrTime[1]]}
          onInput={([start, end]) =>
            setDraft((p) => ({ ...p, arrTime: [start, end] }))
          }
        />
      </div>

      <div className={styles.filterActions}>
        <button type="button" className={styles.resetBtn} onClick={handleReset}>
          Reset
        </button>
        <button
          type="button"
          className={styles.applyBtn}
          onClick={applyFilters}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default SideFilter;
