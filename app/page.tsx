import Pagination from './components/Pagination'

export default function Home({ searchParams }: { searchParams: { page: string } }) {
	const string = searchParams.page || '1'
	return (
		<div>
			hello world
			<Pagination total={100} pageSize={10} current={parseInt(string)} />
		</div>
	)
}
