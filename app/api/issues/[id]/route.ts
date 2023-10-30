import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { issueSchema } from '../../../validationSchema'

/**
 * Updates an issue with the given ID.
 * @param req - The NextRequest object.
 * @param params - An object containing the ID of the issue to update.
 * @returns A NextResponse object containing the updated issue or an error message.
 */
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	if (isNaN(Number(params.id))) return NextResponse.json({ error: 'not valid id' }, { status: 400 })
	const body = await req.json()
	const validation = issueSchema.safeParse(body)
	if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 })
	const issue = await prisma.issues.findUnique({
		where: {
			id: Number(params.id)
		}
	})
	if (!issue) return NextResponse.json({ error: 'issue not exist' }, { status: 400 })
	const updatedIssue = await prisma.issues.update({
		where: {
			id: issue.id
		},
		data: {
			title: body.title,
			description: body.description
		}
	})
	return NextResponse.json(updatedIssue, { status: 200 })
}

/**
 * Deletes an issue with the given ID.
 * @param req - The Next.js request object.
 * @param params - An object containing the ID of the issue to delete.
 * @returns A JSON response indicating success or failure.
 */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	if (isNaN(Number(params.id))) return NextResponse.json({ error: 'not valid id' }, { status: 400 })
	const issue = await prisma.issues.findUnique({
		where: {
			id: Number(params.id)
		}
	})
	if (!issue) return NextResponse.json({ error: 'issue not exist' }, { status: 400 })
	await prisma.issues.delete({
		where: {
			id: issue.id
		}
	})
	return NextResponse.json({ message: 'ok' }, { status: 200 })
}
