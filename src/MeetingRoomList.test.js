import { render } from '@testing-library/react';
import MeetingRoomList from './MeetingRoomList';

const sampleRooms = [
  {
    name: "Mears Park",
    spots: 8,
    thumbnail: null
  },
  {
    name: "Rice Park",
    spots: 0,
    thumbnail: null
  }
];

test('it displays a list of rooms', () => {
  const { getByText } = render(<MeetingRoomList rooms={sampleRooms} />);
  expect(getByText(sampleRooms[0].name)).toBeInTheDocument();
  expect(getByText(sampleRooms[1].name)).toBeInTheDocument();
  expect(getByText(`${sampleRooms[0].spots} spots remaining`)).toBeInTheDocument();
  expect(getByText('No spots remaining')).toBeInTheDocument();
});

test('it handles an empty list', () => {
  const { getByText } = render(<MeetingRoomList rooms={[]} />);
  expect(getByText('No rooms available. Please try again later.')).toBeInTheDocument();
});