import Pagination from '@/app/components/Pagination'
import prisma from '@/prisma/client'
import { Issues, Status } from '@prisma/client'
import { Flex } from '@radix-ui/themes'
import IssueAction from './IssueAction'
import IssuleStatusFilter from './IssueStatusFilter'
import IssueTable from '../_components/IssueTable'

export type SearchParamsProps = { status: Status; orderBy: keyof Issues; sort: 'asc' | 'desc'; page: string }

// 服务端组件，可以直接使用prisma
const IssuePage = async ({ searchParams }: { searchParams: SearchParamsProps }) => {
	const { status, orderBy = 'createdAt', sort = 'desc', page = 1 } = searchParams
	const validStatus = Object.values(Status)
	const orderByObj = clolumnNames.includes(orderBy) ? { [orderBy]: sort } : undefined
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
		<Flex gap="3" direction="column">
			<Flex justify="between">
				<IssuleStatusFilter />
				<IssueAction />
			</Flex>
			<IssueTable searchParams={searchParams} issues={issues} />
			<Pagination total={issuesCount} pageSize={pageSize} current={Number(page)} />
		</Flex>
	)
}

export const dynamic = 'force-dynamic' // 通过此设置不再 static rendering
// export const revalidate = 60 // 通过此设置revalidate时间，单位秒

export const columns: { label: string; value: keyof Issues; className?: string }[] = [
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

export const clolumnNames = columns.map(item => item.value)

export default IssuePage
