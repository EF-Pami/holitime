import { useState, useCallback } from "react";
import Apikey from "../constants/ApiKey";


const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    

    const performFetch = useCallback(
        async (options = {}) => {
            setLoading(true);
            setError(null);
            setIsSuccess(false);
            const token = localStorage.getItem("accessToken");
            try {
                const headers = new Headers({
                    "Content-Type": "application/json",
                    ...options.headers,
                });

                if (token) {
                    headers.append("Authorization", `Bearer ${token}`);
                    headers.append("X-Noroff-API-key", Apikey);
                }

                

                const response = await fetch(url || options.url, {
                    ...options,
                    headers,
                });

                const json = await response.json();

                if (!response.ok) {
                    const errorMessage =
                      json.error && json.errors[0] && json.error[0].message? json.error[0].message : `HTTP error! status: ${response.status}`;
                    throw new Error(errorMessage);
                }

                setData(json);
                setIsSuccess(true);
            } catch (error) {
                setError(error.message);
                setIsSuccess(false);
            } finally {
                setLoading(false);
            }
        },
        [url, Apikey]
    );

    return { data, loading, error, performFetch, isSuccess};
};

export default useFetch;