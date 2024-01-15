import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
// import { HotelType } from "../../../backend/src/shared/types";

const LatestDestinationCard = ({ hotel }) => {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center"
          alt={hotel.name}
        />
      </div>

      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
        <span className="text-white font-bold tracking-tight text-3xl">
          {hotel.name}
        </span>
      </div>
    </Link>
  );
};

LatestDestinationCard.propTypes = {
  hotel: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    // Add other properties from HotelType as needed
  }).isRequired,
};

export default LatestDestinationCard;
