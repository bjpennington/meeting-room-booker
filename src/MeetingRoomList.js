import MeetingRoom from './MeetingRoom'

function MeetingRoomList({ rooms }) {
  if(!rooms || rooms.length === 0) {
    return(<p>No rooms available. Please try again later.</p>)
  }
  return(
    rooms.map((room, i) => {
      return <MeetingRoom key={i} room={room} />
    })
  )
};

export default MeetingRoomList;