// 单一职责原则：一个文件只做一件事
import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetail from './IssueDetail'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/authOptions'
import AssigneeSelect from '../_components/AssigneeSelect'
interface Props {
	params: {
		id: string
	}
}
// 拥有参数的 route，被视为dynamic routes
const IssueDetailPage = async ({ params: { id } }: Props) => {
	const sessions = await getServerSession(authOptions)
	if (isNaN(Number(id))) notFound()
	const issue = await prisma.issues.findUnique({
		where: {
			id: Number(id)
		}
	})
	if (!issue) notFound() // 这里不需要return，因为notFound会抛出异常

	return (
		// radix-ui 的 sm ，相当于 tailwindcss 的 md，这二者的 breakpoint 是不一致的
		<Grid columns={{ initial: '1', sm: '5' }} gap="5">
			<Box className="md:col-span-4">
				<IssueDetail {...issue} />
			</Box>
			{sessions && (
				<Flex gap="4" direction="column">
					<AssigneeSelect issue={issue} />
					<EditIssueButton id={id} />
					<DeleteIssueButton id={id} />
				</Flex>
			)}
		</Grid>
	)
}

export default IssueDetailPage
