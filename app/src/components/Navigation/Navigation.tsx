import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '$store/store';

import { MenuItem, MenuList } from '@mui/material';

import { IWord } from '$types/common';
import css from './Navigation.module.scss';

export interface INavigationLink extends IWord {
  path: string;
}

interface INavigation {
  linksList: Array<INavigationLink>;
  clasName?: string;
}

const Navigation: FC<INavigation> = ({ clasName, linksList }: INavigation) => {
  const { isEnglishLang } = useAppSelector((state) => state.app);

  return (
    <nav className={clasName || ''}>
      <MenuList className={css.navigation__list}>
        {linksList.map((navEl) => (
          <MenuItem key={navEl.en} component="li" disableGutters={true}>
            <NavLink to={navEl.path}>{isEnglishLang ? navEl.en : navEl.ru}</NavLink>
          </MenuItem>
        ))}
      </MenuList>
    </nav>
  );
};

export default Navigation;
