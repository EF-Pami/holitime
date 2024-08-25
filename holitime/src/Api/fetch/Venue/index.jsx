import { useEffect, useState } from "react";
import { venuesUrl } from "../../constants/url";

/**
 * function fetches venue data from the server
 */

const FetchVenue = (id) => {
    const [venue, setVenue] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(
                    venuesUrl + "/" + id + "?_owner=true&_bookings=true"
                );
                const data = await response.json();
                setVenue(data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };
        fetchData();
    }, [id]);
    return { venue, loading, error};
};

export default FetchVenue;