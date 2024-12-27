import AddtoCard from "@/app/_components/AddtoCard";
import Product from "@/app/_components/Product";
import Spinner from "@/app/_components/Spinner";
import { getProduct, getProducts } from "@/app/_lib/data-service";
import Link from "next/link";

import { Suspense } from "react";

export async function generateMetadata({ params }) {
	const { name } = await getProduct(params.productId);
	return { title: `${name}` };
}

export async function generateStaticParams() {
	const products = await getProducts();

	const ids = products.map((product) => ({ productId: String(product.id) }));

	return ids;
}

export default async function Page({ params }) {
	const product = await getProduct(params.productId);

	return (
		<div className="max-w-6xl mx-auto mt-8">
			<Product product={product} />

			<div>
				<Suspense fallback={<Spinner />}>
					<AddtoCard product={product} />
				</Suspense>

				<Link
					href="/account/card"
					className="bg-violet-700 px-8 py-4 text-primary-100 font-semibold hover:bg-violet-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
				>
					Go To Card
				</Link>
			</div>
		</div>
	);
}
