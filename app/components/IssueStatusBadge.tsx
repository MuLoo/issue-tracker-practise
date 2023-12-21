import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

// 使用prisma里定义的status类型，不必重复定义
interface Props {
	status: Status
}

const statusMap: Record<Status, { label: string; color: 'red' | 'violet' | 'green' }> = {
	OPEN: { label: 'Open', color: 'red' },
	IN_PROGRESS: { label: 'In Progress', color: 'violet' },
	CLOSED: { label: 'Closed', color: 'green' }
}

const IssueStatusBadge = ({ status }: Props) => {
	return <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
}

export default IssueStatusBadge
