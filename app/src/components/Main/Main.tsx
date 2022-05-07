import React, { FC } from 'react';

import { IWrapEl } from '$types/common';
import css from './Main.module.scss';

const Main: FC<IWrapEl> = ({ children, className }) => {
  return <main className={`${className || ''} ${css.main}`}>{children}</main>;
};

export default Main;
