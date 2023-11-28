import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { issueSchema } from '../../validationSchema'
import authOptions from '../auth/authOptions'
import { getServerSession } from 'next-auth'

export async function POST(req: NextRequest) {
	const session = await getServerSession(authOptions)
	if (!session) return NextResponse.json({ error: 'not authenticated' }, { status: 401 })
	const body = await req.json()
	const validation = issueSchema.safeParse(body)
	if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 })
	const result = await prisma.issues.create({
		data: {
			title: body.title,
			description: body.description
		}
	})
	return NextResponse.json(result, { status: 200 })
}
