import React, { useContext, useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../utils/logout";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import ThemeContext from "../../Theme";
import { FaHouseUser } from "react-icons/fa";

/**
 * displays the header for the site
 */

const Header = () => {
    const { theme, toggleTheme} = useContext(ThemeContext);
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            closeMenu();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-secondary fixed w-full z-[60]">
            <nav className="flex justify-between items-center m-auto p-5 max-w-[1440px]">
                <h1
                    onClick={() => navigate("/")}
                    className="text-white uppercase text-2xl hover:cursor-pointer hover:text-background transition-all duration-300 ease-in-out"
                >
                    HoliTime
                </h1>
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none flex"
                        aria-label="toggle menu"
                    >
                        {isMenuOpen? <FaTimes size={25} /> : <FaBars size={25} />}
                    </button>
                </div>
                <div className="hidden md:flex flex-wrap gap-3">
                    <button
                        type="button"
                        className={`toggle-switch ${theme}`}
                        onClick={toggleTheme}
                        aria-label="dark light toggle button"
                    >
                        <span className="icon">{theme === "light" ? "🌞" : "🌜"}</span>
                    </button>
                    <button
                        onClick={() => {
                            navigate("/");
                        }}
                        aria-label="home button"
                        className="btn"
                    >
                        <FaHouseUser />
                    </button>
                    {token && (
                        <button
                            onClick={() => {
                                navigate("/profile");
                            }}
                            aria-label="user profile button"
                            className="btn"
                        >
                            <FaUser />
                        </button>
                    )}
                    {!token && (
                        <button
                            onClick={() => {
                                navigate("/registration");
                            }}
                            aria-label="register button"
                            className="btn"
                        >
                            Register
                        </button>
                    )}
                    {token && (
                        <button
                            onClick={() => {
                                handleLogout();
                            }}
                            className="btn"
                        >
                            Log Out
                        </button>
                    )}
                    {!token && (
                        <button
                            onClick={() => {
                                navigate("/login");
                            }}
                            className="btn"
                        >
                            Login
                        </button>
                    )}
                </div>
            </nav>
            <div
                ref={menuRef}
                className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-secondary w-full`}
            >
                <div className={`flex justify-center gap-5 pb-6`}>
                    <button
                        type="button"
                        className={`toggle-switch ${theme}`}
                        onClick={() => {
                            toggleTheme();
                        }}
                        aria-label="dark light toggle button"
                    >
                        <span className="icon">{theme === "light" ? "🌞" : "🌜"}</span>
                    </button>
                    <button
                        onClick={() => {
                            navigate("/");
                        }}
                        aria-label="home button"
                        className="btn"
                    >
                        <FaHouseUser />
                    </button>
                    {token && (
                        <button
                            onClick={() => {
                                navigate("/profile");
                            }}
                            aria-label="user profile button"
                            className="btn"
                        >
                            <FaUser />
                        </button>
                    )}
                    {!token && (
                        <button 
                            onClick={() => {
                                navigate("/registration");
                            }}
                            aria-label="register button"
                            className="btn"
                        >
                            Register
                        </button>
                    )}
                    {token && (
                        <button
                            onClick={() => {
                                handleLogout();
                            }}
                            className="btn"
                        >
                            Log Out
                        </button>
                    )}
                    {!token && (
                        <button
                            onClick={() => {
                                navigate("/login");
                            }}
                            className="btn"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
            
        </header>
    );
};

export default Header;