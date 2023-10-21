"use client"
import React from 'react'
import { Button } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
const Issue = () => {
  const router = useRouter()
  return (
    <div>
      <Button onClick={() => router.push('/issue/new')}>Issues</Button></div>
  )
}

export default Issue