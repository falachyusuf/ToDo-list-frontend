import React from 'react';
import { Button } from './button';
import { Pencil, TrashIcon } from 'lucide-react';
import { Skeleton } from './skeleton';

type CardProps = {
  activity: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  onLoading: boolean;
  onUpdate: () => void;
  onDelete: () => void;
};

const Card: React.FC<CardProps> = ({ activity, description, dateStart, dateEnd, onLoading, onUpdate, onDelete }) => {
  return (
    <div className='w-full h-auto rounded-lg p-3 bg-white/30 backdrop-blur-md shadow-lg border border-black/10 hover:shadow-xl transition-shadow duration-300 ease-in-out flex justify-between items-center gap-4'>
      <div>
        {/* Activity */}
        <h3 className='font-medium text-sm text-black mb-1'>
          {onLoading ? <Skeleton className='h-4 w-[250px] mb-1' /> : activity}
        </h3>
        <p className='text-xs text-black/70 mb-2 text-justify'>
          {onLoading ? (
            <Skeleton className='h-4 w-[250px] mb-1' />
          ) : description.length > 100 ? (
            `${description.substring(0, 150)}...`
          ) : (
            description
          )}
        </p>
        <div className='text-xs text-black/60'>
          {onLoading ? (
            <Skeleton className='h-4 w-[250px] mb-1' />
          ) : dateStart && dateEnd ? (
            `${dateStart} - ${dateEnd}`
          ) : (
            'No Date Specified'
          )}
        </div>
      </div>
      <div className='flex gap-2'>
        {/* Buttons */}
        <Button
          className='border border-[#ffbb00] text-[#ffbb00] hover:bg-[#ffe399] hover:text-[#ff9b0b]'
          variant={'outline'}
          onClick={onUpdate}
        >
          <Pencil height={15} width={15} />
        </Button>
        <Button
          className='border border-rose-700 text-rose-700 hover:bg-rose-100 hover:text-rose-800'
          variant={'outline'}
          onClick={onDelete}
        >
          <TrashIcon height={15} width={15} />
        </Button>
      </div>
    </div>
  );
};

export default Card;
