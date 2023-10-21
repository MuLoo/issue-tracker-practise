"use client"
import React from 'react'
import { Button, TextArea, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from "axios";
import { useRouter } from 'next/navigation';

interface IssuesProps {
  title: string;
  description: string;
}
const NewIssuePage = () => {
  const { register, handleSubmit, control } = useForm();
  const router = useRouter();
  return (
    <form className='space-y-4 max-w-xl' onSubmit={handleSubmit(async (fileds) => {
      console.log(fileds)
      await axios.post('/api/issues', fileds)
      router.push('/issue')
    })}>
      <TextField.Root >
        <TextField.Input placeholder="Add issues ..." {...register('title')} />
      </TextField.Root>
      <Controller
        control={control}
        name="description"
        render={({ field }) => <SimpleMDE placeholder='add description ...' {...field} />}
      />
     
      <Button>New Issue</Button>
    </form>
  )
}

export default NewIssuePage