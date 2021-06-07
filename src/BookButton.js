import './BookButton.css';

const BookButton = ({ bookable, bookRoom }) => {
  return(
    <button
      className="book_button"
      disabled={!bookable}
      onClick={bookRoom}
    >
      Book!
    </button>
  )
};

export default BookButton;