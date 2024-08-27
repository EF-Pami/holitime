import { useCallback, useState, useEffect } from "react";
import useFetch from "../FetchHook";

const useLogin = (url) => {
    const {data, loading, error, performFetch, isSuccess} = useFetch(url);
    const [loggedLn, setLoggedIn] = useState(false);

    const login = useCallback(
        (credentials) => {
            performFetch({
                method: "POST",
                headers: {
                    "Content-Types": "application/json",
                },
                body: JSON.stringify(credentials),
            });
        },
        [performFetch]
    );

    useEffect(() => {
        if (data && data.data.accessToken) {
            localStorage.setItem("accessToken", data.data.accessToken);
            localStorage.setItem("user", JSON.stringify(data.data));
            setLoggedIn(true);
        }
    }, [data]);

    return {loading, error, loggedLn, login, isSuccess};
};

export default useLogin;