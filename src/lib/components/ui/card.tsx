import React from 'react'

type CardProps = {
    activity: string,
    description: string,
    dateStart: string,
    dateEnd: string,
}


const Card: React.FC<CardProps> = ({ activity, description, dateStart, dateEnd}) => {
  return (
    <div className='w-full h-[100px] rounded-lg py-1 px-2 bg-white/30 backdrop-blur-md shadow-lg border border-black/10 hover:shadow-xl transition-shadow duration-300 ease-in-out'>
        {/* Activity */}
        <h3 className='font-medium text-sm text-black'>{activity}</h3>
        <p className='text-xs text-black/70 mb-1'>
          {description.length > 100 ? `${description.substring(0, 150)}...` : description}
        </p>
        <div className='text-xs text-black/60'>
          <p>Start: {dateStart}</p>
          <p>End: {dateEnd}</p>
        </div>
    </div>
  );
}

export default Card;
