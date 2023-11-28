/** @type {import('next').NextConfig} */
const nextConfig = {
	// 改写请求 headers
	// async headers() {
	// 	return [
	// 		{
	// 			source: '/:path*',
	// 			headers: [
	// 				{
	// 					key: 'referrer-policy',
	// 					value: 'no-referrer'
	// 				}
	// 			]
	// 		}
	// 	]
	// }
}

module.exports = nextConfig
