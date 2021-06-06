import { render } from '@testing-library/react';
import App from './App';

test('it renders title', () => {
  const { getByText} = render(<App />);
  expect(getByText('Rooms')).toBeInTheDocument();
});

test('it renders intro text', () => {
  const { getByText } = render (<App />);
  const introText = 'The number of available slots are shown for each room. Click "book" to book a room immediately.';
  expect(getByText(introText)).toBeInTheDocument();
})
