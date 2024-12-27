import Link from "next/link";
import Image from "next/image";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, parseISO } from "date-fns";
import { getOrder, getProduct } from "../_lib/data-service";
import CancelOrder from "./CancelOrder";

export const formatDistanceFromNow = (dateStr) =>
	formatDistance(parseISO(dateStr), new Date(), {
		addSuffix: true,
	}).replace("about ", "");

async function OrderCardCard({ order, onDelete }) {
	const {
		id,
		// guestId,
		// startDate,
		// endDate,
		// numNights,
		// totalPrice,
		// numGuests,
		// status,
		// created_at,
		// cabins: { name, image },

		status,
		startDate,

		amount,
		product_id,
	} = order;

	const product = await getProduct(product_id);

	console.log(product);

	const { name, image, regularPrice, discount } = product;

	const price = regularPrice - discount;

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
						Total Cost : ${price * amount} ({price} * {amount})
					</p>
					<p className="text-primary-300">&bull;</p>
				</div>
			</div>

			<div className="flex flex-col border-l border-primary-800 w-[100px]">
				{!isPast(startDate) ? (
					<>
						<p
							href={`/account/reservations/edit/${id}`}
							className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
						>
							<PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
							<span className="mt-1">Amount:{amount}</span>
						</p>
						<CancelOrder orderId={id} onDelete={onDelete} />
					</>
				) : null}
			</div>
		</div>
	);
}

export default OrderCardCard;
