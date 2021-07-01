import React from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import * as hi from 'react-icons/hi';

function UserCard({ githubUserData, totalStars, totalForks }) {
  return (
    <>
      <div className='mb-2.5'>
        <div className='flex'>
          <img
            alt='Profile'
            src={githubUserData.avatar_url}
            className='h-5 w-5 rounded-full m-auto ml-0 mr-2.5'></img>
          <Link
            to={{ pathname: githubUserData.html_url }}
            target='_blank'
            className='flex'>
            <div
              data-testid='random'
              className='capitalize md:text-xl text-lg font-bold text-gray-900'
              style={{
                textShadow: '1px 1px 2px rgba(37, 99, 235, 0.25)',
              }}>
              {githubUserData.name}
            </div>
            <div className='m-auto ml-2.5'>
              <hi.HiExternalLink size={12} color={'#404040'} />
            </div>
          </Link>
        </div>
      </div>
      <div className='border border-border rounded-xl px-5 py-3 shadow-soft mb-body bg-white'>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
            <span className='text-xs font-bold text-gray-700 mb-1'>
              Followers
            </span>
            <span className='text-xs font-semibold text-gray-600'>
              <CountUp
                end={githubUserData.followers}
                duration={1.2}
                delay={0.04}
              />
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs font-bold text-gray-700 mb-1'>
              Following
            </span>
            <span className='text-xs font-semibold text-gray-600'>
              <CountUp
                end={githubUserData.following}
                duration={1.2}
                delay={0.04}
              />
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs font-bold text-gray-700 mb-1'>Repos</span>
            <span className='text-xs font-semibold text-gray-600'>
              <CountUp
                end={
                  githubUserData.public_repos +
                  githubUserData.total_private_repos
                }
                duration={1.2}
                delay={0.04}
              />
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs font-bold text-gray-700 mb-1'>Stars</span>
            <span className='text-xs font-semibold text-gray-600'>
              <CountUp end={totalStars} duration={1.2} delay={0.04} />
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs font-bold text-gray-700 mb-1'>Forks</span>
            <span className='text-xs font-semibold text-gray-600'>
              <CountUp end={totalForks} duration={1.2} delay={0.04} />
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs font-bold text-gray-700 mb-1'>Gists</span>
            <span className='text-xs font-semibold text-gray-600'>
              <CountUp
                end={githubUserData.public_gists + githubUserData.public_gists}
                duration={1.2}
                delay={0.04}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCard;
