import React, { useState, useEffect } from "react";
import { PiAt, PiImage, PiTextAUnderline, PiTag, PiCurrencyEur, PiUsers, PiStar, PiMapPin } from "react-icons/pi";
import useFetch from "../../../Api/FetchHook";
import { createVenueUrl } from "../../../Api/constants/url";
import Modal from "../../Modal";
import PropTypes from "prop-types";



const CreateVenue = ({ venue, isEdit, onClose }) => {
    const placeHolderMedia =
        "https://media.istockphoto.com/id/1324356458/vector/picture-icon-photo-frame-symbol-landscape-sign-photograph-gallery-logo-web-interface-and.jpg?s=612x612&w=0&k=20&c=ZmXO4mSgNDPzDRX-F8OKCfmMqqHpqMV6jiNi00Ye7rE=";
    const { performFetch, data, error, loading, isSuccess } = useFetch();
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        media: [{ url: "", alt: "" }],
        price: "",
        maxGuests: "",
        rating: 0,
        meta: { wifi: false, parking: false, breakfast: false, pets: false },
        location: {
            address: "",
            city: "",
            zip: "",
            country: "",
            continent: "",
            lat: 0,
            lng: 0,
        },
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (isEdit && venue) {
            setFormData({
                name: venue.name || "",
                description: venue.description || "",
                media: venue.media.length ? venue.media : [{ url: "", alt: "" }],
                price: venue.price || 0,
                maxGuests: venue.maxGuests || 1,
                rating: venue.rating || 1,
                meta: venue.meta || {
                    wifi: false,
                    parking: false,
                    breakfast: false,
                    pets: false,
                },
                location: venue.location || {
                    address: "",
                    city: "",
                    zip: "",
                    country: "",
                    continent: "",
                    lat: 0,
                    lng: 0,
                },
            });
        }
    }, [isEdit, venue]);

    useEffect(() => {
        validateForm();
    }, [formData, validateForm]);

    const closeModal = () => {
        setShowModal(false);
        onClose();
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.name) errors.name = "Venue name is required.";
        if (!formData.description) errors.description = "Description is required.";
        if (!formData.price || formData.price <= 0)
            errors.price = "Price must be greater than 0.";
        if (!formData.maxGuests || formData.maxGuests <= 0)
            errors.maxGuests = "Max guests must be greater than 0.";

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "price" || name === "maxGuests" || name === "rating") {
            setFormData({ ...formData, [name]: parseFloat(value) || 0 });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleMediaChange = (index, event) => {
        const { name, value } = event.target;
        const updatedMedia = formData.media.map((media, mediaIndex) => {
            if (index === mediaIndex) {
                return { ...media, [name]: value };
            }
            return media;
        });
        setFormData({ ...formData, media: updatedMedia });
    };

    const handleMetaChange = (event) => {
        const { name, checked } = event.target;
        setFormData({ ...formData, meta: { ...formData.meta, [name]: checked } });
    };

    const handleLocationChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            location: { ...formData.location, [name]: value },
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        validateForm();
        if (!validateForm()) return;

        const updatedMedia = formData.media.map((media) => {
            if (!media.url) {
                return { url: placeHolderMedia, alt: "Placeholder media image" };
            }
            return media;
        });

        const updatedFormData = { ...formData, media: updatedMedia };

        setShowModal(true);
        performFetch({
            url: isEdit ? `${createVenueUrl}/${venue.id}` : createVenueUrl,
            method: isEdit ? "PUT" : "POST",
            body: JSON.stringify(updatedFormData),
        });
    };

    const addMedia = () => {
        setFormData({
            ...formData,
            media: [...formData.media, { url: "", alt: "" }],
        });
    };

    const removeMedia = (index) => {
        const updatedMedia = formData.media.filter(
            (_, mediaIndex) => mediaIndex !== index
        );
        setFormData({ ...formData, media: updatedMedia });
    };

    return (
        <div>
            <Modal isOpen={showModal} onClose={closeModal} isSuccess={isSuccess}>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}. Please try again with updated form!</p>}
                {data && <p>Success! Venue {isEdit ? "updated" : "created"}.</p>}
            </Modal>
            <form
                onSubmit={handleSubmit}
                className="flex-col align-middle p-4 rounded-25"
            >
                <div className="border-b pb-12">
                    <h2 className="leading-7 text-gray-900">
                        {isEdit ? `Edit Venue: ${venue.name}` : "Create a New Venue"}
                    </h2>
                    <div className="text-left mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-4">
                        <div className="sm:col-span-4">
                            <div className="flex">
                                <PiTag className="mr-2 h-6 w-6 text-gray-900" />
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Venue Name
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="block w-full rounded-md border py-1.5"
                                    placeholder="Venue name"
                                    value={formData.name || ""}
                                    required
                                />
                                {formErrors.name && (
                                    <p className="text-xs mt-1">{formErrors.name}</p>
                                )}
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <div className="flex">
                                <PiTextAUnderline className="mr-2 h-6 w-6 text-gray-900" />
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Description
                                </label>
                            </div>
                            <div className="mt-2">
                                <textarea
                                    onChange={handleChange}
                                    name="description"
                                    id="description"
                                    className="block w-full rounded-md border py-1.5"
                                    placeholder="Venue description"
                                    value={formData.description || ""}
                                    required
                                />
                                {formErrors.description && (
                                    <p className="text-xs mt-1">{formErrors.description}</p>
                                )}
                            </div>
                        </div>
                        {formData.media.map((media, index) => (
                            <div key={index} className="sm:col-span-4">
                                <div className="flex">
                                    <PiImage className="mr-2 h-6 w-6" />
                                    <label
                                        htmlFor={`mediaUrl-${index}`}
                                        className="block text-sm font-medium leading-6"
                                    >
                                        Media URL
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) => handleMediaChange(index, e)}
                                        type="text"
                                        name="url"
                                        id={`mediaUrl-${index}`}
                                        className="block w-full rounded-md border py-1.5"
                                        placeholder="Media URL"
                                        value={media.url || ""}
                                    />
                                </div>
                                <div className="flex mt-2">
                                    <PiTextAUnderline className="mr-2 h-6 w-6" />
                                    <label
                                        htmlFor={`mediaAlt-${index}`}
                                        className="block text-sm font-medium leading-6"
                                    >
                                        Media Alt Text
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) => handleMediaChange(index, e)}
                                        type="text"
                                        name="alt"
                                        id={`mediaAlt-${index}`}
                                        className="block w-full rounded-md border py-1.5"
                                        placeholder="Media description"
                                        value={media.alt || ""}
                                    />
                                </div>
                                {formData.media.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeMedia(index)}
                                        className="btn-revert mt-2"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                        <div className="sm:col-span-4 flex justify-center w-full">
                            <button type="button" onClick={addMedia} className="btn">
                                Add More Media
                            </button>
                        </div>
                        <div className="sm:col-span-2">
                            <div className="flex">
                                <PiCurrencyEur className="mr-2 h-6 w-6" />
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium leading-6"
                                >
                                    Price
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    type="number"
                                    name="price"
                                    id="price"
                                    className="block w-full rounded-md border py-1.5"
                                    placeholder="Price"
                                    value={formData.price || ""}
                                    required
                                />
                                {formErrors.price && (
                                    <p className="text-xs mt-1">{formErrors.price}</p>
                                )}
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <div className="flex">
                                <PiUsers className="mr-2 h-6 w-6" />
                                <label
                                    htmlFor="maxGuests"
                                    className="block text-sm font-medium leading-6"
                                >
                                    Max Guests
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    type="number"
                                    name="maxGuests"
                                    id="maxGuests"
                                    className="block w-full rounded-md border py-1.5"
                                    placeholder="Max guests"
                                    value={formData.maxGuests || ""}
                                    required
                                />
                                {formErrors.maxGuests && (
                                    <p className="text-xs mt-1">{formErrors.maxGuests}</p>
                                )}
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <div className="flex">
                                <PiStar className="mr-2 h-6 w-6" />
                                <label
                                    htmlFor="rating"
                                    className="block text-sm font-medium leading-6"
                                >
                                    Rating
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={handleChange}
                                    type="number"
                                    name="rating"
                                    id="rating"
                                    className="block w-full rounded-md border py-1.5"
                                    placeholder="Rating"
                                    value={formData.rating || ""}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label className="block text-sm font-medium leading-6">
                                Amenities
                            </label>
                            <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-6">
                                {["wifi", "parking", "breakfast", "pets"].map((amenity) => (
                                    <div key={amenity} className="flex items-center">
                                        <input
                                            onChange={handleMetaChange}
                                            type="checkbox"
                                            name={amenity}
                                            id={amenity}
                                            className="h-4 w-4 rounded border focus:ring-primary align-middle"
                                            checked={formData.meta[amenity] || false}
                                        />
                                        <label htmlFor={amenity} className="ml-2">
                                            {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <div className="flex">
                                <PiMapPin className="mr-2 h-6 w-6" />
                                <label
                                    htmlFor="address"
                                    className="block text-sm font-medium leading-6"
                                >
                                    Address
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={handleLocationChange}
                                    type="text"
                                    name="address"
                                    id="address"
                                    className="block w-full rounded-md border py-1.5"
                                    placeholder="Address"
                                    value={formData.location.address || ""}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <div className="flex">
                                <PiAt className="mr-2 h-6 w-6" />
                                <label
                                    htmlFor="city"
                                    className="block text-sm font-medium leading-6"
                                >
                                    City
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={handleLocationChange}
                                    type="text"
                                    name="city"
                                    id="city"
                                    className="block w-full rounded-md border py-1.5"
                                    placeholder="City"
                                    value={formData.location.city || ""}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <div className="flex">
                                <PiMapPin className="mr-2 h-6 w-6" />
                                <label
                                    htmlFor="zip"
                                    className="block text-sm font-medium leading-6"
                                >
                                    ZIP Code
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={handleLocationChange}
                                    type="number"
                                    name="zip"
                                    id="zip"
                                    pattern="[0-9]{5}"
                                    maxLength="5"
                                    className="block w-full rounded-md border py-1.5"
                                    placeholder="ZIP Code"
                                    value={formData.location.zip || ""}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <div className="flex">
                                <PiMapPin className="mr-2 h-6 w-6" />
                                <label
                                    htmlFor="country"
                                    className="block text-sm font-medium leading-6"
                                >
                                    Country
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    onChange={handleLocationChange}
                                    type="text"
                                    name="country"
                                    id="country"
                                    className="block w-full rounded-md border py-1.5"
                                    placeholder="Country"
                                    value={formData.location.country || ""}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <div className="flex">
                                <PiMapPin className="mr-2 h-6 w-6" />
                                <label
                                    htmlFor="continent"
                                    className="block text-sm font-medium leading-6"
                                >
                                    Continent
                                </label>
                            </div>
                            <div className="mt-2">
                                <select
                                    onChange={handleLocationChange}
                                    name="continent"
                                    id="continent"
                                    className="block w-full rounded-md border py-1.5"
                                    value={formData.location.continent || ""}
                                    required
                                >
                                    <option value="">Select a continent</option>
                                    <option value="North America">North America</option>
                                    <option value="South America">South America</option>
                                    <option value="Europe">Europe</option>
                                    <option value="Africa">Africa</option>
                                    <option value="Asia">Asia</option>
                                    <option value="Australia">Australia</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="submit" className="btn">
                        {isEdit ? "Update" : "Create"}
                    </button>
                </div>
            </form>
        </div>
    );
};

CreateVenue.propTypes = {
    venue: PropTypes.object,
    isEdit: PropTypes.bool,
    onClose: PropTypes.func,
};

export default CreateVenue;
