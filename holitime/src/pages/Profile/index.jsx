import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../Api/FetchHook";
import { bookingsUrl, userUrl, venuesUrl } from "../../Api/constants/url";
import { formatDate } from "../../utils/formatDate";
import DropdownMenu from "../../components/Dropdown";
import CreateVenue from "../../components/forms/CreateVenue";
import UpdateProfile from "../../components/forms/UpdateProfile";
import useDeleteFetch from "../../Api/fetch/Delete";
import VenueBanner from "../../Api/fetch/MyVenues";
import ThemeContext from "../../components/Theme";

/**
 * function displays the users profile page where in the user can see their bookings and venues created as well as possibility of editing their profile
 */

const Profile = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [currentVenue, setCurrentVenue] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const { theme } = useContext(ThemeContext);
    const formRef = useRef(null);

    const { name } = useParams();
    const navigate = useNavigate();

    const user = localStorage.getItem("user");
    const userName = user ? JSON.parse(user).name : null;
    const token = localStorage.getItem("accessToken");

    const isOwnProfile = !name || name === userName;
    const url = name ? `${userUrl}${name}` : `${userUrl}${userName}`;

    const { performFetch, data, loading, error } = useFetch(
        `${url}?_venues=true&_bookings=true`
    );

    const { submitDelete } = useDeleteFetch();

    const refreshUser = () => {
        setShowCreateForm(false);
        setShowUpdateForm(false);
        setTimeout(() => {
            performFetch();
        }, 500);
    };

    useEffect(() => {
        if (userName || name) {
            performFetch();
        }
    }, [userName, name, performFetch]);

    const handleScrollToForm = () => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleEditVenue = (venue) => {
        setCurrentVenue(venue);
        setIsEdit(true);
        setShowCreateForm(true);
        setShowUpdateForm(false);
        setTimeout(handleScrollToForm, 100); // Wait for the form to render
    };

    const handleEditProfile = () => {
        setShowUpdateForm(true);
        setShowCreateForm(false);
        setTimeout(handleScrollToForm, 100);
    };

    const handleBtnClick = () => {
        if (showUpdateForm) {
            toggleUpdateForm();
            return;
        }

        if (showCreateForm) {
            toggleCreateForm();
        } else if (!isVenueManager) {
            toggleUpdateForm();
        } else {
            setCurrentVenue(null);
            setIsEdit(false);
            toggleCreateForm();
        }
    };

    const handleDelete = (bookingId) => {
        console.log("Delete triggered!", bookingId);
        if (window.confirm("Are you sure you want to delete this booking?")) {
            submitDelete(bookingsUrl, bookingId);
            refreshUser();
        } else {
            console.log("Delete cancelled");
        }
    };

    const handleDeleteVenue = (venueId) => {
        if (window.confirm("Are you sure you want to delete this venue?")) {
            submitDelete(venuesUrl, venueId);
            refreshUser();
        } else {
            console.log("Delete cancelled");
        }
    };

    const toggleCreateForm = () => {
        setShowCreateForm((prev) => !prev);
    };

    const toggleUpdateForm = () => {
        setShowUpdateForm((prev) => !prev);
    };

    const handleActivate = (value) => {
        switch (value) {
            case "edit_profile":
                handleEditProfile();
                break;
            case "edit_venue":
                handleEditVenue(currentVenue);
                break;
            case "delete_booking":
                break;
            case "delete_venue":
                handleDeleteVenue(currentVenue.id);
                break;
            case "view_bookings":
                break;
            default:
                console.log("Unknown action:", value);
        }
    };

    if (loading) {
        return (
            <div>
                <span className="loader">Loading</span>
            </div>
        );
    }
    if (error) {
        return (
            <div>
                <span className="loader">{error}</span>
            </div>
        );
    }
    if (!data) {
        return (
            <div>
                <span className="loader">{data}</span>
            </div>
        );
    }
    const isVenueManager = data.data.venueManager;
    const userDetail = data.data;

    const profileMenuItems = isOwnProfile
        ? [{ label: "Edit Profile", value: "edit_profile" }]
        : [];
    const venueMenuItems = isOwnProfile
        ? [
            { label: "Edit Venue", value: "edit_venue" },
            { label: "Delete Venue", value: "delete_venue" },
        ]
        : [];
    const bookingMenuItems = isOwnProfile
        ? [{ label: "Delete", value: "delete_booking" }]
        : [];

    return (
        <div
            className={`flex flex-col m-auto gap-5 mb-16 ${theme === "light" ? "text-black" : " text-background"} `}
        >
            <div className="h-[300px] overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src={userDetail.banner.url}
                    alt={"Profile Banner"}
                />
            </div>
            <div className="relative p-5">
                <div>
                    <div className="relative -mt-24 w-40 h-40 overflow-hidden rounded-full">
                        <img
                            className="object-cover w-full h-full"
                            src={userDetail.avatar.url}
                            alt={"Profile Avatar"}
                        />
                    </div>
                    <div className="w-full">
                        {isOwnProfile && (
                            <div className="flex justify-end gap-2 translate-y-7">
                                <DropdownMenu
                                    className={"hover:cursor-pointer"}
                                    listItems={profileMenuItems}
                                    onActivate={handleActivate}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <h1 className="text-center text-xl">{userDetail.name}</h1>
                <div className="mt-5">
                    <h2>Bio</h2>
                    <p className="mx-3 mb-5 break-words max-w-[600px]">
                        {userDetail.bio ? userDetail.bio : "No bio yet"}
                    </p>
                </div>
                {token && isVenueManager && (
                    <div className="mt-5">
                        <div>
                            <h2 className="mb-4">
                                {isOwnProfile ? "My Venues" : `${userDetail.name}'s Venues`} (
                                {userDetail._count.venues})
                            </h2>
                            <div>
                                {userDetail.venues.map((venue) => (
                                    <div
                                        className="flex justify-center w-full mb-4"
                                        key={venue.id}
                                    >
                                        <VenueBanner
                                            venueId={venue.id}
                                            isOwnProfile={isOwnProfile}
                                        />
                                        {isOwnProfile && (
                                            <DropdownMenu
                                                className={"hover:cursor-pointer"}
                                                listItems={venueMenuItems}
                                                onActivate={(value) => {
                                                    if (value === "edit_venue") handleEditVenue(venue);
                                                    if (value === "delete_venue")
                                                        handleDeleteVenue(venue.id);
                                                }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                <div ref={formRef} className="w-full flex justify-end px-4">
                    {token && isOwnProfile && (
                        <button className="btn my-5" onClick={handleBtnClick}>
                            {showCreateForm || showUpdateForm
                                ? "Close"
                                : isVenueManager
                                    ? "Add Venue"
                                    : "Become a Venue Manager"}
                        </button>
                    )}
                </div>
                <div>
                    {showCreateForm && (
                        <CreateVenue
                            venue={currentVenue}
                            isEdit={isEdit}
                            onClose={() => {
                                setCurrentVenue(null);
                                setIsEdit(false);
                            }}
                        />
                    )}
                    {showUpdateForm && (
                        <UpdateProfile isUser={userName} onClose={refreshUser} />
                    )}
                </div>
                {token && isOwnProfile && (
                    <div className="mt-5">
                        <h2>My Upcoming Bookings</h2>
                        <div>
                            <table className="w-full text-left table">
                                <thead>
                                    <tr>
                                        <th className="px-3 py-2">Name</th>
                                        <th className="py-2">Details</th>
                                        <th className="text-right px-3 py-2">Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userDetail.bookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td
                                                onClick={() => navigate(`/booking/${booking.venue.id}`)}
                                                className="font-bold px-4 py-2 hover:underline hover:cursor-pointer hover:text-accent"
                                            >
                                                {booking.venue.name.slice(0, 20)}
                                            </td>
                                            <td className="py-2">
                                                <div className="flex flex-col sm:flex-row">
                                                    <span className="block sm:inline">{`From: ${formatDate(booking.dateFrom)}`}</span>
                                                    <span className="block sm:inline sm:ml-4">{`To: ${formatDate(booking.dateTo)}`}</span>
                                                </div>
                                            </td>
                                            <td className="py-2 hover:cursor-pointer text-right">
                                                <DropdownMenu
                                                    listItems={bookingMenuItems}
                                                    onActivate={() => handleDelete(booking.id)}
                                                    size={16}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;