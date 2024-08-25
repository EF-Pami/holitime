import useFetch from "../../FetchHook";
import PropTypes from "prop-types";

const useDeleteFetch = () => {
    const { data, loading, error, performFetch} = useFetch("");

    const submitDelete = async (url, id) => {
        await performFetch({
            url: `${url}/${id}`,
            method: "DELETE",
        });
    };

    return { submitDelete, data, loading, error};
};

useDeleteFetch.propTypes = {
    url: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

export default useDeleteFetch;