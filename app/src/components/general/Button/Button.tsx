import React, { FC } from 'react';
import { IWrapEl } from '$types/common';

type TClickFC = (event: React.MouseEvent) => void;

interface IButton extends IWrapEl {
  onClick?: TClickFC;
  disabled?: boolean;
}

const Button: FC<IButton> = ({ onClick, children, className, disabled }: IButton) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
