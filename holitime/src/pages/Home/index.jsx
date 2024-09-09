import React, { useContext} from "react";
import Cards from "../../components/Cards";
import ThemeContext from "../../components/Theme";

/**
 * function displays the home component
 */

const Home = () => {
    const { theme} = useContext(ThemeContext);

    return (
        <div className={`${theme === "light" ? "bg-background text-secondary" : "bg-secondary text-white"}`}>
            <h1 className="text-xl text-center">Featured Venues</h1>
            <Cards/>
        </div>
    );
};

export default Home;