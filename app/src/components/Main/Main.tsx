import React, { FC } from 'react';

import { IWrapEl } from '$types/common';
import css from './Main.module.scss';

const Main: FC<Pick<IWrapEl, 'children'>> = ({ children }) => {
  return <main className={css.main}>{children}</main>;
};

export default Main;
