import React from 'react';
import { useState, useEffect } from 'react';
import * as hi from 'react-icons/hi';
import SmallCard from './SmallCard';

function ServerStatsCard() {
  const [isLiveProject, setisLiveProject] = useState('Offline');
  const urlApi = '/';

  useEffect(() => {
    fetchProjectServerStatus();
  }, [urlApi]);

  async function fetchProjectServerStatus() {
    const response = await fetch(urlApi);
    setisLiveProject(response.status <= 302 ? 'Online' : 'Offline');
  }

  const icon = (status) => {
    switch (status) {
      case 'Online':
        return <hi.HiStatusOnline className='m-auto text-gray-600 h-5 w-5' />;
      case 'Offline':
        return <hi.HiStatusOffline className='m-auto text-gray-600 h-5 w-5' />;
    }
  };

  return (
    <SmallCard
      cardDetails={{
        svg: (
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='m-auto mx-0 mr-5px'>
            <path
              d='M14.1667 13.3333H14.175M4.16667 9.99999H15.8333H4.16667ZM4.16667 9.99999C3.72464 9.99999 3.30072 9.8244 2.98816 9.51184C2.67559 9.19928 2.5 8.77536 2.5 8.33333V4.99999C2.5 4.55797 2.67559 4.13404 2.98816 3.82148C3.30072 3.50892 3.72464 3.33333 4.16667 3.33333H15.8333C16.2754 3.33333 16.6993 3.50892 17.0118 3.82148C17.3244 4.13404 17.5 4.55797 17.5 4.99999V8.33333C17.5 8.77536 17.3244 9.19928 17.0118 9.51184C16.6993 9.8244 16.2754 9.99999 15.8333 9.99999H4.16667ZM4.16667 9.99999C3.72464 9.99999 3.30072 10.1756 2.98816 10.4881C2.67559 10.8007 2.5 11.2246 2.5 11.6667V15C2.5 15.442 2.67559 15.8659 2.98816 16.1785C3.30072 16.4911 3.72464 16.6667 4.16667 16.6667H15.8333C16.2754 16.6667 16.6993 16.4911 17.0118 16.1785C17.3244 15.8659 17.5 15.442 17.5 15V11.6667C17.5 11.2246 17.3244 10.8007 17.0118 10.4881C16.6993 10.1756 16.2754 9.99999 15.8333 9.99999H4.16667ZM14.1667 6.66666H14.175H14.1667Z'
              stroke='#2DD4BF'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        ),
        name: 'Server Stats',
        sub1: 'N Down',
        sub2: 'All Up',
      }}
      cardContent={
        <div className='flex justify-between'>
          <div className='text-xs font-bold text-gray-700'>
            <h5 className='mb-5px flex'>
              Portfolio
              <hi.HiExternalLink
                size={10}
                color={'#404040'}
                className='m-auto ml-0.5'
              />
            </h5>
            <div className='text-xs font-semibold text-gray-500 mb-0.5 w-4/5'>
              {icon('Offline')}
            </div>
          </div>
          <div className='text-xs font-bold text-gray-700'>
            <h5 className='mb-5px flex'>
              Project
              <hi.HiExternalLink
                size={10}
                color={'#404040'}
                className='m-auto ml-0.5'
              />
            </h5>
            <div className='text-xs font-semibold text-gray-500 mb-0.5 w-4/5'>
              {icon(isLiveProject)}
            </div>
          </div>
          <div className='text-xs font-bold text-gray-700'>
            <h5 className='mb-5px flex'>
              Website 1
              <hi.HiExternalLink
                size={10}
                color={'#404040'}
                className='m-auto ml-0.5'
              />
            </h5>
            <div className='text-xs font-semibold text-gray-500 mb-0.5 w-4/5'>
              {icon('Offline')}
            </div>
          </div>
          <div className='text-xs font-bold text-gray-700'>
            <h5 className='mb-5px flex'>
              Website 2
              <hi.HiExternalLink
                size={10}
                color={'#404040'}
                className='m-auto ml-0.5'
              />
            </h5>
            <div className='text-xs font-semibold text-gray-500 mb-0.5 w-4/5'>
              {icon('Offline')}
            </div>
          </div>
        </div>
      }
    />
  );
}

export default ServerStatsCard;
