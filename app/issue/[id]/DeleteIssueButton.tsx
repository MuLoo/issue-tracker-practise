'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const DeleteIssueButton = ({ id }: { id: string }) => {
	const router = useRouter()
	const [showError, setShowError] = useState(false)

	const handleDelete = async () => {
		try {
			await axios.delete(`/api/issues/${id}`)
			router.push('/issue')
			router.refresh()
		} catch (error) {
			setShowError(true)
		}
	}
	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button color="red">Delete Issue</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Title>Are you sure?</AlertDialog.Title>
					<AlertDialog.Description>
						Are you sure you want to delete this issue? This cannot be undone.
					</AlertDialog.Description>
					<Flex gap="3" mt="4">
						<AlertDialog.Cancel>
							<Button color="gray" variant="soft">
								Cancel
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button color="red" onClick={handleDelete}>
								Delete
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>
			<AlertDialog.Root open={showError} onOpenChange={setShowError}>
				<AlertDialog.Content>
					<AlertDialog.Title>Failed to delete issue</AlertDialog.Title>
					<AlertDialog.Description>
						Something went wrong when deleting the issue. Please try again later.
					</AlertDialog.Description>
					<Flex gap="3" mt="4">
						<AlertDialog.Action>
							<Button color="gray" variant="soft" onClick={() => setShowError(false)}>
								OK
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	)
}

export default DeleteIssueButton
