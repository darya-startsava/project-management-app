import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

// It very simple test for github actions. Later can be changed.

it('render App', async () => {
  render(<App />);

  const button = screen.getAllByRole('button');
  expect(button[0]).toBeInTheDocument();
});
