"use client";

import { use, useEffect } from "react";
import { useForm, Controller, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Container from "@/components/ui/container";
import Input from "@/components/ui/input";
import AutocompleteInput from "@/components/ui/autocomplete-input";
import Select from "@/components/ui/select";
import Button from "@/components/ui/button";
import DateRangeInput from "@/components/ui/date-range-input";
import {
	ArrowLeftRight,
	Calendar,
	PlaneLanding,
	PlaneTakeoff,
	Search,
	User,
	X,
} from "lucide-react";
import { locationOptions, searchAirlineOptions } from "@/lib/mock-data";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import styles from "./styles.module.scss";
import { usePathname, useRouter } from "next/navigation";

const searchFormSchema = z.object({
	from: z.string().min(1, "Origin is required"),
	to: z.string().min(1, "Destination is required"),
	depart: z.string().min(1, "Departure date is required"),
	return: z.string().min(1, "Return date is required"),
	pax: z
		.union([z.string(), z.number()])
		.transform((v) => {
			const n = typeof v === "string" ? parseInt(v, 10) : v;
			return Number.isNaN(n) || n < 1 ? 1 : n;
		})
		.pipe(z.number().int().min(1, "At least 1 traveller")),
	trip: z.string(),
	class: z.string(),
	type: z.string(),
});

export type SearchFormValues = z.infer<typeof searchFormSchema>;

const searchKeys = {
	from: parseAsString.withDefault(""),
	to: parseAsString.withDefault(""),
	depart: parseAsString.withDefault(""),
	return: parseAsString.withDefault(""),
	pax: parseAsInteger.withDefault(1),
	trip: parseAsString.withDefault(""),
	class: parseAsString.withDefault(""),
	type: parseAsString.withDefault(""),
};

const defaultValues: SearchFormValues = {
	from: "",
	to: "",
	depart: "",
	return: "",
	pax: 1,
	trip: "",
	class: "",
	type: "",
};

function SearchSection() {
	const [applied, setApplied] = useQueryStates(searchKeys);
	const form = useForm<SearchFormValues>({
		// resolver: zodResolver(searchFormSchema) as Resolver<SearchFormValues>,
		defaultValues: {
			...defaultValues,
			...applied,
		},
	});

	const router = useRouter();
	const pathname = usePathname();

	// useEffect(() => {
	// 	form.reset({ ...defaultValues, ...applied });
	// }, [
	// 	applied.from,
	// 	applied.to,
	// 	applied.depart,
	// 	applied.return,
	// 	applied.pax,
	// 	applied.trip,
	// 	applied.class,
	// 	applied.type,
	// 	form,
	// ]);

	const handleSwap = () => {
		const from = form.getValues("from");
		const to = form.getValues("to");
		form.setValue("from", to);
		form.setValue("to", from);
	};

	const {
		formState: { errors },
		watch,
	} = form;

	const onSubmit = (values: SearchFormValues) => {
		setApplied({
			from: values.from,
			to: values.to,
			depart: values.depart,
			return: values.return,
			pax: values.pax,
			trip: values.trip,
			class: values.class,
			type: values.type,
		});
	};

	// useEffect(() => {
	// 	setApplied({
	// 		...form.getValues(),
	// 	});
	// }, [setApplied, form]);

	const claerSearch = () => {
		form.reset({});
		setApplied({
			from: "",
			to: "",
			depart: "",
			return: "",
			pax: 1,
			trip: "",
			class: "",
			type: "",
		});
		router.push(pathname);
	};

	console.log(pathname, "p");

	const from = watch("from");
	const to = watch("to");

	return (
		<section className={styles.search}>
			<Container>
				<form
					className={styles.searchForm}
					onSubmit={form.handleSubmit(onSubmit)}
					noValidate
				>
					<div className={styles.topRow}>
						<div className={styles.fieldWithError}>
							<Select
								inputSize="sm"
								placeholder="Select flight"
								className={styles.topSelect}
								aria-invalid={Boolean(errors.type)}
								{...form.register("type", {
									onChange() {
										setApplied({
											...applied,
											type: watch("type"),
										});
									},
								})}
							>
								<option value="">Select flight</option>
								{searchAirlineOptions.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</Select>
							{errors.type && (
								<span className={styles.fieldError} role="alert">
									{errors.type.message}
								</span>
							)}
						</div>
						<div className={styles.fieldWithError}>
							<Select
								inputSize="sm"
								placeholder="Select Class"
								className={styles.topSelect}
								aria-invalid={Boolean(errors.class)}
								{...form.register("class", {
									onChange() {
										setApplied({
											...applied,
											class: watch("class"),
										});
									},
								})}
							>
								<option value="">Select Class</option>
								<option value="economy">Economy</option>
								<option value="premium">Premium</option>
								<option value="business">Business</option>
							</Select>
							{errors.class && (
								<span className={styles.fieldError} role="alert">
									{errors.class.message}
								</span>
							)}
						</div>
						<div className={styles.fieldWithError}>
							<Select
								inputSize="sm"
								placeholder="Select Trip"
								className={styles.topSelect}
								aria-invalid={Boolean(errors.trip)}
								{...form.register("trip", {
									onChange() {
										setApplied({
											...applied,
											trip: watch("trip"),
										});
									},
								})}
							>
								<option value="">Select Trip</option>
								<option value="roundtrip">Round trip</option>
								<option value="oneway">One way</option>
								<option value="multicity">Multi-city</option>
							</Select>
							{errors.trip && (
								<span className={styles.fieldError} role="alert">
									{errors.trip.message}
								</span>
							)}
						</div>
					</div>
					<div className={styles.bottomRow}>
						<div className={styles.bottomRowLeft}>
							<div className={styles.fieldWithError}>
								<Controller
									name="from"
									control={form.control}
									rules={{
										validate: (val) => {
											if (!val && to) {
												return "From is required";
											}
										},
									}}
									render={({ field }) => (
										<AutocompleteInput
											options={locationOptions}
											value={field.value}
											onChange={field.onChange}
											onBlur={field.onBlur}
											placeholder="From"
											inputSize="md"
											className={styles.bottomField}
											leftIcon={<PlaneTakeoff size={16} />}
										/>
									)}
								/>
								{errors.from && (
									<span className={styles.fieldError} role="alert">
										{errors.from.message}
									</span>
								)}
							</div>
							<Button
								type="button"
								buttonSize="md"
								className={styles.swapButton}
								aria-label="Swap origin and destination"
								leftIcon={<ArrowLeftRight size={16} />}
								onClick={handleSwap}
							/>
							<div className={styles.fieldWithError}>
								<Controller
									name="to"
									control={form.control}
									rules={{
										validate: (val) => {
											if (!val && from) {
												return "To is required";
											}
										},
									}}
									render={({ field }) => (
										<AutocompleteInput
											options={locationOptions}
											value={field.value}
											onChange={field.onChange}
											onBlur={field.onBlur}
											placeholder="To"
											inputSize="md"
											className={styles.bottomField}
											leftIcon={<PlaneLanding size={16} />}
										/>
									)}
								/>
								{errors.to && (
									<span className={styles.fieldError} role="alert">
										{errors.to.message}
									</span>
								)}
							</div>
						</div>
						<div className={styles.fieldWithError}>
							<Controller
								name="depart"
								control={form.control}
								render={({ field: departField }) => (
									<Controller
										name="return"
										control={form.control}
										render={({ field: returnField }) => (
											<DateRangeInput
												placeholder="Departing - Returning"
												className={styles.bottomField}
												leftIcon={<Calendar size={16} />}
												aria-invalid={Boolean(errors.depart || errors.return)}
												value={{
													start: departField.value,
													end: returnField.value,
												}}
												onChange={(range) => {
													departField.onChange(range.start);
													returnField.onChange(range.end);
												}}
											/>
										)}
									/>
								)}
							/>
							{(errors.depart || errors.return) && (
								<span className={styles.fieldError} role="alert">
									{[errors.depart?.message, errors.return?.message]
										.filter(Boolean)
										.join(" · ")}
								</span>
							)}
						</div>
						<div className={styles.fieldWithError}>
							<Input
								placeholder="Travellers"
								inputSize="md"
								type="number"
								min={1}
								className={styles.bottomField}
								leftIcon={<User size={16} />}
								aria-invalid={Boolean(errors.pax)}
								{...form.register("pax")}
							/>
							{errors.pax && (
								<span className={styles.fieldError} role="alert">
									{errors.pax.message}
								</span>
							)}
						</div>
						<Button
							type="submit"
							buttonSize="md"
							className={styles.searchButton}
							leftIcon={<Search size={16} />}
						>
							Search
						</Button>
						<Button
							type="button"
							buttonSize="md"
							className={styles.clearButton}
							onClick={() => claerSearch()}
						>
							Clear
						</Button>
					</div>
				</form>
			</Container>
		</section>
	);
}

export default SearchSection;
