import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookButton from './BookButton';

const bookRoom = jest.fn(() => 'success');

test('it renders active button when room can be booked', () => {
  const { getByText, getByRole } = render(<BookButton bookable={true} />);
  expect(getByText('Book!')).toBeInTheDocument();
  const button = getByRole('button');
  expect(button).not.toHaveAttribute('disabled');
});

test('it renders disabled button when room cannot be booked', () => {
  const { getByText, getByRole } = render(<BookButton bookable={false} bookRoom={bookRoom} />);
  expect(getByText('Book!')).toBeInTheDocument();
  const button = getByRole('button');
  expect(button).toHaveAttribute('disabled');
});

test('it calls book room when clicked', () => {
  const { getByRole } = render(<BookButton bookable={true} bookRoom={bookRoom} />);
  userEvent.click(getByRole('button'));
  expect(bookRoom).toHaveBeenCalled();
});