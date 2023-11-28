import { z } from 'zod'

export const issueSchema = z.object({
	title: z.string().min(1, 'Title is required').max(255, 'Must less than 255 characters'),
	description: z.string().min(1, 'Description is required')
})
