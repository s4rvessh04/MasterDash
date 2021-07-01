import { React, useState, useEffect } from 'react';
import SmallCard from './SmallCard';

function CovidCard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch('/covid');
    const covidData = await response.json();
    setData(covidData[0]);
  }

  return (
    <>
      {data ? (
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
                  d='M11.4294 1.62231L14.5411 2.81731L13.9436 4.37315L13.1653 4.07398L12.5436 5.69481C13.1928 6.07981 13.7469 6.60648 14.1644 7.23315L15.7503 6.52731L15.4111 5.76565L16.9336 5.08815L18.2894 8.13315L16.7669 8.81065L16.4278 8.04981L14.8428 8.75565C14.9444 9.15315 14.9986 9.57065 14.9986 9.99981C14.9986 10.3381 14.9653 10.669 14.9011 10.989L16.5211 11.6106L16.8194 10.8331L18.3761 11.4306L17.1811 14.5423L15.6253 13.9448L15.9236 13.1673L14.3036 12.5448C13.9186 13.194 13.3919 13.7481 12.7653 14.1656L13.4711 15.7515L14.2328 15.4123L14.9103 16.9348L11.8653 18.2906L11.1878 16.7681L11.9486 16.429L11.2428 14.844C10.8453 14.9456 10.4278 14.9998 9.9986 14.9998C9.65943 14.9998 9.3286 14.9665 9.0086 14.9015L8.38693 16.5223L9.16526 16.8206L8.56776 18.3773L5.45609 17.1823L6.05359 15.6265L6.83026 15.9248L7.4536 14.3048C6.80443 13.9198 6.25026 13.3931 5.83193 12.7665L4.24609 13.4723L4.58526 14.234L3.06276 14.9115L1.70693 11.8665L3.22943 11.189L3.56776 11.9506L5.15359 11.244C5.05276 10.8465 4.99859 10.429 4.99859 9.99981C4.99859 9.66148 5.03193 9.33065 5.09609 9.01065L3.47526 8.38898L3.17776 9.16648L1.62109 8.56898L2.81609 5.45815L4.37193 6.05565L4.07276 6.83315L5.69359 7.45565C6.0786 6.80565 6.60526 6.25148 7.23193 5.83315L6.5261 4.24731L5.76443 4.58648L5.08693 3.06398L8.13193 1.70898L8.80943 3.23148L8.0486 3.57065L8.75443 5.15565C9.15193 5.05398 9.56943 4.99981 9.9986 4.99981C10.3369 4.99981 10.6678 5.03315 10.9878 5.09731L11.6086 3.47648L10.8319 3.17898L11.4294 1.62231ZM9.9986 6.66648C8.15693 6.66648 6.66526 8.15815 6.66526 9.99981C6.66526 11.8415 8.15693 13.3331 9.9986 13.3331C11.8403 13.3331 13.3319 11.8415 13.3319 9.99981C13.3319 8.15815 11.8403 6.66648 9.9986 6.66648ZM9.58193 10.7215C9.98026 10.9515 10.1169 11.4615 9.88693 11.8598C9.65693 12.2581 9.14693 12.3948 8.7486 12.1648C8.35026 11.9348 8.2136 11.4248 8.4436 11.0265C8.6736 10.6281 9.1836 10.4915 9.58193 10.7215ZM11.6653 9.16648C12.1253 9.16648 12.4986 9.53981 12.4986 9.99981C12.4986 10.4598 12.1253 10.8331 11.6653 10.8331C11.2053 10.8331 10.8319 10.4598 10.8319 9.99981C10.8319 9.53981 11.2053 9.16648 11.6653 9.16648ZM9.88693 8.13981C10.1169 8.53815 9.98026 9.04815 9.58193 9.27815C9.1836 9.50815 8.6736 9.37148 8.4436 8.97315C8.2136 8.57481 8.35026 8.06481 8.7486 7.83481C9.14693 7.60481 9.65693 7.74148 9.88693 8.13981Z'
                  fill='#EF4444'
                />
              </svg>
            ),
            name: 'COVID-Status',
            sub1: data.location.city,
            sub2: data.location.state,
          }}
          cardContent={
            <div className='flex justify-between'>
              {Object.keys(data.total).map(
                (key) =>
                  [
                    'confirmed',
                    'deceased',
                    'recovered',
                    'vaccinated1',
                  ].includes(key) && (
                    <div className='wrapper'>
                      <h5
                        className='text-xs font-bold text-gray-700 mb-0.5'
                        style={{ 'text-transform': 'capitalize' }}>
                        {key === 'vaccinated1' ? 'Vaccinated' : key}
                      </h5>
                      <div className='text-xxs font-semibold text-gray-500 mb-0.5'>
                        +
                        {data['delta7'][key] !== undefined
                          ? key === 'vaccinated1'
                            ? data.delta7.vaccinated1 + data.delta7.vaccinated2
                            : data['delta7'][key]
                          : 0}
                      </div>
                      <div className='text-xs font-semibold text-gray-600'>
                        {key === 'vaccinated1'
                          ? data.total.vaccinated1 + data.total.vaccinated2
                          : data['total'][key]}
                      </div>
                    </div>
                  )
              )}
            </div>
          }
        />
      ) : (
        <SmallCard
          cardDetails={{
            svg: <div class='animate-pulse w-3/5 h-6 bg-gray-200'></div>,
            name: '',
            sub1: '',
            sub2: '',
          }}
          cardContent={
            <div class='animate-pulse w-full h-full bg-gray-200 text-gray-200'></div>
          }
        />
      )}
    </>
  );
}

export default CovidCard;
