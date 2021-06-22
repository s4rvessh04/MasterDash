import React from 'react';

function Button({ className, content, url }) {
  return (
    <>
      <a className={className} href={url}>
        {content}
      </a>
    </>
  );
}

export default Button;
