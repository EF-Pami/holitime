import { useCallback } from "react";
import useToken from "../../../hooks/useToken";
import { userUrl } from "../../constants/url";

/**
 * hooks for fetching user profile data
 */

const useProfile = (user) => {
    const { data, loading, error, performFetch} = useToken(`${userUrl}/${user}`);

    const updateUser = useCallback(
        (user) => {
            performFetch({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
        },
        [performFetch]
    );

    return { data, loading, error, updateUser};
};

export default useProfile;