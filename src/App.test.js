import { render, waitFor } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from './App';

const sampleRooms = {
  rooms: [{
    name: "Mears Park",
    spots: 8,
    thumbnail: null
  },
  {
    name: "Rice Park",
    spots: 0,
    thumbnail: null
  }]
};

const server = setupServer(
  rest.get('https://wetransfer.github.io/rooms.json', (req, res, ctx) => {
    return res(ctx.json(sampleRooms))
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('it renders title', () => {
  const { getByText} = render(<App />);
  expect(getByText('Rooms')).toBeInTheDocument();
});

test('it renders intro text', () => {
  const { getByText } = render (<App />);
  const introText = 'The number of available slots are shown for each room. Click "book" to book a room immediately.';
  expect(getByText(introText)).toBeInTheDocument();
});

test('it requests meeting rooms', async() => {
  const { getByText, queryByText } = render(<App />);
  expect(getByText('No rooms available. Please try again later.')).toBeInTheDocument();
  expect(queryByText(sampleRooms.rooms[0].name)).not.toBeInTheDocument();
  await waitFor(() => { expect(getByText(sampleRooms.rooms[0].name)).toBeInTheDocument() });
  expect(queryByText('No rooms available. Please try again later.')).not.toBeInTheDocument();
});


test('handlers server error', async () => {
  // suppress expected error to avoid confusing test output
  console.error = jest.fn();
  server.use(
    rest.get('https://wetransfer.github.io/rooms.json', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  );
  const { getByText, queryByText } = render(<App />);
  expect(getByText('No rooms available. Please try again later.')).toBeInTheDocument();
  expect(queryByText('Failed to load rooms. Please try again later.')).not.toBeInTheDocument();

  await waitFor(() => { expect(getByText('Failed to load rooms. Please try again later.')).toBeInTheDocument() });
  expect(queryByText('No rooms available. Please try again later.')).not.toBeInTheDocument();
  expect(console.error).toHaveBeenCalled();
});
