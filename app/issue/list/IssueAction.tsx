import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssueAction = () => {
	return (
		<Button>
			<Link href="/issue/new">Add Issues</Link>
		</Button>
	)
}

export default IssueAction