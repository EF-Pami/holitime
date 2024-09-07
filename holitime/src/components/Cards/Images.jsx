import React, { useState} from "react";
import PropTypes from "prop-types";

/**
 * displays a carousel for venue images if available
 */

const ImageCarousel = ({ images, imageStyle}) => {
    const [current, setCurrent] = useState(0);
    const length = images.length;

    const nextSlide = () => {
        setCurrent(current === length - 1? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length -1: current -1);
    };

    const placeholderImage = {
        url: "https://media.istockphoto.com/id/1324356458/vector/picture-icon-photo-frame-symbol-landscape-sign-photograph-gallery-logo-web-interface-and.jpg?s=612x612&w=0&k=20&c=ZmXO4mSgNDPzDRX-F8OKCfmMqqHpqMV6jiNi00Ye7rE=",
        alt: "placeholder image",
    };

    const imagesToDisplay = length > 0 ? images : [placeholderImage];

    const defaultImageStyle = {
        height: "220px",
        width: "360px",
        ...imageStyle,
    };

    return (
        <div className="relative mx-auto overflow-hidden">
            {imagesToDisplay.map((image, index) => (
                <div
                    key={index}
                    className={index === current ? "opacity-100" : "opacity-0"}
                    style={{ transition: "opacity 0.5s ease" }}
                >
                    {index === current && (
                        <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full object-cover bg-white"
                            style={defaultImageStyle}
                        />
                    )}
                </div>
            ))}
            {length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute rounded-50 top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 cursor-pointer bg-secondary text-background bg-opacity-60"
                    >
                        &#10095;
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute rounded-50 top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 cursor-pointer bg-secondary text-background bg-opacity-60"
                    >
                        &#10096;
                    </button>
                </>
            )}
        </div>
    );
};

ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired,
        })
    ).isRequired,
    imageStyle: PropTypes.object,
};

export default ImageCarousel;