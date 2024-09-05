import React from "react";
import PropTypes from "prop-types";

/**
 * renders the field for the description of the venue
 */

const Description = ({ description, isExpanded, toggleExpanded}) => {
    const longDescription = description.length > 100;
    const displayDescription = isExpanded
        ? description
        : `${description.substring(0, 60)}...`;
    
    return (
        <div className="max-h-full">
            <h3 className="w-full text-left">Description</h3>
            <p className="text-left break-words break-all z-30  border-background overflow-auto max-h-[280px]"
                style={{wordBreak: "break-word"}}
            >
                {longDescription ? displayDescription : description}
                {longDescription && (
                    <button
                        className="rounded-25 text-sm cursor-pointer hover:underline"
                        onClick={toggleExpanded}
                    >
                        {isExpanded ? "Read Less" : "Read More"}
                    </button>
                )}
            </p>
        </div>
    );

};

Description.propTypes = {
    description: PropTypes.string.isRequired,
    isExpanded: PropTypes.bool,
    toggleExpanded: PropTypes.func,
};

export default Description