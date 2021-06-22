import React from 'react';
import * as TypIcon from 'react-icons/ti';

function Icons({ name, type, text }) {
  switch (type) {
    case 'weather':
      const weathericon = React.createElement(TypIcon[name]);
      return (
        <div className='flex items-center xl:text-xs text-xxs font-semibold'>
          <div className='mr-0.5'>{weathericon}</div>
          <div>{text}</div>
        </div>
      );
    default:
      return;
  }
}

export default Icons;
