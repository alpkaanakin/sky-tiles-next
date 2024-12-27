"use client";

import { deleteBooking } from "../_lib/actions";
import { useOptimistic } from "react";
import OrderCardCard from "./OrderCardCard";
import { deleteOrder } from "../_lib/data-service";

function OrderCard({ orders }) {
	const [optimisticBookings, optimisticDelete] = useOptimistic(
		orders,
		(curBookings, orderId) => {
			// Filter out the deleted order
			return curBookings.filter((order) => order.id !== orderId);
		}
	);

	// Accept the "orderId" parameter
	async function handleDelete(orderId) {
		optimisticDelete(orderId);
		await deleteOrder(orderId);
	}

	return (
		<ul className="space-y-6">
			{optimisticBookings.map((order) => (
				<OrderCardCard
					key={order.id}
					order={order}
					// Pass order.id to handleDelete
					onDelete={() => handleDelete(order.id)}
				/>
			))}
		</ul>
	);
}

export default OrderCard;
