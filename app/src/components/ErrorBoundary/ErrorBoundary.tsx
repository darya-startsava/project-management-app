import React, { ReactNode } from 'react';

import { Alert, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
  children: ReactNode;
}

interface IState {
  error: boolean;
  errorText: string;
  showSnackBar: boolean;
}

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { error: false, errorText: '', showSnackBar: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error: true,
      errorText: error.message,
      showSnackBar: true,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <Snackbar
          open={this.state.showSnackBar}
          // autoHideDuration={10000}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          onClose={() => this.setState({ showSnackBar: false })}
          action={
            <IconButton
              size="small"
              aria-label="close"
              onClick={() => this.setState({ showSnackBar: false })}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          <Alert
            onClose={() => this.setState({ showSnackBar: false })}
            severity={'error'}
            variant="filled"
          >
            {this.state.errorText}
          </Alert>
        </Snackbar>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
