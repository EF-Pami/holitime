import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import FetchVenue from "../../Api/fetch/Venue";
import MyBookingCalender from "../../components/Calender";
import ImageCarousel from "../../components/Cards/Images";
import Description from "../../components/Cards/Description";
import Address from "../../components/Cards/Address";
import Price from "../../components/Cards/Price";
import Meta from "../../components/Cards/Meta";
import OwnerInfo from "../../components/Cards/Owner";
import Rating from "../../components/Cards/Rating";
import useToken from "../../hooks/useToken";
import ThemeContext from "../../components/Theme";

/**
 * function displays the booking component
 */

const Booking = () => {
    const [expandedCard, setExpandedCard] = useState(null);
    const [numGuests, setNumGuests] = useState(1);
    const { id } = useParams();
    const { venue, loading, error } = FetchVenue(id);
    const { theme } = useContext(ThemeContext);
    const data = venue.data;
    const token = useToken();

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

    const toggleExpanded = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    return (
        <div
            className={`m-auto mb-16 ${theme === "light" ? "text-black" : " text-background"}`}
        >
            <ImageCarousel
                images={data.media}
                imageStyle={{ height: `auto`, width: `100%` }}
            />
            <div className="px-3 m-auto md:px-5 lg:max-w-4xl">
                <div className="my-5 px-3 flex justify-between flex-wrap gap-5">
                    <div>
                        <div>
                            <h1 className="text-2xl text-ellipsis overflow-hidden max-w-96">
                                {data.name}
                            </h1>
                            <div className="flex items-center gap-3 mb-5">
                                Venue Rating: <Rating rating={data.rating} />
                            </div>
                            <Address object={data.location} />
                        </div>
                    </div>
                    <div>
                        <Price price={data.price} />
                        <div>
                            <p className="text-lg mb-5">Max Guests: {data.maxGuests}</p>
                            <Meta object={data.meta} />
                        </div>
                    </div>
                </div>
                <div className="my-5 flex justify-between p-5 gap-5">
                    {token ? (
                        <OwnerInfo owner={data.owner} />
                    ) : (
                        <p className="italic">Please log in to view owner</p>
                    )}
                </div>
                <div className="my-5 flex justify-between p-5 gap-5">
                    <Description
                        description={data.description}
                        isExpanded={expandedCard === venue.id}
                        toggleExpanded={() => toggleExpanded(venue.id)}
                    />
                </div>
            </div>
            <div className="my-5">
                <MyBookingCalender
                    bookings={data.bookings}
                    venueId={data.id}
                    pricePerNight={data.price}
                    guests={numGuests}
                    setGuests={setNumGuests}
                    maxGuests={data.maxGuests}
                />
            </div>
        </div>
    );
};

export default Booking;
