import React, { useState } from 'react'
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import prisma from '@/prisma/client'

// 服务端组件，可以直接使用prisma
const IssuePage = async () => {
  const issues = await prisma.issues.findMany()
  return (
    <div>
      <Button>
        <Link href="/issue/new">Add Issues</Link>
      </Button>
      <Table.Root variant='surface' className='mt-5'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>CreatedAt</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                {issue.title}
                <div className='block md:hidden'>{issue.status}</div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.status}</Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default IssuePage