'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React from 'react'

const status: { label: string; value?: Status }[] = [
	{ label: 'All' },
	{ label: 'Open', value: 'OPEN' },
	{ label: 'Closed', value: 'CLOSED' },
	{ label: 'In Progress', value: 'IN_PROGRESS' }
]

const IssueStatusFilter = () => {
	const router = useRouter()
	const handleValueChange = (value: string) => {
		const query = value ? `?status=${value}` : ''
		router.push(`/issue/list${query}`)
	}
	return (
		<Select.Root onValueChange={handleValueChange}>
			<Select.Trigger placeholder="Filter by status"></Select.Trigger>
			<Select.Content>
				{status.map(item => (
					<Select.Item value={item.value || ''} key={item.label}>
						{item.label}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	)
}

export default IssueStatusFilter
