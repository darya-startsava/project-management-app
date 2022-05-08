import React, { FC } from 'react';

import { Container, ContainerProps } from '@mui/material';

import classNames from 'classnames';
import css from './Section.module.scss';

// Принимает пропсы для контейнера из material ui и прередает их в контейнер
interface ISectionProps extends ContainerProps {
  className?: string;
  pageAllSpace?: boolean;
}

const Section: FC<ISectionProps> = ({
  children,
  className,
  pageAllSpace = false,
  ...containerProps
}) => {
  const elClassName = classNames(className, {
    [css.page_all_space]: pageAllSpace,
  });

  return (
    <section className={elClassName}>
      <Container {...containerProps}>{children}</Container>
    </section>
  );
};

export default Section;
