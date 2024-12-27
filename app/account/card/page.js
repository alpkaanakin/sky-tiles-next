import OrderCard from "@/app/_components/OrderCard";
import { auth } from "@/app/_lib/auth";
import { getOrders } from "@/app/_lib/data-service";

export const metadata = {
	title: "Reservations",
};

export default async function Page() {
	const session = await auth();
	const orders = await getOrders(session.user.customerId);
	console.log(orders);
	// const orders = 5;

	return (
		<div>
			<h2 className="font-semibold text-2xl text-accent-400 mb-7">Your Card</h2>

			{orders.length === 0 ? (
				<p className="text-lg">
					You have no Orders yet. Check out our{" "}
					<a className="underline text-accent-500" href="/products">
						our products &rarr;
					</a>
				</p>
			) : (
				<OrderCard orders={orders} />
			)}
			<button className="bg-violet-400 px-8 py-4 text-primary-800 font-semibold hover:bg-ciolet-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
				Order Now
			</button>
		</div>
	);
}
