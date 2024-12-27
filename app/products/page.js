import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import ProductList from "../_components/ProductList";

export const revalidate = 3600;
// export const revalidate = 15;

export const metadata = {
	title: "Products",
};

export default function Page({ searchParams }) {
	const filter = searchParams?.capacity ?? "all";

	return (
		<div>
			<h1 className="text-4xl mb-5 text--400 font-medium">
				Discover Natural Marble Decorations
			</h1>
			<p className="text-primary-200 text-lg mb-10">
				Durable and luxurious, marble trays are more than just decorative;
				they’re built to last while maintaining their visual appeal. Their
				natural stone construction makes each piece unique, as no two marble
				patterns are alike.
			</p>

			<Suspense fallback={<Spinner />} key={filter}>
				<ProductList filter={filter} />
				{/* <ReservationReminder /> */}
			</Suspense>
		</div>
	);
}
