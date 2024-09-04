import React from "react";
import PropTypes from "prop-types";
import { FaDog, FaWifi} from "react-icons/fa";
import { MdOutlineFreeBreakfast} from "react-icons/md";
import { LuParkingCircle} from "react-icons/lu";

/**
 * display the facilities available for a venue
 */

const Meta = ({object}) => {
    if (!object || object.keys(object).length === 0) {
        return null;
    }

    const { wifi, parking, pets, breakfast} = object;
    const hasAmenities = wifi || parking || pets || breakfast;

    return (
        <div className="flex-col items-end">
            {hasAmenities && <h3 className="mb-3 text-start">Amenities</h3>}
            <ul className="flex justify-center gap-3 items-center">
                {wifi ? (
                    <li>
                        <span className="flex flex-col justify-center items-center">
                            <FaWifi size={25} /> Wifi
                        </span>
                    </li>
                ) : null}
                {parking ? (
                    <li>
                        <span className="flex flex-col justify-center items-center">
                            <LuParkingCircle size={25} /> Parking
                        </span>
                    </li>
                ) : null}
                {pets ? (
                    <li>
                        <span className="flex flex-col justify-center items-center">
                            {" "}
                            <FaDog size={25} /> Pets
                        </span>
                    </li>
                ) :null}
                {breakfast ? (
                    <li>
                        <span className="flex flex-col justify-center items-center">
                            {" "}
                            <MdOutlineFreeBreakfast size={25} /> Breakfast
                        </span>
                    </li>
                ) : null}
            </ul>
        </div>
    );
};

Meta.propTypes = {
    object: PropTypes.object.isRequired,
};

export default Meta;