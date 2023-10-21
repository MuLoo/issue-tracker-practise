"use client"
import React from 'react'
import { Button, TextArea, TextField } from '@radix-ui/themes'

const NewIssuePage = () => {
  return (
    <div className='space-y-4 max-w-lg'>
      <TextField.Root >
        <TextField.Input placeholder="Add issues ..." />
      </TextField.Root>
      <TextArea placeholder='add description ...'/>
      <Button>New Issue</Button>
    </div>
  )
}

export default NewIssuePage