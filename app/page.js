import Link from "next/link";
import Image from "next/image";
import bg from "@/public/bg.png";

export default function Page() {
	return (
		<main className="mt-36">
			<Image
				src={bg}
				fill
				placeholder="blur"
				quality={80}
				className="object-cover object-bottom"
				alt="Marble Samples"
			/>

			<div className="relative z-10 text-center">
				<h1 className="text-8xl text-primary-50 mb-20 tracking-tight font-normal">
					Welcome to Sky Tiles
				</h1>
				<Link
					href="/products"
					className="bg-indigo-800 px-8 py-6 text-primary-50 text-lg font-semibold hover:bg-indigo-600 transition-all"
				>
					Explore Rich Marble Collection
				</Link>
			</div>
		</main>
	);
}
