import { useEffect } from "react";
import { venuesUrl } from "../../constants/url";
import useFetch from "../../FetchHook";

/**
 * function fetches data from the url
 */

const FetchVenues = () => {
    const { data, loading, error, performFetch} = useFetch (
        `${venuesUrl}?_owner=true&sort=created`
    );

    useEffect(() => {
        performFetch();
    }, [performFetch]);

    return { venues: data || [], loading, error};
};

export default FetchVenues;