const BookButton = ({ bookable, bookRoom }) => {
  return(
    <button
      disabled={!bookable}
      onClick={bookRoom}
    >
      Book!
    </button>
  )
};

export default BookButton;