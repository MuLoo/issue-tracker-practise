import { Pencil1Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const EditIssueButton = ({ id }: { id: string}) => {
  return (
    <Button>
      <Pencil1Icon />
      <Link href={`/issue/${id}/edit`}>Edit Issue</Link>
    </Button>
  )
}

export default EditIssueButton