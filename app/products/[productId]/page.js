import AddtoCart from "@/app/_components/AddtoCart";
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

export default async function Page({ params, searchParams }) {
	const product = await getProduct(params.productId);
	const success = searchParams;

	return (
		<div className="max-w-6xl mx-auto mt-8">
			<Product product={product} />

			<div>
				<Suspense fallback={<Spinner />}>
					<AddtoCart product={product} success={success} />
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
