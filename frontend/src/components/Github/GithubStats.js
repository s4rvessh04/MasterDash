import { React, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import * as hi from 'react-icons/hi';
import * as go from 'react-icons/go';
import * as ri from 'react-icons/ri';

function GitHubStats() {
  const [githubRepositories, setGithubRepositories] = useState([]);
  const [githubUserData, setGithubUserData] = useState('');
  const [repoData, setRepoData] = useState('');
  const [activeRepo, setActiveRepo] = useState('');
  const [repoType, setRepoType] = useState('Public');

  const repoUrl = 'github/user';
  const userUrl = 'github/repohouse';

  useEffect(() => {
    async function fetchUser() {
      fetch(repoUrl).then((response) => {
        response.json().then((data) => {
          setGithubUserData(data);
        });
      });
    }
    fetchUser();
  }, [repoUrl]);

  useEffect(() => {
    async function fetchRepos() {
      fetch(userUrl).then((response) =>
        response.json().then((data) => {
          setGithubRepositories(data);
          setActiveRepo(data[0]['name']);
          setRepoData(data[0]);
        })
      );
    }
    fetchRepos();
  }, [userUrl]);

  const handleClick_Repo = async (name) => {
    const response = await fetch(`github/repohouse/${name}`);
    const data = await response.json();
    setRepoData(data);
    setActiveRepo(name);
  };
  function cleanRepoData(field, value) {
    switch (field) {
      case 'created_at':
      case 'updated_at':
      case 'pushed_at':
        return value.slice(0, 10);
      case 'private':
        return value === false ? 'Public' : 'Private';
      case 'language':
        return value === null ? 'None' : value;
      default:
        return value;
    }
  }

  return (
    <>
      {githubRepositories && githubUserData && repoData ? (
        <div className='md:container md:mx-auto flex md:flex-1 flex-col lg:p-7 p-2'>
          <div className='lg:flex'>
            <div className='xl:w-github_partition1_width w-full xl:mr-github_cards_gap mr-8'>
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
                    <span className='text-xs font-bold text-gray-700 mb-1'>
                      Repos
                    </span>
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
                    <span className='text-xs font-bold text-gray-700 mb-1'>
                      Stars
                    </span>
                    <span className='text-xs font-semibold text-gray-600'>
                      <CountUp
                        end={githubUserData.total_stars} //FIX THIS
                        duration={1.2}
                        delay={0.04}
                      />
                    </span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-xs font-bold text-gray-700 mb-1'>
                      Forks
                    </span>
                    <span className='text-xs font-semibold text-gray-600'>
                      <CountUp
                        end={githubUserData.total_forks} //FIX THIS
                        duration={1.2}
                        delay={0.04}
                      />
                    </span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-xs font-bold text-gray-700 mb-1'>
                      Gists
                    </span>
                    <span className='text-xs font-semibold text-gray-600'>
                      <CountUp
                        end={
                          githubUserData.public_gists +
                          githubUserData.public_gists
                        }
                        duration={1.2}
                        delay={0.04}
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className='mb-2.5 flex'>
                <div className='m-auto ml-0 mr-2.5 md:w-auto md:h-auto h-4 w-4'>
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M2.5 3.125C2.5 2.2962 2.82924 1.50134 3.41529 0.915291C4.00134 0.32924 4.7962 0 5.625 0L16.5625 0C16.8111 0 17.0496 0.098772 17.2254 0.274587C17.4012 0.450403 17.5 0.68886 17.5 0.9375V16.5625C17.5 16.8111 17.4012 17.0496 17.2254 17.2254C17.0496 17.4012 16.8111 17.5 16.5625 17.5H13.4375C13.1889 17.5 12.9504 17.4012 12.7746 17.2254C12.5988 17.0496 12.5 16.8111 12.5 16.5625C12.5 16.3139 12.5988 16.0754 12.7746 15.8996C12.9504 15.7238 13.1889 15.625 13.4375 15.625H15.625V13.125H5.625C5.37885 13.125 5.1382 13.1977 4.93321 13.334C4.72822 13.4703 4.56802 13.664 4.4727 13.891C4.37739 14.1179 4.3512 14.3679 4.39741 14.6097C4.44363 14.8515 4.5602 15.0742 4.7325 15.25C4.90655 15.4277 5.00288 15.6673 5.0003 15.916C4.99772 16.1647 4.89645 16.4022 4.71875 16.5763C4.54106 16.7503 4.3015 16.8466 4.05278 16.8441C3.80406 16.8415 3.56655 16.7402 3.3925 16.5625C2.81964 15.9786 2.49912 15.193 2.5 14.375V3.125ZM15.625 1.875V11.25H5.625C5.18 11.25 4.7575 11.3425 4.375 11.51V3.125C4.375 2.79348 4.5067 2.47554 4.74112 2.24112C4.97554 2.0067 5.29348 1.875 5.625 1.875H15.625ZM6.25 15.3125V19.375C6.25 19.433 6.26616 19.4899 6.29667 19.5393C6.32718 19.5887 6.37084 19.6286 6.42275 19.6545C6.47466 19.6805 6.53277 19.6915 6.59057 19.6862C6.64837 19.681 6.70357 19.6598 6.75 19.625L8.5625 18.2663C8.61659 18.2257 8.68239 18.2038 8.75 18.2038C8.81762 18.2038 8.88341 18.2257 8.9375 18.2663L10.75 19.625C10.7964 19.6598 10.8516 19.681 10.9094 19.6862C10.9672 19.6915 11.0253 19.6805 11.0773 19.6545C11.1292 19.6286 11.1728 19.5887 11.2033 19.5393C11.2338 19.4899 11.25 19.433 11.25 19.375V15.3125C11.25 15.2296 11.2171 15.1501 11.1585 15.0915C11.0999 15.0329 11.0204 15 10.9375 15H6.5625C6.47962 15 6.40014 15.0329 6.34153 15.0915C6.28293 15.1501 6.25 15.2296 6.25 15.3125Z'
                      fill='#6B7280'
                    />
                  </svg>
                </div>
                <div className='capitalize md:text-xl text-lg font-bold text-gray-900'>
                  Repositories
                </div>
              </div>
              <div className='h-github_repository_card_height lg:mb-0 mb-body border border-border rounded-2xl p-2.5 shadow-soft bg-white'>
                <div className='h-10 rounded-full p-5px mb-2.5 grid grid-cols-2 gap-2.5 bg-gray-100 text-gray-700'>
                  <div
                    className={`flex cursor-pointer justify-center rounded-full text-xs font-semibold hover:border-4 hover:border-gray-200 transition-all ease-in-out duration-300 ${
                      repoType === 'Public'
                        ? 'bg-white border-none shadow-sm'
                        : ''
                    }`}
                    onClick={() => {
                      setRepoType('Public');
                    }}>
                    <span className='m-auto'>Public Repositories</span>
                  </div>
                  <div
                    className={`flex cursor-pointer justify-center rounded-full text-xs font-semibold hover:border-4 hover:border-gray-200 transition-all ease-in-out duration-300 ${
                      repoType === 'Private'
                        ? 'bg-white border-none shadow-sm'
                        : ''
                    }`}
                    onClick={() => {
                      setRepoType('Private');
                    }}>
                    <span className='m-auto'>Private Repositories</span>
                  </div>
                </div>
                <div className='overflow-y-scroll no-scrollbar h-88%'>
                  {Object.values(githubRepositories).map((data) => {
                    return (
                      <>
                        <div
                          className={
                            data.name === activeRepo
                              ? `text-xs font-bold text-blue-700 flex justify-between h-github_repo_subcard_height px-5 mb-2.5 rounded-xl bg-blue-50 border-2 border-blue-500 shadow-github_repo_active_inner_shadow transition-colors ease-in-out duration-150`
                              : `text-xs font-bold text-gray-700 flex justify-between h-github_repo_subcard_height px-5 mb-2.5 rounded-xl bg-gray-50 border-2 border-transparent hover:bg-gray-100 cursor-pointer`
                          }
                          onClick={() => handleClick_Repo(data.name)}>
                          <div className='flex my-auto'>{data.name}</div>
                          <div
                            className={
                              data.name === activeRepo
                                ? `flex my-auto text-blue-700`
                                : `flex my-auto text-gray-600`
                            }>
                            <div className='flex mr-5'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 15 15'
                                width='15'
                                height='15'
                                className='fill-current mr-5px'>
                                <path
                                  fill-rule='evenodd'
                                  d='M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z'></path>
                              </svg>
                              {data.forks_count}
                            </div>
                            <div className='flex mr-5'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 15 15'
                                width='15'
                                height='15'
                                className='fill-current mr-5px'>
                                <path
                                  fill-rule='evenodd'
                                  d='M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z'></path>
                              </svg>
                              {data.stargazers_count}
                            </div>
                            <hi.HiChevronRight size={12} className='my-auto' />
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className='wrapper xl:w-github_partition2_width w-auto'>
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
                  <h6 className='m-auto ml-0'>
                    Larger view for your repositories
                  </h6>
                </div>
              </div>
              <div className='border border-border md:px-30px md:py-5 p-3 md:h-github_view_pane_card_height h-github_view_pane_card_height_mobile md:rounded-20 rounded-2xl shadow-soft bg-white'>
                <div className='md:text-lg text-base mb-5 font-semibold text-gray-700 flex justify-between'>
                  <Link
                    to={{ pathname: repoData.url }}
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
                      onClick={() =>
                        navigator.clipboard.writeText(repoData.clone_url)
                      }
                      className='h-5 w-5 rounded-full flex bg-blue-50 border border-blue-500 text-blue-700 m-auto ml-0 cursor-pointer'>
                      <go.GoRepoClone
                        size={10}
                        className='m-auto fill-current'
                      />
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
                                  src={
                                    repoData['contributors'][key]['avatar_url']
                                  }
                                  className='h-30px w-30px rounded-full m-auto ml-0 mr-2.5'></img>
                                <div>
                                  <h6 className='mb-1'>
                                    {repoData['contributors'][key]['login']}
                                  </h6>
                                  <div className='flex font-semibold text-gray-600'>
                                    <ri.RiFireLine className='m-auto ml-0 mr-0.5 fill-current' />
                                    <span>
                                      {
                                        repoData['contributors'][key][
                                          'contributions'
                                        ]
                                      }
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <Link
                                to={{
                                  pathname:
                                    repoData['contributors'][key]['html_url'],
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
            </div>
          </div>
        </div>
      ) : (
        <svg
          className='container m-auto animate-spin h-8 w-8 text-black'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'>
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
        </svg>
      )}
    </>
  );
}

export default GitHubStats;
