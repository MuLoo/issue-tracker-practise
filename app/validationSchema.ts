import { z } from 'zod'

export const issueSchema = z.object({
	title: z.string().min(1, 'Title is required').max(255, 'Must less than 255 characters'),
	description: z.string().min(1, 'Description is required').max(65535)
})
export const patchIssueSchema = z.object({
	title: z.string().min(1, 'Title is required').max(255, 'Must less than 255 characters').optional(),
	description: z.string().min(1, 'Description is required').max(65535, 'Must less than 65535 characters').optional(),
	assignedToUserId: z
		.string()
		.min(1, 'Assigned to is required')
		.max(255, 'Must less than 255 characters')
		.optional()
		.nullable()
})
