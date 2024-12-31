import Link from "next/link";
import Image from "next/image";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, parseISO } from "date-fns";
import { getOrder, getProduct, GetShoppingCart } from "../_lib/data-service";
import DeleteItemFromCart from "./DeleteItemFormCart";

async function OrderCardCard({ item, onDelete }) {
	const {
		quantity,
		id,
		price,
		products: { name, image },
	} = item;
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
						not Paid
					</span>
				</div>

				<div className="flex gap-5 mt-auto items-baseline">
					<p className="text-xl font-semibold text-accent-400">
						Total Cost : ${price * quantity} ({price} * {quantity})
					</p>
					<p className="text-primary-300">&bull;</p>
				</div>
			</div>

			<div className="flex flex-col border-l border-primary-800 w-[100px]">
				<>
					<p
						href={`/account/reservations/edit/${id}`}
						className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
					>
						<PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
						<span className="mt-1">Amount:{quantity}</span>
					</p>
					<DeleteItemFromCart itemId={id} onDelete={onDelete} />
				</>
			</div>
		</div>
	);
}

export default OrderCardCard;
