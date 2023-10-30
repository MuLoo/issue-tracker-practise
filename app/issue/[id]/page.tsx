// 单一职责原则：一个文件只做一件事
import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetail from './IssueDetail'
interface Props {
  params: {
    id: string
  }
}
// 拥有参数的 route，被视为dynamic routes
const IssueDetailPage = async ({ params: { id } }: Props) => {
  if (isNaN(Number(id))) notFound();
  const issue = await  prisma.issues.findUnique({
    where: {
      id: Number(id)
    }
  })
  await delay(500)
  if (!issue) notFound(); // 这里不需要return，因为notFound会抛出异常

  return (
    <Grid columns={{ initial: '1', sm: '2'}} gap="5">
      <Box>
        <IssueDetail {...issue} />
      </Box>
      <Box>
        <EditIssueButton id={id} />
      </Box>
      </Grid>
  )
}

export default IssueDetailPage