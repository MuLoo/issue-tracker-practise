import '@radix-ui/themes/styles.css'
import './theme-config.css'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './Navbar'
import { Container, Theme } from '@radix-ui/themes'
import SessionProvider from '@/app/auth/Provider'

const inter = Inter({
	subsets: ['latin'],
	// display: 'swap',
	variable: '--font-inter'
})

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.variable}>
				<SessionProvider>
					<Theme radius="large">
						<Navbar />
						<main className="p-5">
							<Container>{children}</Container>
						</main>
						{/* <ThemePanel /> */}
					</Theme>
				</SessionProvider>
			</body>
		</html>
	)
}
