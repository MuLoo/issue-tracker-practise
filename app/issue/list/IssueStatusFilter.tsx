'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const status: { label: string; value?: Status }[] = [
	{ label: 'All' },
	{ label: 'Open', value: 'OPEN' },
	{ label: 'Closed', value: 'CLOSED' },
	{ label: 'In Progress', value: 'IN_PROGRESS' }
]

const IssueStatusFilter = () => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const handleValueChange = (value: string) => {
		const params = new URLSearchParams()
		if (value) params.append('status', value)
		if (searchParams.get('orderBy')) params.append('orderBy', searchParams.get('orderBy')!)
		if (searchParams.get('sort')) params.append('sort', searchParams.get('sort')!)
		const query = params.size ? `?${params.toString()}` : ''
		router.push(`/issue/list${query}`)
	}
	return (
		<Select.Root onValueChange={handleValueChange} defaultValue={searchParams.get('status') || ''}>
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
