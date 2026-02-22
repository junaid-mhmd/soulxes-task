"use client";

import { useState } from "react";
import Image from "next/image";
import type { FlightCardData, FlightRow } from "../types";
import styles from "./styles.module.scss";

const DETAIL_TABS = [
  { id: "flight", label: "Flight Information" },
  { id: "fare", label: "Fare Detail" },
  { id: "baggage", label: "Baggage Rules" },
  { id: "cancellation", label: "Cancellation Rules" },
] as const;

const iconSize = 16;

function SegmentIcons({ row }: { row: FlightRow }) {
  const show =
    row.hasEntertainment || row.hasWifi || row.hasBaggage || row.hasInfo;
  if (!show) return null;
  return (
    <div className={styles.segmentIcons} aria-hidden>
      {row.hasEntertainment && (
        <Image
          src="/assets/video.png"
          alt=""
          width={iconSize}
          height={iconSize}
          className={styles.segmentIcon}
        />
      )}
      {row.hasWifi && (
        <Image
          src="/assets/wifi.png"
          alt=""
          width={iconSize}
          height={iconSize}
          className={styles.segmentIcon}
        />
      )}
      {row.hasBaggage && (
        <Image
          src="/assets/bag.png"
          alt=""
          width={iconSize}
          height={iconSize}
          className={styles.segmentIcon}
        />
      )}
      {row.hasInfo && (
        <Image
          src="/assets/Info.png"
          alt=""
          width={iconSize}
          height={iconSize}
          className={styles.segmentIcon}
        />
      )}
    </div>
  );
}

function JourneyRow({ row }: { row: FlightRow }) {
  return (
    <>
      <div className={styles.journeyRow}>
        <div>
          <p className={styles.rowDate}>{row.date}</p>
          <h5>{row.fromTime}</h5>
          <p>{row.fromLocation}</p>
        </div>
        <div className={styles.durationCol}>
          <h6>{row.duration}</h6>
          <div className={styles.routeLine}>
            <span />
            <Image
              src="/assets/plane-fly.png"
              alt="route"
              width={14}
              height={14}
              objectFit="cover"
            />
            <span />
          </div>
        </div>
        <div className={styles.arrivalCol}>
          <h5>{row.toTime}</h5>
          <p>{row.toLocation}</p>
        </div>
        <div className={styles.segmentIconsCol}></div>
      </div>
    </>
  );
}

function getRouteLabel(item: FlightCardData): string {
  if (item.rows.length === 0) return "";
  const first = item.rows[0].fromLocation.split(",")[0].trim();
  const last = item.rows[item.rows.length - 1].toLocation.split(",")[0].trim();
  return `${first} → ${last}`;
}

export default function ResultItem({ item }: { item: FlightCardData }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] =
    useState<(typeof DETAIL_TABS)[number]["id"]>("flight");
  const routeLabel = getRouteLabel(item);

  return (
    <article className={styles.flightCard}>
      <div className={styles.cardTop}>
        <div className={styles.airlineWrap}>
          <Image
            src={"/assets/plane.png"}
            width={32}
            height={32}
            alt="plane"
            objectFit="cover"
          />
          <h4>{item.airline}</h4>
        </div>
        <p>
          Travel Class: <strong>{item.cabin}</strong>
        </p>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.journeyWrap}>
          {item.rows.map((row) => (
            <JourneyRow
              key={`${row.fromTime}-${row.toTime}-${row.duration}`}
              row={row}
            />
          ))}
        </div>

        <div className={styles.priceWrap}>
          <h3>{item.price}</h3>
          <button type="button">Book Now</button>
        </div>
      </div>

      <div className={styles.cardBottom}>
        <span>{item.seats}</span>
        <span
          className={
            item.refundTone === "warning" ? styles.warning : styles.danger
          }
        >
          {item.refund}
        </span>
        <button
          type="button"
          className={styles.viewDetailsBtn}
          onClick={() => setDetailsOpen((v) => !v)}
        >
          {detailsOpen ? "Hide flight details" : "View flight details"}
        </button>
      </div>

      {detailsOpen && (
        <div className={styles.detailsSection}>
          <div className={styles.detailsTabs}>
            {DETAIL_TABS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={
                  activeTab === id ? styles.detailsTabActive : styles.detailsTab
                }
                onClick={() => setActiveTab(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className={styles.detailsContent}>
            {activeTab === "flight" && (
              <>
                <div className={styles.detailsFlightHeader}>
                  <span className={styles.detailsAirline}>
                    <Image
                      src={"/assets/plane.png"}
                      width={26}
                      height={26}
                      alt="plane"
                      objectFit="cover"
                    />
                    {item.airline}
                  </span>
                  {routeLabel && (
                    <span className={styles.detailsRoute}>{routeLabel}</span>
                  )}
                </div>
                <div className={styles.detailsJourneyWrap}>
                  {item.rows.map((row) => (
                    <div key={`${row.fromTime}-${row.toTime}-${row.duration}`}>
                      <div className={styles.journeyRowDetails}>
                        <JourneyRow
                          key={`${row.fromTime}-${row.toTime}-${row.duration}`}
                          row={row}
                        />
                        <div className={styles.segmentIconsCol}>
                          <SegmentIcons row={row} />
                        </div>
                      </div>
                      {row.layoverAfter && (
                        <div className={styles.layoverWrap}>
                          <span className={styles.layoverLine} aria-hidden />
                          <p className={styles.layover}>{row.layoverAfter}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
            {activeTab === "fare" && (
              <p className={styles.detailsPlaceholder}>
                Fare breakdown — coming soon.
              </p>
            )}
            {activeTab === "baggage" && (
              <p className={styles.detailsPlaceholder}>
                Baggage rules — coming soon.
              </p>
            )}
            {activeTab === "cancellation" && (
              <p className={styles.detailsPlaceholder}>
                Cancellation & refund — coming soon.
              </p>
            )}
          </div>
        </div>
      )}

      {item.infoBarItems && item.infoBarItems.length > 0 && (
        <div className={styles.infoBar}>
          {item.infoBarItems.map(({ icon: Icon, label }) => (
            <span key={label} className={styles.infoBarItem}>
              <Icon size={14} className={styles.infoBarIcon} aria-hidden />
              <span>{label}</span>
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
