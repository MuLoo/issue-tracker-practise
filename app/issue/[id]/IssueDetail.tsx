import { IssueStatusBadge } from '@/app/components'
import { Box, Card, Flex, Heading } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Issues } from '@prisma/client' // 从prisma里获取到类型

const IssueDetail = (props: Issues) => {
  const {
    status,
    createdAt,
    description
  } = props;
  return (
    <>
      <Heading>Issue Detail</Heading>
        <Flex gap="3" my="3">
          <IssueStatusBadge status={status} />
          <p>{createdAt.toDateString()}</p>
        </Flex>
        <Card className='prose' mt="6">
          <ReactMarkdown>{description}</ReactMarkdown>
          </Card>
    </>
  )
}

export default IssueDetail