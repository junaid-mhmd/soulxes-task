"use client";

import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import Container from "@/components/ui/container";
import ResultItem from "./result-item";
import RightBoxItem from "./right-box-item";
import SideFilter from "./side-filter";
import {
	deriveFilterGroupsFromFlights,
	flights,
	rightBoxes,
	sortTabs,
} from "@/lib/mock-data";
import { filterAndSortFlights, filterBySearch } from "@/lib/utils";
import {
	parseAsArrayOf,
	parseAsString,
	parseAsStringLiteral,
	useQueryStates,
} from "nuqs";
import type { SortTab } from "./types";
import styles from "./styles.module.scss";

const sortIds = ["recommended", "fastest", "cheapest"] as const;

const queryParsers = {
	from: parseAsString.withDefault(""),
	to: parseAsString.withDefault(""),
	depart: parseAsString.withDefault(""),
	return: parseAsString.withDefault(""),
	stops: parseAsArrayOf(parseAsString, ",").withDefault([] as string[]),
	airlines: parseAsArrayOf(parseAsString, ",").withDefault([] as string[]),
	baggage: parseAsArrayOf(parseAsString, ",").withDefault([] as string[]),
	sort: parseAsStringLiteral(sortIds).withDefault("recommended"),
	trip: parseAsString.withDefault(""),
	class: parseAsString.withDefault(""),
	type: parseAsString.withDefault(""),
} as const;

function SortTabIcon({ tab, isActive }: { tab: SortTab; isActive: boolean }) {
	if (tab.image) {
		return (
			<Image src={tab.image.src} alt={tab.image.alt} width={16} height={16} />
		);
	}
	const Icon = tab.icon as LucideIcon;
	return <Icon fill={isActive ? "#5F35B0" : "#000000"} size={16} />;
}

function MainSection() {
	const [params, setParams] = useQueryStates(queryParsers);
	const activeTab = params.sort;

	let flightsBySearch = filterBySearch(
		flights,
		params.from,
		params.to,
		params.depart,
		params.return
	);

	console.log(params);

	if (params.type) {
		flightsBySearch = flightsBySearch.filter(
			(f) => f.airlineValue === params.type
		);
	}
	if (params.class) {
		flightsBySearch = flightsBySearch.filter(
			(f) => f.cabin.toLowerCase() === params.class
		);
	}
	if (params.trip) {
		flightsBySearch = flightsBySearch.filter(
			(f) => f.trip.toLowerCase() === params.trip
		);
	}
	const filterGroups = deriveFilterGroupsFromFlights(flightsBySearch);
	const filteredFlights = filterAndSortFlights(
		flightsBySearch,
		params.stops,
		params.airlines,
		params.sort
	);

	return (
		<section className={styles.mainSection}>
			<Container>
				<div className={styles.grid}>
					<SideFilter groups={filterGroups} />

					<div className={styles.resultsCol}>
						<div className={styles.sortTabs}>
							{sortTabs.map((tab) => (
								<button
									key={tab.id}
									type="button"
									className={activeTab === tab.id ? styles.activeTab : ""}
									onClick={() => setParams({ sort: tab.id })}
								>
									<span className={styles.tabIcon}>
										<SortTabIcon tab={tab} isActive={activeTab === tab.id} />
									</span>
									<div className={styles.tabContent}>
										<strong>{tab.label}</strong>
										<span>{tab.subLabel}</span>
									</div>
								</button>
							))}
						</div>

						<div className={styles.cardsStack}>
							{filteredFlights.length === 0 ? (
								<div className={styles.notFoundCard}>
									<p className={styles.notFoundTitle}>No flights found</p>
									<p className={styles.notFoundText}>
										Change your search or filters to see more results.
									</p>
									<button
										type="button"
										className={styles.notFoundBtn}
										onClick={() =>
											setParams({
												from: "",
												to: "",
												depart: "",
												return: "",
												type: "",
												stops: [],
												airlines: [],
												baggage: [],
												sort: "recommended",
											})
										}
									>
										Clear search
									</button>
								</div>
							) : (
								filteredFlights.map((flight, idx) => (
									<ResultItem key={`${flight.airline}-${idx}`} item={flight} />
								))
							)}
						</div>
					</div>

					<aside className={styles.promoCol}>
						{rightBoxes.map((box) => (
							<RightBoxItem
								key={box.title}
								title={box.title}
								description={box.description}
								cta={box.cta}
								icon={box.icon}
								image={box.image}
							/>
						))}
					</aside>
				</div>
			</Container>
		</section>
	);
}

export default MainSection;
