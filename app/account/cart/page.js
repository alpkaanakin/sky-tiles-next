import CustomerCart from "@/app/_components/CustomerCart";
import { auth } from "@/app/_lib/auth";
import {
	createShoppingCart,
	GetCartItems,
	getOrders,
	GetShoppingCart,
} from "@/app/_lib/data-service";

export const metadata = {
	title: "Reservations",
};

export default async function Page() {
	const session = await auth();
	const cart = await GetShoppingCart(session.user.customerId);
	if (!cart) {
		createShoppingCart(session.user.customerId);
	}
	const cartItems = await GetCartItems(cart.id);

	// const orders = 5;

	return (
		<div>
			<h2 className="font-semibold text-2xl text-accent-400 mb-7">Your Card</h2>
			{cartItems.length === 0 ? (
				<p className="text-lg">
					You have no item in your cart{" "}
					<a className="underline text-accent-500" href="/products">
						our products &rarr;
					</a>
				</p>
			) : (
				// <h1>hello</h1>
				<CustomerCart cart={cart} cartItems={cartItems} />
			)}
			{/* <button className="bg-violet-400 px-8 py-4 text-primary-800 font-semibold hover:bg-ciolet-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
				Order Now
			</button> */}
		</div>
	);
}
