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

type IssueForm = z.infer<typeof createIssueSchema>; // 根据schema生成表单类型


const NewIssuePage = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  console.log(errors)
  const [error, setError] = useState<string>();
  const router = useRouter();
  return (
    <div className='max-w-xl'>
      <form className='space-y-4' onSubmit={handleSubmit(async (fileds) => {
        try {
          await axios.post('/api/issues', fileds)
          router.push('/issue')
        } catch (error: any) {
          console.log(error)
          setError(error?.response?.data?.message || 'Something went wrong');
        }
      })}>
        <TextField.Root >
          <TextField.Input placeholder="Add issues ..." {...register('title')} />
        </TextField.Root>
        {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
        <Controller
          control={control}
          name="description"
          render={({ field }) => <SimpleMDE spellCheck={false} placeholder='add description ...' {...field} />}
        />
          {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
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