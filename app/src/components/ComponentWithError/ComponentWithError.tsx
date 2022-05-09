import React, { FC, useEffect } from 'react';

interface IErrorProps {
  showArrow?: boolean;
}

const ComponentWithError: FC<IErrorProps> = ({ showArrow = false }) => {
  useEffect(() => {
    if (showArrow) {
      throw new Error('Error in component');
    }
    if (Math.random() > 0.5) {
      throw new Error('Error in component');
    }
  }, []);

  return <div>With Error Component</div>;
};

export default ComponentWithError;
