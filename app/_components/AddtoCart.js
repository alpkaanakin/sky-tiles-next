import { auth } from "@/app/_lib/auth";
import LoginMessage from "./LoginMessage";
import PurchaseForm from "./PurchaseForm";

async function AddtoCart({ product, success }) {
	const session = await auth();

	return (
		<div className="grid border border-primary-800 min-h-[400px]">
			{session?.user ? (
				<PurchaseForm product={product} user={session.user} success={success} />
			) : (
				<LoginMessage />
			)}
		</div>
	);
}

export default AddtoCart;
