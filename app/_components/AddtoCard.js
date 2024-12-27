import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";
import PurchaseForm from "./PurchaseForm";

async function AddtoCard({ product }) {
	const session = await auth();

	return (
		<div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
			{session?.user ? (
				<PurchaseForm product={product} user={session.user} />
			) : (
				<LoginMessage />
			)}
		</div>
	);
}

export default AddtoCard;
