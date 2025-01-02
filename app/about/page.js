import Image from "next/image";
import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";

export const revalidate = 86400;

export const metadata = {
	title: "About",
};

export default async function Page() {
	return (
		<div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
			<div className="col-span-3">
				<h1 className="text-4xl mb-10 text-indigo-400 font-medium">
					Welcome to Sky Tiles
				</h1>

				<div className="space-y-8">
					<p>
						Sky Tiles is a premier marble company renowned for its exquisite
						collection of natural and engineered stone, catering to both
						residential and commercial projects. With a commitment to
						unparalleled quality and craftsmanship.
					</p>
					<p>
						In addition to their top-tier materials, Sky Tiles offers tailored
						services such as custom cutting, polishing, and design consultations
						to meet unique project needs. Whether for kitchens, bathrooms,
						flooring, or decorative accents, the company’s team of experts helps
						clients bring their vision to life. With sustainable practices at
						the core of their operations,
					</p>
					<p>
						Sky Tiles balances luxury with environmental responsibility, making
						it a preferred choice for architects, designers, and homeowners
						worldwide.
					</p>
				</div>
			</div>

			<div className="col-span-2">
				<Image
					src={image1}
					alt="Family sitting around a fire pit in front of cabin"
					placeholder="blur"
					quality={80}
				/>
			</div>

			<div className="relative aspect-square col-span-2">
				<Image
					src="/about-2.jpg"
					fill
					className="object-cover"
					alt="Family that manages The Wild Oasis"
				/>
			</div>

			<div className="col-span-3">
				<h1 className="text-4xl mb-10 text-indigo-400 font-medium">
					Over 20 years experience
				</h1>

				<div className="space-y-8">
					<p>
						At Sky Tiles, we believe that every surface tells a story. From the
						soft glow of dawn across a kitchen backsplash to the warm evening
						light reflecting on a living room floor, our tiles capture life’s
						most luminous moments and bring them into your home. Established
						with a passion for merging art and everyday function, Sky Tiles
						offers a wide range of designs that celebrate both timeless styles
						and modern innovations.
					</p>
					<p>
						Guided by our commitment to quality and craftsmanship, each tile is
						created to inspire. Whether you’re drawn to subtle, earthy tones or
						bold, contemporary patterns, Sky Tiles aims to spark creativity at
						every turn.
					</p>

					<div>
						<a
							href="/products"
							className="inline-block mt-4 bg-indigo-200 px-8 py-5 text-primary-900 text-lg font-semibold hover:bg-accent-600 transition-all"
						>
							Explore our MArble Decorations
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
