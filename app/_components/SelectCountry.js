import { getCountries } from "@/app/_lib/data-service";

async function SelectCountry({ defaultCountry, name, id, className }) {
	const countries = await getCountries();

	return (
		<select
			name={name}
			id={id}
			defaultValue={defaultCountry}
			className={className}
		>
			<option value="">Select country...</option>
			{countries.map((c) => (
				<option key={c.name} value={c.name}>
					{c.name}
				</option>
			))}
		</select>
	);
}

export default SelectCountry;
