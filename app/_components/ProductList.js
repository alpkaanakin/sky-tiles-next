import { getProducts } from "../_lib/data-service";
import ProductCard from "@/app/_components/ProductCard";

async function ProductList({ filter }) {
	const products = await getProducts();

	if (!products.length) return null;

	let displayedProducts;
	if (filter === "all") displayedProducts = products;
	if (filter === "violet")
		displayedProducts = products.filter((cabin) => cabin.maxCapacity <= 3);
	if (filter === "black")
		displayedProducts = products.filter(
			(cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
		);
	if (filter === "white")
		displayedProducts = products.filter((cabin) => cabin.maxCapacity >= 8);

	return (
		<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
			{displayedProducts.map((product) => (
				<ProductCard product={product} key={product.id} />
			))}
		</div>
	);
}

export default ProductList;
