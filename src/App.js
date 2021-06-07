import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import MeetingRoomList from './MeetingRoomList';

const App = () => {
  const [rooms, setRooms] = useState([]);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    axios.get('https://wetransfer.github.io/rooms.json')
      .then(response => {
        const returnedRooms = response.data.rooms;
        if (isMounted) {
          setRooms(returnedRooms);
        }
      })
      .catch(error => {
        console.error(error);
        setLoadError(true);
      })
      return () => { isMounted = false };
  }, []);

  const loadErrorMessage = () => {
    return <p>Failed to load rooms. Please try again later.</p>
  }

  return (
    <>
      <h1 className="page_title">
        Rooms
      </h1>
      <p className="page_intro">
        The number of available slots are shown for each room. Click "book" to book a room immediately.
      </p>
      { loadError ? loadErrorMessage() : <MeetingRoomList rooms={rooms} /> }
    </>
  );
}

export default App;
