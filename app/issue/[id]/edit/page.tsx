import React from 'react'
import IssueForm from '../../_components/IssueForm'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}
const EditIssuePage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issues.findUnique({
    where: {
      id: Number(id)
    }
  })
  if (!issue) return notFound()
  return (
    <IssueForm issue={issue}  />
  )
}

export default EditIssuePage