import React from "react";
import PropTypes from "prop-types";

/**
 * displays owners informations
 */

const OwnerInfo = ({owner}) => {
    return (
        <div>
            <h3>Venue Owner:</h3>
            <a
                href={`/profile/${owner.name}`}
                className="flex flex-wrap items-center gap-3 p-2 rounded-25  hover:shadow-xl hover:shadow-primary transition-all duration-300 ease-in-out"
            >
                <div>
                    <img
                        className="h-16 w-16 rounded-full object-cover"
                        src={owner.avatar.url}
                        alt="Profile avatar"
                    />
                </div>
                <ul>
                    <li className="font-bold">{owner.name}</li>
                    <li>{owner.email}</li>
                </ul>
            </a>
        </div>
    );
};

OwnerInfo.propTypes = {
    owner: PropTypes.object.isRequired,
};

export default OwnerInfo;