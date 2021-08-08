import { React, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar({ isOpen, toggle }) {
  const [isLive, setisLive] = useState(null);
  const urlApi = '/';

  useEffect(() => {
    fetchServerStat();
  }, [urlApi]);

  async function fetchServerStat() {
    const response = await fetch(urlApi);
    setisLive(response.status <= 302 ? 'Online' : 'Offline');
  }

  return (
    <>
      <div className='lg:flex lg:bg-gray-100 xl:w-60 w-38 lg:h-screen h-14'>
        <div className='lg:sticky flex flex-col justify-items-center fixed top-0 w-full backdrop-filter backdrop-blur-md text-gray-700'>
          <div>
            <div className='xl:pl-8 p-4 flex justify-between'>
              <h4 className='text-base font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline'>
                Master Dash
              </h4>
              <div
                className={'m-auto ml-3 border text-xs rounded-full px-1 '.concat(
                  isLive === 'Online'
                    ? 'text-green-600 border-green-400'
                    : 'text-red-600 border-red-400'
                )}>
                {isLive}
              </div>
              <button
                onClick={toggle}
                className='lg:hidden rounded-lg focus:outline-none focus:shadow-outline'>
                <svg
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  className='w-6 h-6'>
                  <path
                    fill-rule='evenodd'
                    d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z'
                    clip-rule='evenodd'
                    className={isOpen ? 'hidden' : 'w-6 h-6'}></path>
                  <path
                    fill-rule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clip-rule='evenodd'
                    className={isOpen ? 'w-6 h-6' : 'hidden'}></path>
                </svg>
              </button>
            </div>
            <div
              className={isOpen ? 'flex flex-col px-4 pb-4 lg:pb-0' : 'hidden'}
              onClick={window.innerWidth < 768 ? toggle : !toggle}>
              <div className='lg:flex-col lg:overflow-y-auto flex-none'>
                <NavLink
                  className='block px-4 py-2 mt-2 mb-3 md:text-base text-sm font-semibold text-gray-900 rounded-xl hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:outline-none focus:shadow-outline transition duration-100 ease-in'
                  activeClassName='bg-gray-200'
                  to='/home'>
                  Home
                </NavLink>
                <NavLink
                  className='block px-4 py-2 mt-2 mb-3 md:text-base text-sm font-semibold text-gray-900 rounded-xl hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:outline-none focus:shadow-outline transition duration-100 ease-in'
                  activeClassName='bg-gray-200'
                  to='/github'>
                  Github
                </NavLink>
              </div>
            </div>
          </div>
          <div className='lg:flex hidden px-4 py-2 mt-2 mb-3 text-xs font-semibold text-center flex-col flex-1 justify-end text-gray-400'>
            <span>Last Synced:</span>
            <span>
              {new Date().toISOString().slice(0, 10) +
                ' ' +
                '@' +
                new Date().toTimeString().slice(0, 5)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
