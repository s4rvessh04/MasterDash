import React from 'react';
import * as hi from 'react-icons/hi';

function NewsPane() {
  return (
    <>
      <h1 className='text-2xl font-normal mb-2.5 text-gray-900 flex'>
        <hi.HiOutlineNewspaper
          size={20}
          className='m-auto mx-0 mr-2.5'
          stroke='#C084FC'
        />
        News
      </h1>
      <div className='flex h-height_info_card_border mb-5 text-sm font-semibold text-gray-700'>
        <div className='w-5px bg-indigo-500 rounded-full mr-2.5'></div>
        <h6 className='m-auto ml-0'>
          Last updated
          {new Date().toISOString().slice(0, 10) +
            ' ' +
            new Date().toTimeString().slice(0, 5)}
        </h6>
      </div>
      <div className='border border-border md:rounded-20 rounded-2xl h-home_news_pane_height shadow-soft w-home_partition2_width'></div>
    </>
  );
}

export default NewsPane;
