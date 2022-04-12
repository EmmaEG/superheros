import React from 'react';

import "./loading.css";

const Loading = () => {
  return (
    <div className='d-flex justify-content-center'>
      <div className='spinner' role='status'>
        {/* <span className='visually-hidden'>Loading...</span> */}
      </div>
    </div>
  );
};

export default Loading;
