import NextAuth from 'next-auth'
import GoogleProvier from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { type SessionStrategy } from 'next-auth'

const prisma = new PrismaClient()

export const authOptions = {
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

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
