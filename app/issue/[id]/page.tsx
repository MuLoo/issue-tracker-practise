import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkdown from 'react-markdown'
interface Props {
  params: {
    id: string
  }
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  if (isNaN(Number(id))) notFound();
  const issue = await  prisma.issues.findUnique({
    where: {
      id: Number(id)
    }
  })
  await delay(1000)
  if (!issue) notFound(); // 这里不需要return，因为notFound会抛出异常
  console.log(issue)
  const {
    title,
    description,
    status,
    createdAt,
    updatedAt
  } = issue;
  
  return (
    <div>
      <Heading>Issue Detail</Heading>
      <Flex gap="3" my="3">
        <IssueStatusBadge status={status} />
        <p>{createdAt.toDateString()}</p>
      </Flex>
      <Card className='prose' mt="6">
        <ReactMarkdown>{description}</ReactMarkdown>
        </Card>
    </div>
  )
}

export default IssueDetailPage