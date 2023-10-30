import prisma from '@/prisma/client'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import IssueFormSkeletion from '../../_components/IssueFormSkeletion'

interface Props {
	params: {
		id: string
	}
}
const IssueForm = dynamic(() => import('../../_components/IssueForm'), {
	ssr: false,
	loading: () => <IssueFormSkeletion />
})
const EditIssuePage = async ({ params: { id } }: Props) => {
	const issue = await prisma.issues.findUnique({
		where: {
			id: Number(id)
		}
	})
	if (!issue) return notFound()
	return <IssueForm issue={issue} />
}

export default EditIssuePage
