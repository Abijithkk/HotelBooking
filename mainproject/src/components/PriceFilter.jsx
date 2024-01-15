// Import PropTypes if not already imported
import PropTypes from 'prop-types';

const PriceFilter = ({ selectedPrice, onChange }) => {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2"> Max Price</h4>
      <select
        className="p-2 border rounded-md w-full"
        value={selectedPrice}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value="">Select Max Price</option>
        {[50, 100, 200, 300, 500].map((price) => (
          <option key={price} value={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
};

// PropTypes for prop validation
PriceFilter.propTypes = {
  selectedPrice: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default PriceFilter;
