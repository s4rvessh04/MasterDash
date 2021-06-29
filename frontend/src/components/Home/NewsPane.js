import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as hi from 'react-icons/hi';

function NewsPane() {
  const categories = ['technology', 'crypto', 'science', 'india', 'general'];
  const colors = ['red', 'green', 'yellow', 'indigo', 'blue', 'pink'];

  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState(categories[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(fetchData(activeTab));
  }, [activeTab]);

  async function fetchData(type) {
    setLoading(true);
    const response = await fetch(`/news/${type}`);
    const newsData = await response.json();
    setData(newsData);
    setLoading(false);
  }

  return (
    <>
      {
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
          <div className='border border-border md:rounded-20 rounded-2xl p-2.5 text-sm h-home_news_pane_height shadow-soft w-home_partition2_width overflow-y-scroll no-scrollbar'>
            <div className='sticky top-0'>
              <div className='h-10 rounded-full p-5px font-semibold grid grid-cols-5 gap-2.5 bg-gray-100 text-gray-700'>
                {Object.values(categories).map((item) => {
                  return (
                    <div
                      className={`rounded-full flex cursor-pointer justify-center hover:border-4 hover:border-gray-200 transition-all ease-in-out duration-300 ${
                        activeTab === item
                          ? 'bg-white border-none shadow-sm'
                          : ''
                      }`}
                      onClick={() => setActiveTab(item)}>
                      <span className='capitalize m-auto'>{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <h3 className='text-lg mt-5 mb-2.5 ml-5'>TOP STORIES</h3>
            {loading === false ? (
              Object.values(data).map((item) => {
                return (
                  <div className='px-5 flex justify-between mb-5 w-full'>
                    <div className='flex flex-1 min-w-0'>
                      <div
                        className={`bg-${
                          colors[Math.floor(Math.random() * colors.length)]
                        }-500 h-auto w-5px rounded-full`}></div>
                      <div className='px-2.5 py-5px h-auto'>
                        <h6 className='text-sm font-semibold'>{item.title}</h6>
                        <div className='flex mt-1'>
                          <h5 className='mr-2.5 text-xs font-semibold text-gray-600'>
                            {item.name}
                          </h5>
                          <span className='text-xs text-gray-500'>
                            {item.publishedAt}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link
                      to={{ pathname: item.url }}
                      target='_blank'
                      className='m-auto mr-0'>
                      <div className='flex w-max whitespace-nowrap m-auto mr-0 text-xs font-semibold text-blue-600'>
                        View full story
                        <hi.HiExternalLink
                          size={12}
                          className='m-auto ml-2.5 fill-current'
                        />
                      </div>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className='flex flex-col w-full text-center mt-5'>
                <svg
                  className='animate-spin h-8 w-8 m-auto'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'>
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='2'></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
                <h4 className='font-semibold text-gray-600 mt-2'>
                  Getting Data...
                </h4>
              </div>
            )}
          </div>
        </>
      }
    </>
  );
}

export default NewsPane;
