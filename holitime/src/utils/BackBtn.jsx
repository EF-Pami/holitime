import React, { useContext} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ThemeContext from "../components/Theme";

/**
 * displays a button that takes you back to the previous page.
 * @returns the button
 */

const BackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme} = useContext(ThemeContext);

    const landingPagePath = "/";

    if (location.pathname === landingPagePath) {
        return null;
    }

    return (
        <div className="flex justify-center">
            <button
                onClick={() => navigate(-1)}
                className={`py-2 px-4 rounded text-sm hover:text-primary ${theme === "light" ? "text-secondary" : "text-background"}`}
            >
                Go Back
            </button>
        </div>
    );
};

export default BackButton;