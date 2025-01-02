import { auth } from "@/app/_lib/auth";
import LoginMessage from "./LoginMessage";
import PurchaseForm from "./PurchaseForm";

async function AddtoCart({ product, success }) {
	const session = await auth();
	console.log(session);

	return (
		<div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
			{session?.user ? (
				<PurchaseForm product={product} user={session.user} success={success} />
			) : (
				<LoginMessage />
			)}
		</div>
	);
}

export default AddtoCart;
