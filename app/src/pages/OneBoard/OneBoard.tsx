import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Typography } from '@mui/material';
import Section from '$components/Section';

import css from './OneBoard.module.scss';

const OneBoard: FC = () => {
  const params = useParams();
  return (
    <Section className={css.one_board} pageAllSpace={true}>
      <Typography variant="h1">Board page {params.id}</Typography>
    </Section>
  );
};

export default OneBoard;
