import { Box, Card, Flex } from '@radix-ui/themes'
import Skeleton from '@/app/components/Skeleton'

const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <Flex gap="3" my="3">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className='prose' mt="6">
        <Skeleton count={5}/>
      </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage