import React from 'react';
import { Link } from 'react-router-dom';
import * as hi from 'react-icons/hi';
import * as go from 'react-icons/go';
import * as ri from 'react-icons/ri';

function ViewPane({ repoData }) {
  function cleanRepoData(field, value) {
    switch (field) {
      case 'created_at':
      case 'updated_at':
      case 'pushed_at':
        return value.slice(0, 10);
      case 'private':
        return value === false ? 'False' : 'True';
      case 'language':
        return value === null ? 'None' : value;
      default:
        return value;
    }
  }
  return (
    <>
      <div className='mb-2.5'>
        <div className='flex'>
          <div className='m-auto ml-0 mr-2.5'>
            <hi.HiOutlineEye size={20} color={'#C084FC'} />
          </div>
          <div className='md:text-2xl text-xl font-normal text-gray-900'>
            View pane
          </div>
        </div>
      </div>
      <div>
        <div className='flex h-height_info_card_border mb-5 text-sm font-semibold text-gray-700'>
          <div className='w-5px bg-indigo-500 rounded-full mr-2.5'></div>
          <h6 className='m-auto ml-0'>Larger view for your repositories</h6>
        </div>
      </div>
      <div className='border border-border md:px-30px md:py-5 p-3 md:h-github_view_pane_card_height h-github_view_pane_card_height_mobile md:rounded-20 rounded-2xl shadow-soft bg-white'>
        <div className='md:text-lg text-base mb-5 font-semibold text-gray-700 flex justify-between'>
          <Link
            to={{ pathname: repoData.html_url }}
            target='_blank'
            className='flex'>
            <div className='my-auto'>{repoData.name}</div>
            <div className='m-auto ml-2.5'>
              <hi.HiExternalLink size={12} color={'#404040'} />
            </div>
          </Link>
          <div className='flex my-auto text-gray-600'>
            <div className='flex my-auto md:mr-30px mr-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                width='20'
                height='20'
                className='md:w-auto md:h-auto w-4 h-4 fill-current m-auto mr-5px'>
                <path
                  fill-rule='evenodd'
                  d='M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z'></path>
              </svg>
              <h5 className='font-semibold text-gray-500'>
                {repoData.forks_count}
              </h5>
            </div>
            <div className='flex md:mr-30px mr-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                width='20'
                height='20'
                className='md:w-auto md:h-auto w-4 h-4 fill-current m-auto mr-5px'>
                <path
                  fill-rule='evenodd'
                  d='M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z'></path>
              </svg>
              <h5 className='font-semibold text-gray-500'>
                {repoData.stargazers_count}
              </h5>
            </div>
            <div
              onClick={() => navigator.clipboard.writeText(repoData.clone_url)}
              className='h-5 w-5 rounded-full flex bg-blue-50 border border-blue-500 text-blue-700 m-auto ml-0 cursor-pointer'>
              <go.GoRepoClone size={10} className='m-auto fill-current' />
            </div>
          </div>
        </div>
        <div className='flex h-height_info_card_border mb-2.5 text-base font-semibold text-gray-700'>
          <div className='w-5px bg-violet-500 rounded-full mr-2.5'></div>
          <h6 className='m-auto ml-0'>Info</h6>
        </div>
        <div className='text-xs font-bold text-gray-700 md:h-github_info_card_height px-5 py-4 mb-5 rounded-xl bg-gray-50'>
          <div className='m-auto md:flex justify-between'>
            {Object.keys(repoData).map((key) =>
              [
                'created_at',
                'updated_at',
                'pushed_at',
                'size',
                'private',
                'language',
              ].includes(key) ? (
                <div className='flex md:flex-col md:justify-start justify-between md:mb-0 mb-2.5'>
                  <span className='capitalize text-xs font-bold text-gray-700 mb-1'>
                    {key}
                  </span>
                  <span className='text-xs font-semibold text-gray-600'>
                    {cleanRepoData(key, repoData[key])}
                  </span>
                </div>
              ) : (
                ''
              )
            )}
          </div>
        </div>
        <div className='flex h-height_info_card_border mb-2.5 text-base font-semibold text-gray-700'>
          <div className='w-5px bg-rose-500 rounded-full mr-2.5'></div>
          <h6 className='m-auto ml-0'>Contributors</h6>
        </div>
        <div className='overflow-y-scroll no-scrollbar md:h-3/5 h-44%'>
          {repoData.contributors[0] !== '' ? (
            Object.keys(repoData.contributors).map((key) => {
              return (
                <>
                  <div className='text-xs font-bold text-gray-700 md:h-github_info_card_height md:px-5 md:py-4 px-4 py-3 mb-2.5 rounded-xl bg-gray-50'>
                    <div className='flex justify-between'>
                      <div className='flex'>
                        <img
                          alt='Profile'
                          src={repoData['contributors'][key]['avatar_url']}
                          className='h-30px w-30px rounded-full m-auto ml-0 mr-2.5'></img>
                        <div>
                          <h6 className='mb-1'>
                            {repoData['contributors'][key]['login']}
                          </h6>
                          <div className='flex font-semibold text-gray-600'>
                            <ri.RiFireLine className='m-auto ml-0 mr-0.5 fill-current' />
                            <span>
                              {repoData['contributors'][key]['contributions']}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link
                        to={{
                          pathname: repoData['contributors'][key]['html_url'],
                        }}
                        target='_blank'
                        className='m-auto mr-0'>
                        <div className='flex m-auto mr-0 text-xs font-semibold text-blue-600'>
                          View Profile
                          <hi.HiExternalLink
                            size={12}
                            className='m-auto ml-2.5 fill-current'
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <div className='flex flex-col justify-center place-items-center h-full text-gray-400 font-semibold text-sm bg-gray-50 rounded-xl'>
              <hi.HiOutlineExclamationCircle className='h-10 w-10 mb-1.5' />
              <h6>No contributors found</h6>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewPane;
