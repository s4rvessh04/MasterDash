import React from 'react';

import CovidCard from './CovidCard';
import WeatherCard from './WeatherCard';
import ServerStatsCard from './ServerStatsCard';
import NotificationCard from './NotificationCard';
import NewsPane from './NewsPane';

function Home() {
  return (
    <>
      <div className='lg:container xl:mx-body md:mx-0 xl:pt-0 lg:py-body xl:p-0 md:px-4 mx-2 py-3 xl:mt-body flex flex-1 flex-col xl:h-auto lg:h-screen overflow-y-auto'>
        <div className='xl:flex'>
          <div className='xl:mr-home_cards_gap'>
            <CovidCard />
            <WeatherCard />
            <ServerStatsCard />
            <NotificationCard />
          </div>
          <div>
            <NewsPane />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
