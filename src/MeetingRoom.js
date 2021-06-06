import { useState } from 'react'
import defaultImage from './default_room.png';
import BookButton from './BookButton';

const MeetingRoom = ({ room }) => {
  const [spots, setSpots] = useState(room.spots);

  const bookRoom = () => {
    if(spots && spots > 0) {
      setSpots(spots - 1);
    }
  };

  const spotsAvailable = (spots) => {
    if(spots && spots > 0) {
      return (`${spots} spots remaining`);
    }
    return 'No spots remaining';
  };

  return(
    <>
      <h2>
        {room.name ? room.name : 'Name Missing'}
      </h2>
      <img
        alt={room.name ? `${room.name} meeting room` : 'generic meeting room'}
        src={room.thumbnail ? room.thumbnail : defaultImage }
      />
      <p>{spotsAvailable(spots)}</p>
      <BookButton bookRoom={bookRoom} />
    </>
  )
};

export default MeetingRoom;