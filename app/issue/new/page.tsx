"use client"
import React, { useState } from 'react'
import { Button, TextArea, TextField, Callout, Text } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import delay from 'delay';

type IssueForm = z.infer<typeof createIssueSchema>; // 根据schema生成表单类型


const NewIssuePage = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError] = useState<string>();
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: IssueForm) => {
    try {
      setLoading(true)
      await axios.post('/api/issues', data)
      router.push('/issue')
    } catch (error: any) {
      console.log(error)
      setError(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='max-w-xl'>
      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root >
          <TextField.Input placeholder="Add issues ..." {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          control={control}
          name="description"
          render={({ field }) => <SimpleMDE spellCheck={false} placeholder='add description ...' {...field} />}
        />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={loading}>New Issue {loading && <Spinner />}</Button>
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