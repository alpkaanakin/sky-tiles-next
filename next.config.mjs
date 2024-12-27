/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "corscsvwglmbbjwihpfn.supabase.co",
				port: "",
				pathname: "/storage/v1/object/public/item-images/**",
			},
		],
	},
	// output: "export",
};

export default nextConfig;
