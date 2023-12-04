'use client'
import React from 'react'
import { DoubleArrowLeftIcon, DoubleArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
	total: number
	pageSize: number
	current: number
}
const Pagination = ({ total, pageSize, current }: Props) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const pageCount = Math.ceil(total / pageSize)
	if (pageCount <= 1) return null
	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams)
		params.set('page', page.toString())
		router.push(`?${params.toString()}`)
	}
	return (
		<Flex gap="3" align="center">
			<Button color="gray" variant="soft" disabled={current === 1} onClick={() => handlePageChange(1)}>
				<DoubleArrowLeftIcon />
			</Button>
			<Button color="gray" variant="soft" disabled={current <= 1} onClick={() => handlePageChange(current - 1)}>
				<ChevronLeftIcon />
			</Button>
			<Text size="2">
				Page {current} of {pageCount}
			</Text>
			<Button color="gray" variant="soft" disabled={current >= pageCount} onClick={() => handlePageChange(current + 1)}>
				<ChevronRightIcon />
			</Button>
			<Button color="gray" variant="soft" disabled={current === pageCount} onClick={() => handlePageChange(pageCount)}>
				<DoubleArrowRightIcon />
			</Button>
		</Flex>
	)
}

export default Pagination
