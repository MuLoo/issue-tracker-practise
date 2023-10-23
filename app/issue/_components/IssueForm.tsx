"use client"

import { ErrorMessage, Spinner } from '@/app/components';
import { issueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issues } from '@prisma/client';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState, forwardRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
// import SimpleMDE from "react-simplemde-editor";
import { z } from 'zod';

type IssueFormData = z.infer<typeof issueSchema>; // 根据schema生成表单类型

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});



const IssueForm = ({ issue }: { issue?: Issues}) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  });
  const [error, setError] = useState<string>();
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
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
  })
  return (
    <div className='max-w-xl'>
      <form className='space-y-4' onSubmit={onSubmit}>
        <TextField.Root >
          <TextField.Input placeholder="Add issues ..." {...register('title')} defaultValue={issue?.title} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
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

export default IssueForm