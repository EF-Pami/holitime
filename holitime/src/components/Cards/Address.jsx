import React from "react";
import PropTypes from "prop-types";
import { PiMapPin} from "react-icons/pi";

/**
 * provides address information for a venue
 */

const Address = ({ object}) => {
    if (!object) {
        return null;
    }

    const { address, city, country, continent}= object;

    return (
        <div className="flex-col gap-2 text-left max-w-80">
            <h3 className="flex gap-1 items-center">
                <PiMapPin size={20} /> Venue Location:
            </h3>
            <ul>
                <li>
                    <p className="text-ellipsis gap-1 overflow-hidden whitespace-nowrap max-w-96">
                        Street: {address ? address: "Not provided"}
                    </p>
                </li>
                <li>
                    <p className="text-ellipsis gap-1 overflow-hidden whitespace-nowrap max-w-96">
                        City: {city ? city : "Not provided"}
                    </p>
                </li>
                <li>
                    <p className="text-ellipsis gap-1 overflow-hidden whitespace-nowrap max-w-96">
                        Country: {country ? country : "Not provided"}
                    </p>
                </li>
                <li>
                    <p className="text-ellipsis gap-1 overflow-hidden whitespace-nowrap max-w-96">
                        Continent: {continent ? continent : "Not provided"}
                    </p>
                </li>
            </ul>
        </div>
    );
};

Address.propTypes = {
    object: PropTypes.object.isRequired,
};

export default Address;