import { Button } from '@radix-ui/themes'
import React from 'react'

const DeleteIssueButton = ({ id }: {id: string}) => {
  return (
    <Button color="red">Delete Issue</Button>
  )
}

export default DeleteIssueButton