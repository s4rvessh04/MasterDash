import { React, useState, useEffect } from 'react';
import ViewPane from './ViewPane';
import UserCard from './UserCard';
import RepositoriesCard from './RepositoriesCard';
import Loader from '../Loader';

function GitHubStats() {
  const [githubRepositories, setGithubRepositories] = useState([]);
  const [githubUserData, setGithubUserData] = useState('');
  const [repoData, setRepoData] = useState('');
  const [activeRepo, setActiveRepo] = useState('');

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

  let totalForks = 0;
  let totalStars = 0;

  Object.values(githubRepositories).map((data) => {
    totalForks += data.forks_count;
    totalStars += data.stargazers_count;
    return true;
  });

  return (
    <>
      {githubRepositories && githubUserData && repoData ? (
        <div className='md:container md:mx-auto flex md:flex-1 flex-col lg:p-7 p-2'>
          <div className='lg:flex'>
            <div className='xl:w-github_partition1_width w-full xl:mr-github_cards_gap mr-8'>
              <UserCard
                githubUserData={githubUserData}
                totalStars={totalStars}
                totalForks={totalForks}
              />
              <RepositoriesCard
                handleClick_Repo={handleClick_Repo}
                activeRepo={activeRepo}
                githubRepositories={githubRepositories}
              />
            </div>
            <div className='wrapper xl:w-github_partition2_width w-auto'>
              <ViewPane repoData={repoData} />
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col m-auto text-center'>
          <Loader />
        </div>
      )}
    </>
  );
}

export default GitHubStats;
