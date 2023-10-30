import React from 'react'
import Link from '@/app/components/Link'
import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import IssueStatusBadge from '../../components/IssueStatusBadge'
import IssueAction from './IssueAction'
// 服务端组件，可以直接使用prisma
const IssuePage = async () => {
	const issues = await prisma.issues.findMany()
	return (
		<div>
			<IssueAction />
			<Table.Root variant="surface" className="mt-5">
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="hidden md:table-cell">CreatedAt</Table.ColumnHeaderCell>
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
							<Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	)
}

export const dynamic = 'force-dynamic' // 通过此设置不再 static rendering
// export const revalidate = 60 // 通过此设置revalidate时间，单位秒
export default IssuePage