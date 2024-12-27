import Image from "next/image";
import Link from "next/link";
import { UsersIcon } from "@heroicons/react/24/solid";

function ProductCard({ product }) {
	const { id, name, regularPrice, discount, image } = product;

	return (
		<div className="flex border-primary-800 border">
			<div className="flex-1 relative">
				<Image
					src={image}
					fill
					alt={`${name}`}
					className="object-cover border-r border-primary-800"
				/>
			</div>

			<div className="flex-2">
				<div className="pt-5 pb-4 px-7 bg-primary-950">
					<h3 className="text-violet-500 font-semibold text-2xl mb-3">
						{name}
					</h3>

					<div className="flex gap-3 items-center mb-2">
						<p className="text-lg text-primary-200">Gift Wraping Available</p>
					</div>
					<div className="flex gap-3 items-center mb-2">
						<p className="text-lg text-primary-200">Unique Product</p>
					</div>

					<p className="flex gap-3 justify-end items-baseline">
						{discount > 0 ? (
							<>
								<span className="text-3xl font-[350]">
									${regularPrice - discount}
								</span>
								<span className="line-through font-semibold text-primary-600">
									${regularPrice}
								</span>
							</>
						) : (
							<span className="text-3xl font-[350]">${regularPrice}</span>
						)}
						<span className="text-primary-200">/ pcs</span>
					</p>
				</div>

				<div className="bg-primary-950 border-t border-t-primary-800 text-right">
					<Link
						href={`/products/${id}`}
						className="border-l border-primary-800 py-4 px-6 inline-block hover:bg-violet-600 transition-all hover:text-primary-900"
					>
						Details &rarr;
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ProductCard;
