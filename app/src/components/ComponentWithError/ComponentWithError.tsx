import React, { FC, useEffect } from 'react';

interface IErrorProps {
  showArror?: boolean;
}

const ComponentWithError: FC<IErrorProps> = ({ showArror = false }) => {
  useEffect(() => {
    if (showArror) {
      throw new Error('Error in component');
    }
    if (Math.random() > 0.5) {
      throw new Error('Error in component');
    }
  }, []);

  return <div>With Error Component</div>;
};

export default ComponentWithError;
