import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getCustomer, getGuest } from "@/app/_lib/data-service";

export const metadata = {
	title: "Update profile",
};

export default async function Page({ searchParams }) {
	const session = await auth();
	const customer = await getCustomer(session.user.email);
	const { success } = searchParams;

	return (
		<div>
			<h2 className="font-semibold text-2xl text-violet-400 mb-4">
				Update your customer profile
			</h2>

			<p className="text-lg mb-8 text-primary-200">
				Please use a valid tax number and correct adress
			</p>

			<UpdateProfileForm customer={customer} success={success}>
				<SelectCountry
					name="nationality"
					id="nationality"
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
					defaultCountry={customer.nationality}
				/>
			</UpdateProfileForm>
		</div>
	);
}
