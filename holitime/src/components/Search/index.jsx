import React, { useEffect, useRef, useState} from "react";
import { IoClose, IoSearchSharp } from "react-icons/io5";
import { RxHamburgerMenu} from "react-icons/rx";
import useFetch from "../../Api/FetchHook";
import { searchUrl } from "../../Api/constants/url";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Rating from "../Cards/Rating";

/**
 * displays the search bar components enablling user to search for a venue
 */

const SearchBar = ({ onContinentSelect}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showResults, setShowResults] = useState(false);
    const { data, loading, error, performFetch} = useFetch(
        `${searchUrl}${searchQuery}`
    );
    const [isExpanded, setIsExpanded]= useState(false);
    const navigate = useNavigate();
    const searchBarRef = useRef(null);
    const [headingText, setHeadingText] = useState("Enjoy your trip");

    useEffect(() => {
        const handleClickOutside =(event) => {
            if (
                searchBarRef.current &&
                !searchBarRef.current.contains(event.target)
            ) {
                setIsExpanded(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const updateHeadingText = () => {
            if (window.innerWidth <= 412) {
                setHeadingText("Have a nice trip");
            }
        };

        updateHeadingText();

        window.addEventListener("resize", updateHeadingText);

        return () => {
            window.removeEventListener("resize", updateHeadingText);
        };
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();
        if (!searchQuery.trim()) return;
        performFetch();
        setSearchQuery("");
        setShowResults(true);
    };

    const handleSearchResultClick = (id) => {
        navigate(`/booking/${id}`);
        setIsExpanded(false);
        setShowResults(false);
    };

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleContinentSelect = (continent) => {
        onContinentSelect(continent);
        setIsExpanded(false);
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="absolute top-[72px] w-full m-auto z-50">
            <div className="flex justify-center py-5">
                <div
                    id="search-bar"
                    className="bg-white gap-5 p-5 rounded-50 border-primary border-2 shadow-xl"
                    ref={searchBarRef}
                >
                    <div
                        className="flex justify-center items-center gap-9 hover:cursor-pointer"
                        onClick={toggleExpanded}
                    >
                        <IoSearchSharp size={30} />
                        <h2 id="SearchBarH2">{headingText}</h2>
                        <RxHamburgerMenu size={30} />
                    </div>
                    {isExpanded && (
                        <div className="w-full mt-3">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleInputChange}
                                    placeholder="Search"
                                    className="p-2 border rounded-50 w-full pr-10"
                                    aria-label="Search for Venues"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-black rounded-full p-2 hover:text-accent"
                                    aria-label="Search button"
                                >
                                    <IoSearchSharp size={18} />
                                </button>
                            </form>
                            <div className="max-w-[350px]">
                                {data && data.data.length === 0 && (
                                    <p className="text-center">Title not found</p>
                                )}
                                {loading && <p className="text-center">Loading...</p>}
                                {error && <p className="text-center">Error: {error}</p>}
                            </div>
                            {showResults && data && (
                                <div className="search-results">
                                    {data.data.map((result) => (
                                        <div
                                            key={result.id}
                                            onClick={() => handleSearchResultClick(result.id)}
                                        >
                                            <div className="flex gap-2 my-3 border border-accent items-center hover:bg-accentTwo hover:cursor-pointer transition-all duration-300 ease-in-out">
                                                <div className="">
                                                    {Array.isArray(result.media) &&
                                                    result.media.length > 0 ? (
                                                        <div>
                                                            <img
                                                                style={{
                                                                    width: "50px",
                                                                    height: "50px",
                                                                    objectFit: "cover",
                                                                }}
                                                                src={result.media[0].url}
                                                                alt={result.media[0].alternativeText || ""}
                                                            />
                                                        </div>
                                                    ) : result.media ? (
                                                        <div>
                                                            <img
                                                                className="w-auto h-20 m-2"
                                                                src={result.media.url}
                                                                alt={result.media.alternativeText || "Venue image"}
                                                            />
                                                        </div>
                                                    ) : null}
                                                    </div>
                                                    <div className="ml-3 w-full">
                                                        <h4 className="text-sm">
                                                            {result.name == ""
                                                                ? "Title"
                                                                : result.name.slice(0, 20)
                                                            }
                                                        </h4>
                                                        <div className="flex mr-3 items-center justify-between">
                                                            <div className="text-sm">
                                                                {result.description == ""
                                                                    ? "Description"
                                                                    : result.description.slice(0, 20)
                                                                }
                                                            </div>
                                                            {result.rating == 0? (
                                                                "No Rating"
                                                            ) : (
                                                                <Rating rating={result.rating} />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

SearchBar.propTypes = {
    onContinentSelect: PropTypes.func.isRequired,
};

export default SearchBar;