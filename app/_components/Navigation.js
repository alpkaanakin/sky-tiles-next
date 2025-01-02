import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
	const session = await auth();
	console.log(session);
	return (
		<nav className="z-10 text-xl">
			<ul className="flex gap-16 items-center capitalize">
				<li>
					<Link
						href="/products"
						className="hover:text-accent-400 transition-colors"
					>
						Products
					</Link>
				</li>
				<li>
					<Link
						href="/about"
						className="hover:text-accent-400 transition-colors"
					>
						About
					</Link>
				</li>
				<li className="capitalize">
					{session ? (
						<Link
							href="/account/profile"
							className="hover:text-accent-400 transition-colors"
						>
							{session.user.name.toLowerCase()}
						</Link>
					) : (
						<Link
							href="/login"
							className="hover:text-accent-400 transition-colors"
						>
							login
						</Link>
					)}
				</li>

				<li>
					{session ? (
						<Link
							href="/account/cart"
							className="hover:text-accent-400 transition-colors"
						>
							cart
						</Link>
					) : (
						""
					)}
				</li>
			</ul>
		</nav>
	);
}
