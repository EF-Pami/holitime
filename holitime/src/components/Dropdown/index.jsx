import React, { useState, useRef, useEffect} from "react";
import { FaRegEdit } from "react-icons/fa";
import PropTypes from "prop-types";


const DropdownMenu = ({ onActivate, listItems}) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return (
        <div ref={ref} style={{position: "relative"}}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Dropdown menu button"
                className="hover:text-primary"
            >
                <FaRegEdit size={18} className="pt-1" />
            </button>
            {isOpen && (
                <ul
                    style={{
                        position: "absolute",
                        zIndex: 1,
                        listStyle: "none",
                        borderRadius: 5,
                        top: 24,
                        right: -15,
                        minWidth: 120,
                    }}
                >
                    {listItems.map((item, index) =>(
                        <li
                            key={index}
                            className="p-3 mb-2 text-center btn text-sm hover:underline hover:cursor-pointer"
                            onClick={() => {
                                onActivate(item.value);
                                setIsOpen(false);
                            }}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

DropdownMenu.propTypes = {
    onActivate: PropTypes.func.isRequired,
    listItems: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired,
        })
    ).isRequired,
};

export default DropdownMenu;