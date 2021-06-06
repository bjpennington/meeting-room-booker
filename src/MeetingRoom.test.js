import { render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import MeetingRoom from './MeetingRoom';
import logoThumbnail from '../public/logo512.png';

const sampleRoom = {
  name: "Mears Park",
  spots: 8,
  thumbnail: logoThumbnail
};

const badDataRoom = {
  name: null,
  spots: null,
  thumbnail: null
};

const server = setupServer(
  rest.get('https://wetransfer.github.io/bookRoom.json', (req, res, ctx) => {
    return res(ctx.json({success: true}))
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('it displays a room name and number of spots', () => {
  const { getByText } = render(<MeetingRoom room={sampleRoom} />);
  expect(getByText(sampleRoom.name)).toBeInTheDocument();
  expect(getByText(`${sampleRoom.spots} spots remaining`)).toBeInTheDocument();
});

test('it displays a thumbnail image', () => {
  const { getByAltText, getByRole } = render(<MeetingRoom room={sampleRoom} />);
  expect(getByAltText('Mears Park meeting room')).toBeInTheDocument();
  const thumbnail = getByRole('img');
  expect(thumbnail).toHaveAttribute('src', logoThumbnail);
});

test('it handles missing data for a room', () => {
  const { getByText } = render(<MeetingRoom room={badDataRoom} />);
  expect(getByText('Name Missing')).toBeInTheDocument();
  expect(getByText('No spots remaining')).toBeInTheDocument();
});

test('it displays default image if no thumbnail included', () => {
  const { getByAltText, getByRole } = render(<MeetingRoom room={badDataRoom} />);
  expect(getByAltText('generic meeting room')).toBeInTheDocument();
  const thumbnail = getByRole('img');
  expect(thumbnail).toHaveAttribute('src', 'default_room.png');
});

test('book button is present', () => {
  const { getByRole } = render(<MeetingRoom room={sampleRoom} />);
  expect(getByRole('button', { name: 'Book!' })).toBeInTheDocument();
});

test('clicking book button books room and updates available slots', async() => {
  const { getByRole, getByText } = render(<MeetingRoom room={sampleRoom} />);
  userEvent.click(getByRole('button', { name: 'Book!' }));
  await waitFor(() => expect(getByText('Successfully booked')).toBeInTheDocument());
  expect(getByText('7 spots remaining')).toBeInTheDocument();
});

test('unsuccessful booking presents alert', async() => {
  // suppress expected error to avoid confusing test output
  console.error = jest.fn();
  server.use(
    rest.get('https://wetransfer.github.io/bookRoom.json', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  );
  const { getByRole, getByText } = render(<MeetingRoom room={sampleRoom} />);
  userEvent.click(getByRole('button', { name: 'Book!' }));
  await waitFor(() => expect(getByText('Error: failed to book')).toBeInTheDocument());
  expect(getByText(`${sampleRoom.spots} spots remaining`)).toBeInTheDocument();
  expect(console.error).toHaveBeenCalled();
});