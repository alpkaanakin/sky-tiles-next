"use client";

import CartItemCard from "./CartItemCard";

function CustomerCart({ cart, cartItems }) {
	// const [optimisticBookings, optimisticDelete] = useOptimistic(
	// 	orders,
	// 	(curBookings, orderId) => {
	// 		// Filter out the deleted order
	// 		return curBookings.filter((order) => order.id !== orderId);
	// 	}
	// );

	// // Accept the "orderId" parameter
	// async function handleDelete(id) {
	// 	// optimisticDelete(orderId);
	// 	await deleteCartItem(id);
	// }

	// async function handleDecItem(id, stock) {
	// 	console.log("decreasing..");
	// 	await decItemQuantity(id, stock);
	// }

	// async function handleIncItem(id, stock) {
	// 	console.log("increase");
	// 	await incItemQuantity(id, stock);
	// }

	return (
		<ul className="space-y-6">
			{cartItems.map((item) => (
				<CartItemCard key={item.id} item={item} />
			))}
		</ul>
	);
}

export default CustomerCart;
