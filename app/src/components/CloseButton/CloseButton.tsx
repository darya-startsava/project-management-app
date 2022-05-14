import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { TSimpleFunction } from '$types/common';

interface ICloseButtonProps {
  size?: 'small' | 'large' | 'medium';
  className?: string;
  closeCb: TSimpleFunction;
}
const CloseButton: FC<ICloseButtonProps> = ({ closeCb, size = 'small', className }) => {
  return (
    <IconButton size={size} aria-label="close" onClick={closeCb} className={className}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );
};

export default CloseButton;
