import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '$store/store';
import { v4 as uuidv4 } from 'uuid';

import { MenuItem, MenuList } from '@mui/material';

import { ROUTERS_APP_AUTH, ROUTERS_APP_ANONYM } from '$settings/routing';
import { IWord } from '$types/common';

export interface INavigationLink extends IWord {
  path: string;
}

const Navigation: FC = () => {
  const { isEnglishLang, isAuthorizationUser } = useAppSelector((state) => state.app);
  const listLinks = isAuthorizationUser ? ROUTERS_APP_AUTH : ROUTERS_APP_ANONYM;

  return (
    <nav>
      <MenuList>
        {listLinks.map((navEl) => (
          <MenuItem key={uuidv4()} component="li" disableGutters={true}>
            <NavLink to={navEl.path}>{isEnglishLang ? navEl.en : navEl.ru}</NavLink>
          </MenuItem>
        ))}
      </MenuList>
    </nav>
  );
};

export default Navigation;
