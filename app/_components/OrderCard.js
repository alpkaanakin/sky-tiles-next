"use client";

import OrderCardCard from "./OrderCardCard";
import { deleteCartItem } from "../_lib/actions";

function OrderCard({ cart, cartItems }) {
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

	return (
		<ul className="space-y-6">
			{cartItems.map((item) => (
				<OrderCardCard
					key={item.id}
					item={item}
					onDelete={() => handleDelete(item.id)}
				/>
			))}
		</ul>
	);
}

export default OrderCard;
