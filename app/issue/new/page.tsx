"use client"
import React, { useState } from 'react'
import { Button, TextArea, TextField, Callout } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { InfoCircledIcon } from '@radix-ui/react-icons';

interface IssuesProps {
  title: string;
  description: string;
}
const NewIssuePage = () => {
  const { register, handleSubmit, control } = useForm();
  const [error, setError] = useState<string>();
  const router = useRouter();
  return (
    <div className='max-w-xl'>
      <form className='space-y-4' onSubmit={handleSubmit(async (fileds) => {
        try {
          await axios.post('/api/issues', fileds)
          router.push('/issue')
        } catch (error) {
          console.log(error)
          setError(error?.message || 'Something went wrong');
        }
      })}>
        <TextField.Root >
          <TextField.Input placeholder="Add issues ..." {...register('title')} />
        </TextField.Root>
        <Controller
          control={control}
          name="description"
          render={({ field }) => <SimpleMDE spellCheck={false} placeholder='add description ...' {...field} />}
        />
        <Button>New Issue</Button>
      </form>
      {error &&
        <Callout.Root size="2" color='red' className='mt-5'>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            { error }
          </Callout.Text>
        </Callout.Root>
      }
      </div>
  )
}

export default NewIssuePage