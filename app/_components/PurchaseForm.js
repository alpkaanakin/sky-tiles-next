"use client";

import { createOrder } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function PurchaseForm({ product, user }) {
	const { stock, regularPrice, discount, id } = product;
	const finalPrice = regularPrice - discount;

	// Merge user data directly into orderData
	const orderData = {
		productId: id,
		finalPrice,
		userId: user.customerId, // or session user id
		userEmail: user.email, // or any user fields you need
		userImage: user.image,
		userName: user.name,
	};

	// Bind the orderData to your server action
	const createOrderWithData = createOrder.bind(null, orderData);

	return (
		<div className="border p-4 rounded">
			<div className="bg-violet-900 px-4 py-2 flex justify-between items-center">
				<p>Logged in as</p>
				<div className="flex gap-4 items-center">
					<img
						referrerPolicy="no-referrer"
						className="h-8 w-8 rounded-full"
						src={user.image}
						alt={user.name}
					/>
					<p>{user.name}</p>
				</div>
			</div>

			<form
				action={async (formData) => {
					// formData -> quantity, notes, etc.
					await createOrderWithData(formData);
					// handle any post-submit logic
				}}
				className="p-4 space-y-4"
			>
				<div>
					<label htmlFor="quantity" className="block mb-1 font-medium">
						Quantity
					</label>
					<select
						name="quantity"
						id="quantity"
						className="px-3 py-2 bg-white border rounded"
						required
					>
						<option value="">Select quantity...</option>
						{Array.from({ length: stock }, (_, i) => i + 1).map((count) => (
							<option key={count} value={count}>
								{count}
							</option>
						))}
					</select>
				</div>

				<div>
					<label htmlFor="notes" className="block mb-1 font-medium">
						Special instructions?
					</label>
					<textarea
						name="notes"
						id="notes"
						className="w-full px-3 py-2 bg-white border rounded"
						placeholder="Gift wrapping, phone number, etc."
					/>
				</div>

				<div className="flex justify-end">
					<SubmitButton pendingLabel="Processing...">Buy now</SubmitButton>
				</div>
			</form>
		</div>
	);
}

export default PurchaseForm;
