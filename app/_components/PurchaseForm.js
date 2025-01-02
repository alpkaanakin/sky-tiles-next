"use client";

import Link from "next/link";
import { addToCart } from "../_lib/actions";

import SubmitButton from "./SubmitButton";

function PurchaseForm({ product, user, success }) {
	const { stock, id, price } = product;

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

			<form action={addToCart} className="p-4 space-y-4">
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
					<textarea name="id" id="id" value={id} hidden></textarea>
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
			{success && <p className="text-green-500">Added to Cart successfully!</p>}
			<Link
				href="/account/cart"
				className="bg-violet-700 px-8 py-4 text-primary-100 font-semibold hover:bg-violet-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
			>
				Go To Cart
			</Link>
		</div>
	);
}

export default PurchaseForm;
