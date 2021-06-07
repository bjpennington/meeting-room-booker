import { useState } from 'react'
import swal from 'sweetalert';
import defaultImage from './default_room.png';
import './MeetingRoom.css';
import BookButton from './BookButton';
import axios from 'axios';

const MeetingRoom = ({ room }) => {
  const [spots, setSpots] = useState(room.spots);

  const bookRoom = () => {
    if(spots && spots > 0) {
      axios.get('https://wetransfer.github.io/bookRoom.json')
        .then(response => {
          if(response.data.success) {
            bookingSuccess();
          }
          else bookingFailure();
        })
        .catch(error => {
          console.error(error);
          bookingFailure();
        })
    }
  };

  const bookingSuccess = () => {
    swal({
      title: "Successfully booked",
      icon: "success"
    });
    setSpots(spots - 1);
  }

  const bookingFailure = () => {
    swal({
      title: "Error: failed to book",
      icon: "error"
    });
  }

  const spotsAvailable = (spots) => {
    if(spots && spots > 0) {
      return (`${spots} spots remaining`);
    }
    return 'No spots remaining';
  };

  return(
    <li className="room">
      <h2 className="room_name">
        {room.name ? room.name : 'Name Missing'}
      </h2>
      <div className="thumbnail_wrapper">
        <img
          alt={room.name ? `${room.name} meeting room` : 'generic meeting room'}
          src={room.thumbnail ? room.thumbnail : defaultImage }
        />
      </div>
      <p className="spots_detail">
        {spotsAvailable(spots)}
      </p>
      <BookButton
        bookable={spots && spots > 0}
        bookRoom={bookRoom}
      />
    </li>
  )
};

export default MeetingRoom;