import { useParams } from "react-router";
import { useCreate, useDelete, useGetAll, useGetOne } from "../../api/adminApi";

import styles from "../../assets/styles/ratingStars.module.css"
import { FaHeart, FaRegHeart } from "react-icons/fa";


import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";

export default function NewsDetails() {
    const { newsId } = useParams();
    const { getOne } = useGetOne("news", newsId);
    const { getAll, refreshData } = useGetAll("likes");
    const { email: isLogged, _id: userId } = useContext(UserContext);
    const { create } = useCreate("likes");
    const { deleteData } = useDelete("likes");

    const [likedNewsId, setLikedNewsId] = useState(null);

    useEffect(() => {
        if (getAll.length > 0 && userId) {
            // Find the like where both the newsId and userId match
            const likedNews = getAll.find(like => like._ownerId === userId && like.newsId === getOne._id);

            if (likedNews) {
                setLikedNewsId(likedNews._id); // Set the liked news ID
            } else {
                setLikedNewsId(null); // Set it to null if no match is found
            }
        }
    }, [getAll, userId, getOne._id]);


    const addLikeBtnClickHandler = async () => {
        const likeData = {
            newsId: getOne._id,
        };

        await create(likeData);
        refreshData();

    }

    const deleteLikeBtnClickHandler = async () => {
        if (likedNewsId) {
            await deleteData(likedNewsId);
            setLikedNewsId(null);
            refreshData();
        }
    };

    const formattedDate = (dateString) => {
        const monthAbbreviations = {
            "January": "Ян",
            "February": "Фев",
            "March": "Март",
            "April": "Апр",
            "May": "Май",
            "June": "Юни",
            "July": "Юли",
            "August": "Авг",
            "September": "Септ",
            "October": "Окт",
            "November": "Ное",
            "December": "Дек"
        };

        const date = new Date(dateString);
        const monthName = date.toLocaleDateString('en-US', { month: 'long' });
        const shortMonth = monthAbbreviations[monthName];
        const formattedDate = `${date.getDate()} ${shortMonth}, ${date.getFullYear()}`;

        return formattedDate;
    };

    return (
        <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:pt-16 sm:pb-0 lg:overflow-visible lg:px-0">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            {getOne.newsType === "event" && (
                                <div className="flex items-center gap-x-4 text-sm mb-4">
                                    <span className="text-indigo-600 font-semibold">
                                        {formattedDate(getOne.eventDate)}
                                    </span>
                                    <span className="relative rounded-full bg-gray-50 px-4 py-1.5 font-medium text-gray-600 border hover:bg-gray-100">
                                        {getOne.eventLocation}
                                    </span>
                                </div>
                            )}

                            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                                {getOne.title}
                            </h1>

                            <div className="mt-2 flex items-center space-x-2 text-md text-gray-600">
                                {isLogged ? (
                                    <button
                                        className="flex items-center font-mono tracking-wide cursor-pointer bg-gray-100 hover:bg-gray-300 px-5 rounded-full transition-colors duration-300 mt-3 py-1 focus:outline-none"
                                        onClick={likedNewsId ? deleteLikeBtnClickHandler : addLikeBtnClickHandler}
                                    >
                                        <span className=" text-red-500 text-xl">
                                            {likedNewsId ? <FaHeart /> : <FaRegHeart />}
                                        </span>
                                        {/* Filter likes to show only those for the current news */}
                                        <span className="text-gray-800 font-light text-xs mx-2">
                                            {getAll.filter(like => like.newsId === getOne._id).length || ""}
                                        </span>
                                        <span className="text-gray-800 font-light ">
                                            {likedNewsId ? "Харесано" : "Харесай"}
                                        </span>
                                    </button>
                                ) : (
                                    <span className="flex items-center font-mono tracking-wide bg-gray-100 px-5 rounded-full transition-colors duration-300 mt-3 py-1 focus:outline-none">
                                        <span className="ml-1 text-red-500 text-xl">
                                            {getAll.filter(like => like.newsId === getOne._id).length ? <FaHeart /> : <FaRegHeart />}
                                        </span>
                                        <span className="text-gray-800 font-light text-xs mx-2">
                                            {getAll.filter(like => like.newsId === getOne._id).length || ""}
                                        </span>
                                        <span className="text-gray-800 font-light ">Харесвания</span>
                                    </span>
                                )}


                                {/* TODO add button to share in fb, whatsapp, etc. */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="-mt-0 -ml-0 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-5 lg:row-start-1 lg:overflow-hidden">
                    <img
                        alt={getOne.title}
                        src={getOne.imageUrl}
                        className="w-[48rem] rounded-xl bg-gray-900 ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem]"
                    />
                </div>
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x- lg:px-8">
                    <div className="lg:pr-4">
                        <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg">
                            <p className="mb-4 leading-relaxed">
                                {getOne.description}
                            </p>
                        </div>

                        <div className="flex items-center gap-x-4 text-sm my-10 bg-gray-200 px-4 rounded-lg w-100">
                            <span className="text-indigo-500 font-semibold mx-0 px-0">
                                публикувано на
                            </span>
                            <span className="px-0 py-1.5 font-medium text-indigo-400 mx-0">
                                {formattedDate(getOne.publishedDate)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Section (Made Consistent Width with Upper Part) */}
            <div className="mt-10 mx-auto grid max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-gray-300 py-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Left Column - Review Form */}
                    <div className="col-span-12 md:col-span-4 p-2">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-3">Оставете отзив</h3>
                        <form className="mt-4 space-y-3">
                            <input type="text" placeholder="Вашето име" className="w-full p-2 border rounded h-8 border-gray-300" required />

                            <div className={`${styles.rate} justify-start`}>
                                <input type="radio" id="star5" name="rate" value="5" required />
                                <label htmlFor="star5" title="5 stars">★</label>

                                <input type="radio" id="star4" name="rate" value="4" />
                                <label htmlFor="star4" title="4 stars">★</label>

                                <input type="radio" id="star3" name="rate" value="3" />
                                <label htmlFor="star3" title="3 stars">★</label>

                                <input type="radio" id="star2" name="rate" value="2" />
                                <label htmlFor="star2" title="2 stars">★</label>

                                <input type="radio" id="star1" name="rate" value="1" />
                                <label htmlFor="star1" title="1 star">★</label>
                            </div>

                            <input type="text" placeholder="Заглавие на отзива" className="w-full p-2 border rounded h-8 border-gray-300" required />
                            <textarea placeholder="Вашият отзив..." rows="3" className="w-full p-2 border rounded border-gray-300" required></textarea>

                            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                                Публикувайте отзив
                            </button>
                        </form>
                    </div>

                    {/* Right Column - Reviews */}
                    <div className="col-span-12 md:col-span-8">
                        <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-5 pl-4">Отзиви</h3>
                        <div className="mt-2 space-y-4">
                            {[
                                { name: "Alice Johnson", rating: "★★★★★", title: "Amazing Quality", review: "Exceeded expectations!" },
                                { name: "Mark Lee", rating: "★★★★☆", title: "Comfortable Wear", review: "Very comfortable, but delivery took time." },
                                { name: "Emma Wilson", rating: "★★★★★", title: "Highly Recommended", review: "Perfect fit and great material." },
                                { name: "David Brown", rating: "★★★☆☆", title: "Decent Quality", review: "Good quality but sizing was a bit off." },
                                { name: "Sophia Miller", rating: "★★★★★", title: "Loved It!", review: "Absolutely love it! Will order again." }
                            ].map((review, index) => (
                                <div key={index}>
                                    <div className="grid grid-cols-12 gap-4 p-4 items-center">
                                        <p className="col-span-3 font-bold text-gray-800">{review.name}</p>
                                        <p className="col-span-3 text-yellow-500">{review.rating}</p>
                                        <div className="col-span-6">
                                            <p className="font-semibold text-gray-900">{review.title}</p>
                                            <p className="text-gray-600">{review.review}</p>
                                        </div>
                                    </div>
                                    {index < 4 && <hr className="border-gray-300" />} {/* Horizontal line except last item */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}
