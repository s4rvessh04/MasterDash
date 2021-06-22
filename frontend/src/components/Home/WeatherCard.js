import React, { useState, useEffect } from 'react';
import SmallCard from './SmallCard';

function WeatherCard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch('/weather');
    const weatherData = await response.json();
    setData(weatherData[0]);
  }

  return (
    <>
      {data && (
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
                  d='M12.085 2.50001L11.2516 5.00001L10.4183 2.50001C10.265 2.03918 10.5133 1.54251 10.9733 1.38918C11.4341 1.23501 11.9316 1.48418 12.085 1.94418C12.1475 2.13251 12.1433 2.32584 12.085 2.50001ZM16.555 5.04168L14.1975 6.22084L15.3766 3.86334C15.5941 3.42918 16.1216 3.25418 16.555 3.47001C16.9891 3.68751 17.1641 4.21501 16.9483 4.64918C16.8591 4.82584 16.72 4.95918 16.555 5.04168ZM17.9183 10L15.4183 9.16668L17.9183 8.33334C18.3791 8.17918 18.8758 8.42834 19.03 8.88918C19.1833 9.34918 18.9341 9.84584 18.4733 10C18.2858 10.0625 18.0925 10.0575 17.9183 10ZM7.12663 3.86334L8.30579 6.22084L5.94829 5.04168C5.51413 4.82418 5.33829 4.29668 5.55496 3.86334C5.77246 3.42918 6.30079 3.25418 6.73329 3.47001C6.91079 3.55918 7.04413 3.69834 7.12663 3.86334ZM14.815 10.285C14.9308 9.93168 15.0016 9.55918 15.0016 9.16668C15.0016 7.09918 13.3191 5.41668 11.2516 5.41668C10.135 5.41668 9.13746 5.91168 8.45413 6.69001L8.33496 6.66668C6.85496 6.66668 5.52746 7.31668 4.61079 8.34251C4.41079 8.27584 4.21746 8.27084 4.02996 8.33334C3.56913 8.48751 3.31996 8.98418 3.47329 9.44418C3.52079 9.58334 3.60496 9.69334 3.70413 9.78668C3.46829 10.3675 3.33496 11.0017 3.33496 11.6667L3.33663 11.7717C1.89913 12.1425 0.834961 13.4492 0.834961 15C0.834961 16.8383 2.33079 18.3333 4.16829 18.3333H13.335C15.6325 18.3333 17.5016 16.4642 17.5016 14.1667C17.5016 12.3925 16.3816 10.8842 14.815 10.285ZM11.2516 7.08334C12.4008 7.08334 13.335 8.01751 13.335 9.16668C13.335 9.47168 13.255 9.75501 13.1366 10.0158C12.8416 10.0333 12.5366 10.0775 12.205 10.1725C11.7708 9.04501 10.8683 8.16001 9.73246 7.75168C10.1125 7.34334 10.6508 7.08334 11.2516 7.08334ZM13.335 16.6667H4.16829C3.24829 16.6667 2.50163 15.9192 2.50163 15C2.50163 14.0808 3.24829 13.3333 4.09163 13.3283L5.27663 13.3417L5.06996 12.34C5.02413 12.1208 5.00163 11.8933 5.00163 11.6667C5.00163 9.82834 6.49746 8.33334 8.33496 8.33334L8.39246 8.32168C9.97913 8.36751 11.305 9.49334 11.5983 11.0467L11.63 11.2017C11.7325 11.565 12.0608 11.79 12.4183 11.795L12.6591 11.7758C12.9191 11.7008 13.1333 11.6667 13.335 11.6667C14.7133 11.6667 15.835 12.7883 15.835 14.1667C15.835 15.545 14.7133 16.6667 13.335 16.6667Z'
                  fill='#3B82F6'
                />
              </svg>
            ),
            name: 'Weather',
            sub1: data.location.city,
            sub2: data.location.country,
          }}
          cardContent={
            <div className='flex justify-between'>
              <div className='text-2xl font-bold text-gray-700 flex flex-col'>
                <span>
                  {data.today.tempMax}
                  <sup>°c</sup>
                </span>
                <span className='text-xs font-semibold text-gray-500 mb-0.5'>
                  {data.today.weatherType}
                </span>
              </div>
              <div className='text-xs font-bold text-gray-700'>
                <h5 className='mb-0.5'>Wind</h5>
                <div className='text-xs font-semibold text-gray-500 mb-0.5'>
                  <div className='font-bold'>
                    <span className='mr-5px text-gray-600'>
                      {data.today.wind.speed}
                    </span>
                    <span>{data.today.wind.gust}</span>
                  </div>
                  <span className='text-xxs font-normal'>
                    {data.today.wind.deg}
                  </span>
                </div>
              </div>
              <div className='text-xs font-bold text-gray-700'>
                <h5 className='mb-0.5'>Tommorow</h5>
                <div className='text-xs font-semibold text-gray-500 mb-0.5'>
                  <div className='font-bold'>
                    <span className='mr-5px text-gray-600'>
                      {data.tommorow.tempMax}
                    </span>
                    <span>{data.tommorow.tempMin}</span>
                  </div>
                  <span className='text-xxs font-normal'>
                    {data.tommorow.weatherType}
                  </span>
                </div>
              </div>
              <div className='text-xs font-bold text-gray-700 mb-0.5'>
                <h5 className='mb-0.5'>Next Day</h5>
                <div className='text-xs font-semibold text-gray-500 mb-0.5'>
                  <div className='font-bold '>
                    <span className='mr-5px text-gray-600'>
                      {data.nextDay.tempMax}
                    </span>
                    <span>{data.nextDay.tempMin}</span>
                  </div>
                  <span className='text-xxs font-normal'>
                    {data.nextDay.weatherType}
                  </span>
                </div>
              </div>
            </div>
          }
        />
      )}
    </>
  );
}

export default WeatherCard;
