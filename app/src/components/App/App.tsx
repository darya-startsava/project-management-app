import React, { FC } from 'react';

import Header from '$components/Header';
import Main from '$components/Main';
import Footer from '$components/Footer';

import './App.scss';

const App: FC = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default App;
