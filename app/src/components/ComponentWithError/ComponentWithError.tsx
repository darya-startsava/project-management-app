import React, { useEffect } from 'react';

const ComponentWithError = () => {
  useEffect(() => {
    throw new Error('Error in component');
  });

  return <div>With Error Component</div>;
};

export default ComponentWithError;
