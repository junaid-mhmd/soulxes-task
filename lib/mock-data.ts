import {
	Building2,
	Luggage,
	ThumbsUp,
	Ticket,
	UserRound,
	Zap,
} from "lucide-react";
import type {
	FilterGroup,
	FlightCardData,
	PromoCardData,
	SortTab,
} from "@/app/components/main-section/types";
import { getLocationOptions, getSearchAirlineOptions } from "./utils";

export const sortTabs: SortTab[] = [
	{
		id: "recommended",
		label: "Recommended",
		subLabel: "$500 - 10h 20m",
		icon: ThumbsUp,
	},
	{
		id: "fastest",
		label: "Fastest",
		subLabel: "$500 - 10h 20m",
		icon: Zap,
	},
	{
		id: "cheapest",
		label: "Cheapest",
		subLabel: "$500 - 10h 20m",
		image: { src: "/assets/low.png", alt: "Cheapest" },
	},
];

export const flights: FlightCardData[] = [
	{
		airline: "IndiGo",
		cabin: "Economy",
		price: "$18,500",
		seats: "100 seats remaining",
		refund: "Partially Refundable",
		refundTone: "warning",
		trip: "oneway",
		rows: [
			{
				date: "Mon, 24 Feb 2026",
				fromTime: "14:50",
				fromLocation:
					"Chhatrapati Shivaji Maharaj International (BOM), Mumbai, India",
				duration: "3hr 10min",
				toTime: "18:00",
				toLocation: "Dubai International (DXB), Dubai, UAE",
				hasEntertainment: true,
				hasWifi: true,
				hasBaggage: true,
				hasInfo: true,
			},
		],
		stops: "nonstop",
		airlineValue: "indigo",
		infoBarItems: [
			{
				icon: Ticket,
				label: "Separate tickets booked together for cheaper price",
			},
			{ icon: Building2, label: "Change of Terminal" },
			{ icon: UserRound, label: "Self Transfer" },
			{ icon: Luggage, label: "7kg" },
		],
	},
	{
		airline: "Emirates",
		cabin: "Economy",
		price: "$22,400",
		seats: "100 seats remaining",
		refund: "Partially Refundable",
		refundTone: "warning",
		trip: "roundtrip",
		rows: [
			{
				date: "Mon, 24 Feb 2026",
				fromTime: "02:30",
				fromLocation:
					"Chhatrapati Shivaji Maharaj International (BOM), Mumbai, India",
				duration: "3hr 25min",
				toTime: "05:55",
				toLocation: "Dubai International (DXB), Dubai, UAE",
				hasEntertainment: true,
				hasWifi: true,
				hasBaggage: true,
			},
		],
		stops: "nonstop",
		airlineValue: "emirates",
	},
	{
		airline: "Etihad Airways",
		cabin: "Economy",
		price: "$19,200",
		seats: "80 seats remaining",
		refund: "Non-refundable",
		refundTone: "danger",
		trip: "multicity",
		rows: [
			{
				date: "Mon, 24 Feb 2026",
				fromTime: "09:15",
				fromLocation: "Indira Gandhi International (DEL), Delhi, India",
				duration: "3hr 50min",
				toTime: "12:05",
				toLocation: "Abu Dhabi International (AUH), Abu Dhabi, UAE",
				hasEntertainment: true,
				hasWifi: true,
				hasBaggage: true,
				hasInfo: true,
				layoverAfter:
					"Change of Terminal • Change of planes • 2h 15m Layover in Abu Dhabi",
			},
			{
				date: "Mon, 24 Feb 2026",
				fromTime: "14:20",
				fromLocation: "Abu Dhabi International (AUH), Abu Dhabi, UAE",
				duration: "1hr 05min",
				toTime: "15:25",
				toLocation: "Dubai International (DXB), Dubai, UAE",
				hasEntertainment: true,
				hasWifi: true,
			},
		],
		stops: "1stop",
		airlineValue: "etihad",
	},
	{
		airline: "IndiGo",
		cabin: "Economy",
		price: "$15,800",
		seats: "50 seats remaining",
		refund: "Partially Refundable",
		refundTone: "warning",
		trip: "multicity",
		rows: [
			{
				date: "Mon, 24 Feb 2026",
				fromTime: "06:00",
				fromLocation: "Indira Gandhi International (DEL), Delhi, India",
				duration: "4hr 15min",
				toTime: "10:15",
				toLocation: "Hamad International (DOH), Doha, Qatar",
				hasEntertainment: true,
				hasWifi: true,
				layoverAfter: "Change of planes • 2h 15m Layover in Doha",
			},
			{
				date: "Mon, 24 Feb 2026",
				fromTime: "12:30",
				fromLocation: "Hamad International (DOH), Doha, Qatar",
				duration: "1hr 20min",
				toTime: "13:50",
				toLocation: "Dubai International (DXB), Dubai, UAE",
				hasEntertainment: true,
				hasWifi: true,
				hasBaggage: true,
				hasInfo: true,
				layoverAfter: "Change of Terminal • 2h 10m Layover in Dubai",
			},
			{
				date: "Mon, 24 Feb 2026",
				fromTime: "16:00",
				fromLocation: "Dubai International (DXB), Dubai, UAE",
				duration: "1hr 10min",
				toTime: "17:10",
				toLocation: "Abu Dhabi International (AUH), Abu Dhabi, UAE",
				hasEntertainment: true,
				hasWifi: true,
				hasBaggage: true,
				hasInfo: true,
			},
		],
		stops: "2stops",
		airlineValue: "indigo",
	},
	{
		airline: "Emirates",
		cabin: "Premium",
		price: "$12,200",
		seats: "50 seats remaining",
		refund: "Partially Refundable",
		refundTone: "warning",
		trip: "oneway",
		rows: [
			{
				date: "Tue, 25 Feb 2026",
				fromTime: "08:00",
				fromLocation: "Dubai International (DXB), Dubai, UAE",
				duration: "3hr 15min",
				toTime: "11:15",
				toLocation:
					"Chhatrapati Shivaji Maharaj International (BOM), Mumbai, India",
				hasEntertainment: true,
				hasWifi: true,
				hasBaggage: true,
				hasInfo: true,
			},
		],
		stops: "nonstop",
		airlineValue: "emirates",
	},
	{
		airline: "IndiGo",
		cabin: "Business",
		price: "$14,800",
		seats: "80 seats remaining",
		refund: "Non-refundable",
		refundTone: "danger",
		trip: "oneway",
		rows: [
			{
				date: "Tue, 25 Feb 2026",
				fromTime: "10:30",
				fromLocation: "Kempegowda International (BLR), Bengaluru, India",
				duration: "3hr 30min",
				toTime: "14:00",
				toLocation: "Dubai International (DXB), Dubai, UAE",
				hasEntertainment: true,
				hasWifi: true,
				hasBaggage: true,
				hasInfo: true,
			},
		],
		stops: "nonstop",
		airlineValue: "indigo",
	},
];

// Flight dropdown options for search form
export const searchAirlineOptions = getSearchAirlineOptions(flights);

// From/To location options
export const locationOptions = getLocationOptions(flights);

// Default filter groups (Stop, Airlines, Baggage)
export const filterGroups: FilterGroup[] = [
	{
		title: "Stop",
		filterKey: "stops",
		options: [
			{ label: "Nonstop", price: "", value: "nonstop" },
			{ label: "1 Stop", price: "", value: "1stop" },
			{ label: "2+ Stops", price: "", value: "2stops" },
		],
	},
	{
		title: "Airlines",
		filterKey: "airlines",
		options: [],
	},
	{
		title: "Travel and Baggage",
		filterKey: "baggage",
		options: [
			{ label: "Carry-on bag", price: "$129", value: "carryon" },
			{ label: "Checked bag", price: "$99", value: "checked" },
		],
	},
];

const stopLabels: Record<string, string> = {
	nonstop: "Nonstop",
	"1stop": "1 Stop",
	"2stops": "2+ Stops",
};

export function deriveFilterGroupsFromFlights(
	flightList: FlightCardData[]
): FilterGroup[] {
	const stopCounts = new Map<string, { count: number; minPrice: number }>();
	const airlineCounts = new Map<
		string,
		{ label: string; count: number; minPrice: number }
	>();

	for (const f of flightList) {
		const priceNum = parseInt(f.price.replace(/[^0-9]/g, ""), 10) || 0;
		if (f.stops) {
			const cur = stopCounts.get(f.stops) ?? { count: 0, minPrice: priceNum };
			stopCounts.set(f.stops, {
				count: cur.count + 1,
				minPrice: Math.min(cur.minPrice, priceNum),
			});
		}
		if (f.airlineValue && f.airline) {
			const cur = airlineCounts.get(f.airlineValue) ?? {
				label: f.airline,
				count: 0,
				minPrice: priceNum,
			};
			airlineCounts.set(f.airlineValue, {
				label: cur.label,
				count: cur.count + 1,
				minPrice: Math.min(cur.minPrice, priceNum),
			});
		}
	}

	const formatPrice = (n: number) => (n > 0 ? `$${n.toLocaleString()}` : "");

	const stopOptions = Array.from(stopCounts.entries())
		.sort((a, b) => {
			const order = ["nonstop", "1stop", "2stops"];
			return order.indexOf(a[0]) - order.indexOf(b[0]);
		})
		.map(([value, { count, minPrice }]) => ({
			label: `${stopLabels[value] ?? value} (${count})`,
			price: formatPrice(minPrice),
			value,
		}));

	const airlineOptions = Array.from(airlineCounts.entries()).map(
		([value, { label, count, minPrice }]) => ({
			label: `${label} (${count})`,
			price: formatPrice(minPrice),
			value,
		})
	);

	return [
		{
			title: "Stop",
			filterKey: "stops",
			options: stopOptions,
		},
		{
			title: "Airlines",
			filterKey: "airlines",
			options: airlineOptions,
		},
		filterGroups[2],
	];
}

export const rightBoxes: PromoCardData[] = [
	{
		title: "International Guideline",
		description:
			"COVID safety measures adopted by various countries including VISA restrictions, quarantine rules, etc.",
		cta: "View guidelines",
		image: "/assets/img1.png",
	},
	{
		title: "We've found you a great deal!",
		description:
			"Get more, spend less with up to $575 off when you book your flight + stay together,",
		cta: "Shop flight",
		image: "/assets/img2.png",
	},
	{
		title: "Log-in and get exclusive",
		description:
			"bonus discounts for members and personalised offers waiting for your next trip.",
		cta: "Login/Create Account",
		image: "/assets/img3.png",
	},
];
