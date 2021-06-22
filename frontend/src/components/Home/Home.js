import React from 'react';

import CovidCard from './CovidCard';
import WeatherCard from './WeatherCard';
import ServerStatsCard from './ServerStatsCard';
import NotificationCard from './NotificationCard';
import NewsPane from './NewsPane';

function Home() {
  return (
    <>
      <div className='md:container mx-body mt-body flex flex-1 flex-col'>
        <div className='lg:flex'>
          <div className='mr-home_cards_gap'>
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
