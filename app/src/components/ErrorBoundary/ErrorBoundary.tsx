import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES_PATHS } from '$settings/routing';

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

  componentDidCatch(error: Error): void {
    this.setState({
      error: true,
      errorText: error.message,
    });
  }

  showErrorPage = () => {
    const errorText = this.state.errorText;
    this.setState({ error: false, errorText: '' });
    return <Navigate to={ROUTES_PATHS.error_page} replace state={{ errorText }} />;
  };

  render() {
    if (this.state.error) {
      return this.showErrorPage();
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
