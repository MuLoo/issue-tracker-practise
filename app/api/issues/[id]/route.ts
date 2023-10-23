import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from '../../../validationSchema';
import { z } from "zod";
import prisma from "@/prisma/client";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (isNaN(Number(params.id))) return NextResponse.json({ error: 'not valid id'}, { status: 400 })
  const body = await req.json();
  const validation = issueSchema.safeParse(body);
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