import type { FlightCardData } from "@/app/components/main-section/types";

export function parsePrice(price: string) {
	const n = parseInt(price.replace(/[^0-9]/g, ""), 10);
	return Number.isNaN(n) ? 0 : n;
}

// Normalise date for matching against list display
export function formatDateForMatch(dateStr: string): string {
	if (!dateStr) return "";
	const d = new Date(dateStr);
	if (Number.isNaN(d.getTime())) return "";
	return d.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
}

export function matchesSearch(
	flight: FlightCardData,
	from: string,
	to: string,
	depart: string,
	returnDate: string
): boolean {
	const first = flight.rows?.[0];
	const last = flight.rows?.[flight.rows.length - 1];
	if (!first) return false;

	const fromLower = from.trim().toLowerCase();
	const toLower = to.trim().toLowerCase();
	if (fromLower && !first.fromLocation.toLowerCase().includes(fromLower))
		return false;
	if (toLower) {
		const toLoc = last ? last.toLocation : first.toLocation;
		if (!toLoc.toLowerCase().includes(toLower)) return false;
	}
	if (depart) {
		const departStr = formatDateForMatch(depart);
		if (departStr && !first.date.includes(departStr)) return false;
	}
	if (returnDate && last) {
		const returnStr = formatDateForMatch(returnDate);
		if (returnStr && !last.date.includes(returnStr)) return false;
	}
	return true;
}

export function filterBySearch(
	list: FlightCardData[],
	from: string,
	to: string,
	depart: string,
	returnDate: string
): FlightCardData[] {
	if (!from && !to && !depart && !returnDate) return list;
	return list.filter((f) => matchesSearch(f, from, to, depart, returnDate));
}

export function filterAndSortFlights(
	list: FlightCardData[],
	stops: string[],
	airlines: string[],
	sort: "recommended" | "fastest" | "cheapest"
): FlightCardData[] {
	let result = list;

	if (stops.length > 0) {
		result = result.filter((f) => f.stops && stops.includes(f.stops));
	}
	if (airlines.length > 0) {
		result = result.filter(
			(f) => f.airlineValue && airlines.includes(f.airlineValue)
		);
	}

	if (sort === "cheapest") {
		result = [...result].sort(
			(a, b) => parsePrice(a.price) - parsePrice(b.price)
		);
	} else if (sort === "fastest") {
		result = [...result].sort(
			(a, b) => (a.rows?.length ?? 0) - (b.rows?.length ?? 0)
		);
	}

	return result;
}

export function getSearchAirlineOptions(flightList: FlightCardData[]) {
	const seen = new Set<string>();
	return flightList
		.filter((f) => {
			if (!f.airlineValue || seen.has(f.airlineValue)) return false;
			seen.add(f.airlineValue);
			return true;
		})
		.map((f) => ({ label: f.airline, value: f.airlineValue! }));
}

export function getLocationOptions(flightList: FlightCardData[]): string[] {
	const seen = new Set<string>();
	for (const f of flightList) {
		for (const row of f.rows ?? []) {
			if (row.fromLocation?.trim()) seen.add(row.fromLocation.trim());
			if (row.toLocation?.trim()) seen.add(row.toLocation.trim());
		}
	}
	return Array.from(seen).sort();
}
