import { IssueStatusBadge } from '@/app/components'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import NextLink from 'next/link'
import React from 'react'
import { SearchParamsProps, columns } from '../list/page'
import { Issues } from '@prisma/client'

interface Props {
	searchParams: SearchParamsProps
	issues: Issues[]
}

const IssueTable = ({ searchParams, issues }: Props) => {
	const { orderBy = 'createdAt', sort = 'desc' } = searchParams

	return (
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
							<NextLink href={`/issue/${issue.id}`}>{issue.title}</NextLink>
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
	)
}

export default IssueTable
