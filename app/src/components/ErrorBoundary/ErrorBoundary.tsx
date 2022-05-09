import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Alert, AlertTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import css from './ErrorBoundary.module.scss';

interface IProps {
  children: ReactNode;
}

interface IState {
  error: boolean;
  errorText: string;
}

class ErrorBoundary extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { error: false, errorText: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { errorText: error.message };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error: true,
      errorText: error.message,
    });
  }

  removeErrorState = () => {
    this.setState({ error: false, errorText: '' });
  };

  render() {
    if (this.state.error) {
      return (
        <Alert
          severity="error"
          variant="filled"
          action={
            <IconButton
              size="small"
              color="inherit"
              aria-label="close"
              onClick={this.removeErrorState}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          <AlertTitle>Something went wrong!</AlertTitle>
          {this.state.errorText}
          <Link to="/" className={css.home_link} onClick={this.removeErrorState}>
            Back home
          </Link>
        </Alert>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
