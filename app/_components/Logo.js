import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
	return (
		<Link href="/" className="flex items-center gap-4 z-10">
			<Image
				src={logo}
				height="80"
				quality={100}
				width="80"
				alt="The Sky Tiles"
			/>
			<span className="text-xl font-semibold text-primary-100">
				The Sky Tiles
			</span>
		</Link>
	);
}

export default Logo;
