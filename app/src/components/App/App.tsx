import React, { FC, useState } from 'react';

import { Button, CssBaseline } from '@mui/material';
import Main from '$components/Main';
import ErrorBoundary from '$components/ErrorBoundary';
import ComponentWithError from '$components/ComponentWithError';

import './App.scss';

const App: FC = () => {
  const [showError, setShowError] = useState<boolean>(false);
  const [showError2, setShowError2] = useState<boolean>(false);
  return (
    <React.Fragment>
      <CssBaseline />
      <div>Start task</div>

      <Button variant={'contained'} onClick={() => setShowError(true)}>
        Show component without error boundry
      </Button>
      <Button variant={'contained'} color={'secondary'} onClick={() => setShowError2(true)}>
        Show componetn with error boundry
      </Button>

      <Main>
        <>{showError ? <ComponentWithError showArror={true} /> : null}</>
        <>
          {showError2 ? (
            <ErrorBoundary>
              <ComponentWithError />
            </ErrorBoundary>
          ) : null}
        </>
        <span>Text</span>
      </Main>
    </React.Fragment>
  );
};

export default App;
