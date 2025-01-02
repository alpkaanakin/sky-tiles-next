"use client";

import {
	decItemQuantity,
	deleteCartItem,
	incItemQuantity,
} from "../_lib/actions";
import CartItemCard from "./CartItemCard";

function CustomerCart({ cart, cartItems }) {
	// const [optimisticBookings, optimisticDelete] = useOptimistic(
	// 	orders,
	// 	(curBookings, orderId) => {
	// 		// Filter out the deleted order
	// 		return curBookings.filter((order) => order.id !== orderId);
	// 	}
	// );

	// Accept the "orderId" parameter
	async function handleDelete(id) {
		// optimisticDelete(orderId);
		await deleteCartItem(id);
	}

	async function handleDecItem(id) {
		console.log("decreasing..");
		await decItemQuantity(id, 1);
	}

	async function handleIncItem(id) {
		console.log("increase");
		await incItemQuantity(id, 1);
	}

	return (
		<ul className="space-y-6">
			{cartItems.map((item) => (
				<CartItemCard
					key={item.id}
					item={item}
					onDelete={() => handleDelete(item.id)}
					onDec={() => handleDecItem(item.id)}
					onInc={() => handleIncItem(item.id)}
				/>
			))}
		</ul>
	);
}

export default CustomerCart;
