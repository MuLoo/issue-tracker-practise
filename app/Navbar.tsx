'use client'
import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import cls from 'classnames'
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'

const Navbar = () => {
	const pathname = usePathname()
	const { status, data: session } = useSession()
	const links = [
		{
			label: 'Dashboard',
			link: '/'
		},
		{
			label: 'Issues',
			link: '/issue/list'
		}
	]
	return (
		<nav className="border-b mb-5 px-5 h-14 py-3">
			<Container>
				<Flex justify="between">
					<Flex align="center" gap="3">
						<Link href="/">
							<AiFillBug />
						</Link>
						<ul className="flex space-x-6">
							{links.map(item => (
								<li key={item.link}>
									<Link
										href={item.link}
										className={cls('text-zinc-500 hover:text-zinc-800 transition-colors', {
											'text-blue-500': pathname === item.link
										})}>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</Flex>
					<Box>
						{status === 'authenticated' && (
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									<Avatar
										src={session?.user?.image ?? ''}
										fallback="?"
										size="2"
										radius="full"
										className="cursor-pointer"
									/>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="end">
									<DropdownMenu.Label>
										<Text size="2">{session?.user?.email}</Text>
									</DropdownMenu.Label>
									<DropdownMenu.Item>
										<Link href="/api/auth/signout">Sign Out</Link>
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						)}
						{status === 'unauthenticated' && <Link href="/api/auth/signin">Sign In</Link>}
					</Box>
				</Flex>
			</Container>
		</nav>
	)
}

export default Navbar
