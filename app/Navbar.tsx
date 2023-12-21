'use client'
import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import cls from 'classnames'
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import Skeleton from './components/Skeleton'
const Navbar = () => {
	const pathname = usePathname()
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
										className={cls('nav-link', {
											'!text-blue-500': pathname === item.link
										})}>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</Flex>
					<AvatarDropdown />
				</Flex>
			</Container>
		</nav>
	)
}

const AvatarDropdown = () => {
	const { status, data: session } = useSession()
	if (status === 'loading') return <Skeleton width="3rem" />
	if (status === 'unauthenticated') return <Link href="/api/auth/signin">Sign In</Link>

	return (
		<Box>
			{status === 'authenticated' && (
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar
							alt="avatar"
							src={session?.user?.image ?? 'https://pic.yupoo.com/leisurenana/1b521ee8/e5a68c46.jpg'}
							fallback="U"
							size="2"
							radius="full"
							className="cursor-pointer"
							referrerPolicy="no-referrer"
						/>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						<DropdownMenu.Label>
							<Text size="2">{session?.user?.email}</Text>
						</DropdownMenu.Label>
						<DropdownMenu.Item>
							<Link className="nav-link" href="/api/auth/signout">
								Sign Out
							</Link>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			)}
		</Box>
	)
}

export default Navbar
