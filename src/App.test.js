import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  render(<App />);
  const title = screen.getByText('Rooms');
  expect(title).toBeInTheDocument();
});

test('renders intro text', () => {
  render (<App />);
  const introText = screen.getByText('The number of available slots are shown for each room. Click "book" to book a room immediately.');
  expect(introText).toBeInTheDocument();
})
