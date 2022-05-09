import React, { FC, useEffect } from 'react';

const ComponentWithError: FC = () => {
  useEffect(() => {
    throw new Error('Error in component');
  }, []);

  return <div>With Error Component</div>;
};

export default ComponentWithError;
