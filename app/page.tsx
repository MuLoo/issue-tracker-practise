// import Pagination from './components/Pagination'

import { Box, Flex, Text } from '@radix-ui/themes'
import StatusCard from './components/StatusCard/index'

export default function Home() {
	// const string = searchParams.page || '1'
	return (
		<div className="text-center">
			<Text size="8">Issue Dashboard</Text>
			<Flex gap="3">
				<Box>
					<Text size="3" className="mb-2">
						状态卡片
					</Text>
					<StatusCard />
				</Box>
				<Box>
					<Text size="3" className="mb-2">
						徽章体系
					</Text>
				</Box>
				<Box>
					<Text size="3" className="mb-2">
						称号体系
					</Text>
				</Box>
			</Flex>

			{/* <Pagination total={100} pageSize={10} current={parseInt(string)} /> */}
		</div>
	)
}
