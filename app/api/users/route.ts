import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

// 虽然此处并不需要 request，但是如果不写 req 参数, 该接口数据会被缓存。。
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
	const uses = await prisma.user.findMany({ orderBy: { name: 'asc' } })
	return NextResponse.json(uses)
}
