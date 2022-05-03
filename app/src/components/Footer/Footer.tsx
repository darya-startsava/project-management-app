import React, { FC } from 'react';
import css from './Footer.module.scss';

const Footer: FC = () => {
  return <footer className={`${css.footer} button`}>Start task</footer>;
};

export default Footer;
