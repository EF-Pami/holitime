import React, { useState, useEffect} from "react";

/**
 * displays a button that allows a user to scroll back to the top of the page
 */

const ScrollToTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 350) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth"});
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        showButton && (
            <button
                onClick={scrollToTop}
                className="fixed inset-0 top-3/4 left-3/4 m-auto w-12 h-12 flex text-2xl items-center justify-center rounded-full bg-secondary text-background bg-opacity-80 hover:bg-primary hover:text-secondary transition-all duration-300 ease-in-out z-50 border border-primary"
            >
                ↑
            </button>
        )
    );
};

export default ScrollToTopButton;