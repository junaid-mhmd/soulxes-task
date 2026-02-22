import type { LucideIcon } from "lucide-react";

export type FlightRow = {
  date: string;
  fromTime: string;
  fromLocation: string;
  duration: string;
  toTime: string;
  toLocation: string;
  hasEntertainment?: boolean;
  hasWifi?: boolean;
  hasBaggage?: boolean;
  hasInfo?: boolean;
  layoverAfter?: string;
};

export type FlightInfoBarItem = {
  icon: LucideIcon;
  label: string;
};

export type FlightCardData = {
  airline: string;
  cabin: string;
  price: string;
  seats: string;
  refund: string;
  refundTone: "warning" | "danger";
  rows: FlightRow[];
  stops?: string;
  airlineValue?: string;
  infoBarItems?: FlightInfoBarItem[];
};

export type FilterParamKey = "stops" | "airlines" | "baggage";

export type FilterGroup = {
  title: string;
  filterKey: FilterParamKey;
  options: Array<{
    label: string;
    price: string;
    value: string;
  }>;
};

export type PromoCardData = {
  title: string;
  description: string;
  cta: string;
  icon?: LucideIcon;
  image?: string;
};

export type SortTabId = "recommended" | "fastest" | "cheapest";

export type SortTab = {
  id: SortTabId;
  label: string;
  subLabel: string;
  icon?: LucideIcon;
  image?: { src: string; alt: string };
};
