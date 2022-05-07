import React, { FC } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import './App.scss';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import Authorization from '$components/Login/Authorization';
import Registration from '$components/Login/Registration';

const App: FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <div>Start task</div>
      <IconButton arial-label="login">
        <LoginIcon htmlColor="#000" />
      </IconButton>
      <Authorization />
    </React.Fragment>
  );
};

export default App;
