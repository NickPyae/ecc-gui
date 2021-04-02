import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Getting Started link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Getting Started/i);
  expect(linkElement).toBeInTheDocument();
});
