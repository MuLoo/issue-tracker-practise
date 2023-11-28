import GoogleProvier from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { type SessionStrategy } from 'next-auth'
import prisma from '@/prisma/client'

const authOptions = {
	adapter: PrismaAdapter(prisma),
	// Configure one or more authentication providers
	providers: [
		GoogleProvier({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!
		})
		// ...add more providers here
	],
	session: {
		strategy: 'jwt' as SessionStrategy
	}
}
export default authOptions
