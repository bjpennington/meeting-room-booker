import './MeetingRoomList.css';
import MeetingRoom from './MeetingRoom';

function MeetingRoomList({ rooms }) {
  const renderMeetingRooms = () => {
    if(!rooms || rooms.length === 0) {
      return(<p>No rooms available. Please try again later.</p>);
    }
    return(
      rooms.map((room, i) => {
        return <MeetingRoom key={i} room={room} />
      })
    );
  }

  return (
    <ul className="room_list">
      {renderMeetingRooms()}
    </ul>
  );
};

export default MeetingRoomList;