'use client'
import { Skeleton } from '@/app/components'
import type { Issues } from '@prisma/client'
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const AssigneeSelect = ({ issue }: { issue: Issues }) => {
	const { data: users, error, isLoading } = useUsers()

	if (error) return null

	if (isLoading) return <Skeleton />

	const handleValueChange = async (value: string) => {
		try {
			await axios.patch(`/api/issues/${issue.id}`, {
				assignedToUserId: value
			})
			toast.success('Issue assigned')
		} catch (error) {
			toast.error('Failed to assign issue')
		}
	}
	return (
		<>
			<Select.Root defaultValue={issue.assignedToUserId || ''} onValueChange={handleValueChange}>
				<Select.Trigger placeholder="Assign..."></Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Suggestions</Select.Label>
						<Select.Item value="">Unassigned</Select.Item>
						{users?.map(user => (
							<Select.Item value={user.id} key={user.id}>
								{user.name}
							</Select.Item>
						))}
					</Select.Group>
				</Select.Content>
			</Select.Root>
			<Toaster />
		</>
	)
}

// 当这个实现的逻辑比较多，但是有没有其他地方复用，可以放在本 moudle 下
const useUsers = () =>
	useQuery<User[]>({
		queryKey: ['users'],
		queryFn: () => axios.get<User[]>('/api/users').then(res => res.data),
		staleTime: 1000 * 60 * 10,
		retry: 3
	})

export default AssigneeSelect
