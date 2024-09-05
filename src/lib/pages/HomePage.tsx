'use client';

import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import apiConnection from '../config/apiconnection';
import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { cn } from '../utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../components/ui/calendar';
import Card from '../components/ui/card';
import moment from 'moment';

const HomePage = () => {
  type FormType = z.infer<typeof formSchema>;

  const formSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: 'Activity should be at least 2 characters long',
      })
      .max(50, {
        message: 'Activity should be at most 50 characters long',
      }),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date(),
  });

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
    },
  });
  type ActivityData = {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  };

  const [data, setData] = useState<ActivityData[]>([
    {
      name: '',
      description: '',
      startDate: '',
      endDate: '',
    },
  ]);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(3);

  const onSubmit = async (values: FormType) => {
    const postObject = {
      ...values,
      startDate: moment(values.startDate).format('YYYY-MM-DD HH:mm:ss'),
      endDate: moment(values.endDate).format('YYYY-MM-DD HH:mm:ss'),
    }
    try {
      await apiConnection.post(`/`, postObject, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await apiConnection.get(`/?pageNumber=${page}&pageSize=${pageSize}`);
      setData(res.data.responseData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  const formatDate = (date: string) => {
    const formattedDate = moment(date).format('DD/MM/YYYY');
    return formattedDate;
  };

  return (
    <div className='min-h-screen flex gap-4 justify-center items-center'>
      <div className='h-[450px] w-[500px] border-2 border-slate-700 rounded-lg p-3.5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3'>
        {data?.map((activity, index) => {
          return (
            <Card
              activity={activity.name}
              description={activity.description}
              dateStart={formatDate(activity.startDate)}
              dateEnd={formatDate(activity.endDate)}
              key={index}
            />
          );
        })}
      </div>
      <div className='flex flex-col items-center mt-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-[500px] gap-2'>
            <FormField
              control={form.control}
              name='name'
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
            <div className=' flex justify-between mt-3 gap-2'>
              <FormField
                control={form.control}
                name='startDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col items-start w-[50%]'>
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start text-left font-normal rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border border-slate-500',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className='mr-2 h-4 w-4' />
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          disabled={(date) => date < new Date().setHours(0, 0, 0, 0)}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='endDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col items-start w-[50%]'>
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start text-left font-normal rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border border-slate-500',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className='mr-2 h-4 w-4' />
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          disabled={(date) => date < new Date().setHours(0, 0, 0, 0)}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className='mt-4' type='submit'>
              Add your activity
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default HomePage;
