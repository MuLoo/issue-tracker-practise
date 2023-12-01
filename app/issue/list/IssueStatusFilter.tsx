'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import React from 'react'

const status: { label: string; value?: Status }[] = [
	{ label: 'All' },
	{ label: 'Open', value: 'OPEN' },
	{ label: 'Closed', value: 'CLOSED' },
	{ label: 'In Progress', value: 'IN_PROGRESS' }
]

const IssueStatusFilter = () => {
	return (
		<Select.Root>
			<Select.Trigger placeholder="Issue Status"></Select.Trigger>
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
