import React, { FC } from 'react';

import { Typography } from '@mui/material';
import Section from '$components/Section';

const Profile: FC = () => {
  return (
    <Section pageAllSpace={true}>
      <Typography variant="h1">Profile</Typography>
    </Section>
  );
};

export default Profile;
