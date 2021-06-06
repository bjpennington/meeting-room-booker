import defaultImage from './default_room.png';

function MeetingRoom({ room }) {

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
      <p>{spotsAvailable(room.spots)}</p>
      <img
        alt={room.name ? `${room.name} meeting room` : 'generic meeting room'}
        src={room.thumbnail ? room.thumbnail : defaultImage }
      />
    </>
  )
};

export default MeetingRoom;