import Image from "next/image";
import DeleteItemFromCart from "./DeleteItemFormCart";
import {
	decItemQuantity,
	deleteCartItem,
	incItemQuantity,
} from "../_lib/actions";

async function CartItemCard({ item, onDelete, onDec, onInc }) {
	const {
		quantity,
		id,
		price,
		products: { name, image, stock },
	} = item;

	async function handleDelete() {
		await deleteCartItem(id);
	}

	async function handleDecItem() {
		console.log("decreasing..");
		await decItemQuantity(id, stock);
	}

	async function handleIncItem() {
		console.log("increase");
		await incItemQuantity(id, stock);
	}

	return (
		<div className="flex border border-primary-800">
			<div className="relative h-32 aspect-square">
				<Image
					src={image}
					alt={`Cabin ${name}`}
					fill
					className="object-cover border-r border-primary-800"
				/>
			</div>

			<div className="flex-grow px-6 py-3 flex flex-col">
				<div className="flex items-center justify-between">
					<h3 className="text-xl font-semibold">{name}</h3>

					<span className="bg-amber-300 text-primary-900 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
						Only {stock} items Left
					</span>
				</div>

				<div className="flex gap-5 mt-auto items-baseline">
					<p className="text-xl font-semibold text-violet-400">
						Price : ${price * quantity} ({price} * {quantity})
					</p>
				</div>
			</div>

			<div className="flex flex-col border-l border-primary-800 w-[100px]">
				<>
					<div className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3">
						<button
							className="text-4xl hover:bg-violet-600 transition-colors hover:text-primary-900 p-1"
							onClick={handleDecItem}
						>
							-
						</button>
						<span className="mt-1 text-xl">{quantity}</span>

						<button
							className="text-2xl hover:bg-violet-600 transition-colors hover:text-primary-900 text-align p-1"
							onClick={handleIncItem}
						>
							+
						</button>
					</div>
					<DeleteItemFromCart itemId={id} onDelete={handleDelete} />
				</>
			</div>
		</div>
	);
}

export default CartItemCard;
