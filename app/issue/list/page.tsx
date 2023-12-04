import React from 'react'
import Link from '@/app/components/Link'
import prisma from '@/prisma/client'
import { Flex, Table } from '@radix-ui/themes'
import IssueStatusBadge from '../../components/IssueStatusBadge'
import IssueAction from './IssueAction'
import IssuleStatusFilter from './IssueStatusFilter'
import { Issues, Status } from '@prisma/client'
import NextLink from 'next/link'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import Pagination from '@/app/components/Pagination'
//
const columns: { label: string; value: keyof Issues; className?: string }[] = [
	{
		label: 'Issue',
		value: 'title',
		className: ''
	},
	{
		label: 'Status',
		value: 'status',
		className: 'hidden md:table-cell'
	},
	{
		label: 'CreatedAt',
		value: 'createdAt',
		className: 'hidden md:table-cell'
	}
]
// 服务端组件，可以直接使用prisma
const IssuePage = async ({
	searchParams
}: {
	searchParams: { status: Status; orderBy: keyof Issues; sort: 'asc' | 'desc'; page: string }
}) => {
	const { status, orderBy = 'createdAt', sort = 'desc', page = 1 } = searchParams
	const validStatus = Object.values(Status)
	const orderByObj = columns.map(item => item.value).includes(orderBy) ? { [orderBy]: sort } : undefined
	const pageSize = 10
	const where = { status: validStatus.includes(status) ? status : undefined }
	const issues = await prisma.issues.findMany({
		where,
		orderBy: orderByObj,
		skip: (Number(page) - 1) * pageSize,
		take: pageSize
	})
	const issuesCount = await prisma.issues.count({ where })
	return (
		<div>
			<Flex justify="between">
				<IssuleStatusFilter />
				<IssueAction />
			</Flex>
			<Table.Root variant="surface" className="mt-5">
				<Table.Header>
					<Table.Row>
						{columns.map(column => (
							<Table.ColumnHeaderCell className={column.className} key={column.value}>
								<NextLink
									href={{
										query: {
											...searchParams,
											orderBy: column.value,
											sort: searchParams.sort === 'asc' ? 'desc' : 'asc'
										}
									}}>
									{column.label}
								</NextLink>
								{orderBy === column.value &&
									(sort === 'desc' ? <ArrowDownIcon className="inline" /> : <ArrowUpIcon className="inline" />)}
							</Table.ColumnHeaderCell>
						))}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{issues.map(issue => (
						<Table.Row key={issue.id}>
							<Table.Cell>
								<Link href={`/issue/${issue.id}`} label={issue.title} />
								<div className="block md:hidden">{issue.status}</div>
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								<IssueStatusBadge status={issue.status} />
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">{issue.createdAt.toLocaleString()}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
			<Pagination total={issuesCount} pageSize={pageSize} current={Number(page)} />
		</div>
	)
}

export const dynamic = 'force-dynamic' // 通过此设置不再 static rendering
// export const revalidate = 60 // 通过此设置revalidate时间，单位秒
export default IssuePage
