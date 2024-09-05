import { useEffect, useState } from "react";
import { baseUrl } from "../constants/url";

const useRegister = (method, url, body = null) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(baseUrl + url, {
                    method: method,
                    headers: {
                        "Content-Types": "application/json",
                    },
                    body: JSON.stringify(body),
                });
                const responseData = await response.json();
                setData(responseData);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchData();
    }, [method, url, body]);
    return {loading, error, data};
};

export default useRegister;