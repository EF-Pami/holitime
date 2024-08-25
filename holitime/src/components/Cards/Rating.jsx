import React from "react";
import PropTypes from "prop-types";
import { IoStar} from "react-icons/io5";

/**
 * display the rating of a venue
 */

const Rating = ({ rating}) => {
    return (
        <div className="flex item-center gap-2">
            {rating}
            <IoStar size={22} />
        </div>
    );
};

Rating.propTypes = {
    rating: PropTypes.number,
};

export default Rating;