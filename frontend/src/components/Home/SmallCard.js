import React from 'react';

function SmallCard({ cardContent, cardDetails }) {
  return (
    <>
      <div className='flex items-baseline mb-2.5'>
        {cardDetails.svg}
        <h5 className='text-xl font-bold text-gray-900 mr-2.5'>
          {cardDetails.name}
        </h5>
        <div className='text-xs font-semibold text-gray-500'>
          {cardDetails.sub1}
          <span className='text-xxs ml-5px'>{cardDetails.sub2}</span>
        </div>
      </div>
      <div className='px-5 py-3.5 mb-30px border border-border h-20 w-home_partition1_width rounded-xl bg-white shadow-soft'>
        {cardContent}
      </div>
    </>
  );
}

export default SmallCard;
