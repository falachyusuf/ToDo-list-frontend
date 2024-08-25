'use client';

import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';

const HomePage = () => {
  type FormType = z.infer<typeof formSchema>;

  const formSchema = z.object({
    activity: z
      .string()
      .min(2, {
        message: 'Activity should be at least 2 characters long',
      })
      .max(50, {
        message: 'Activity should be at most 50 characters long',
      }),
    description: z.string(),
  });

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activity: '',
      description: '',
    },
  });

  function onSubmit(values: FormType) {
    console.log(values);
  }

  return (
    <div className='flex flex-col justify-center items-center border-red min-h-screen'>
      <div className='h-[200px] w-[500px] border-4 border-slate-700 rounded-lg py-1 px-2'>
        <p>testing</p>
      </div>
      <div className='w-full flex flex-col items-center mt-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-[500px] gap-2'>
            <FormField
              control={form.control}
              name='activity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity*</FormLabel>
                  <FormControl>
                    <Input placeholder='What would you do today mate?' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Tell yourself what you should do in more detail ...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-4' type='submit'>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default HomePage;
