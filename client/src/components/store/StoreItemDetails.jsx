import { useParams } from "react-router";
import { useCreate, useDelete, useEdit, useGetAll, useGetOne } from "../../api/adminApi";
import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import { FaEdit, FaRegTrashAlt, FaSpinner } from "react-icons/fa";

import styles from "../../assets/styles/ratingStars.module.css"

import { validateReviews } from "../../utils/validations/reviews/validateReviews";

import { TbTruckDelivery } from "react-icons/tb";
import { SlLocationPin } from "react-icons/sl";
import { ITEMS_SIZES } from "../../constants/store/itemsSizes";
import useAuth from "../../hooks/useAuth";

export default function StoreItemDetails() {
    const { itemId } = useParams();
    const { getOne } = useGetOne("store", itemId);
    const { email, _id: authorId } = useAuth();
    const { getAll, refreshData } = useGetAll("reviews");

    const { edit } = useEdit("reviews");
    const { create } = useCreate("reviews");
    const { deleteData } = useDelete("reviews");

    const [selectedSize, setSelectedSize] = useState([]);
    const [quantity, setQuantity] = useState(0);

    const [loadingImage, setLoadingImage] = useState(true);
    const [showImage, setShowImage] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [dataFormReview, setDataFormReview] = useState({});

    const isReviewed = getAll.find(u => u._ownerId === authorId && u.postId === getOne._id);

    const [formFeedback, setFormFeedback] = useState({});

    const averageRating = useMemo(() => {
        if (!getAll || getAll.length === 0) return 0;
    
        // Filter reviews for the specific postId
        const filteredReviews = getAll.filter((review) => review.postId === getOne._id);
    
        if (filteredReviews.length === 0) return 0;
    
        // Calculate the total rating for the filtered reviews
        const total = filteredReviews.reduce((sum, review) => sum + Number(review.rate || 0), 0);
    
        // Return the average, rounded to 1 decimal place
        return (total / filteredReviews.length).toFixed(1);
    }, [getAll, getOne._id]);
   
    const [formValues, setFormValues] = useState({
        postId: "",
        reviewSender: email,
        rate: "",
        reviewTite: "",
        reviewDescription: "",
    });

    useEffect(() => {
        if (!getAll || !getOne?._id || !authorId) return;

        const alreadyReviewed = getAll.find(
            (u) => u._ownerId === authorId && u.postId === getOne._id
        );

        setShowForm(!alreadyReviewed);
    }, [getAll, getOne?._id, authorId]);



    const handleSizeClick = (sizeKey, sizeData) => {
        setSelectedSize({ size: sizeKey, ...sizeData });
    };

    const deleteReviewClickHandle = async (reviewId) => {
        const hasConfirm = confirm("Изтриване на коментар");
        if (!hasConfirm) {
            return;
        }

        await deleteData(reviewId);
        refreshData();
        setShowForm(true);
        setDataFormReview({});
    }

    const editReviewClickHandle = (review) => {
        setShowForm(true);
        setDataFormReview(review);
        setFormFeedback({});
    }

    const cancelReviewClickHandle = () => {
        setShowForm(false);
        setDataFormReview({});
    }

    useEffect(() => {
        if (getAll && getOne?._id) {
            const foundReview = getAll.find(u => u._ownerId === authorId && u.postId === getOne._id);
            setFormValues((prev) => ({
                ...prev,
                rate: foundReview?.rate || "",
                reviewTite: foundReview?.reviewTite || "",
                reviewDescription: foundReview?.reviewDescription || "",
            }));
        }
    }, [getAll, getOne?._id, authorId]);

    const handleReviewForm = async (e) => {
        e.preventDefault();

        const trimmedValues = {
            ...formValues,
            postId: getOne._id,
            reviewTite: formValues.reviewTite?.trim(),
            reviewDescription: formValues.reviewDescription?.trim(),
            rate: Number(formValues.rate),
        }

        const validationMessages = validateReviews(trimmedValues);

        if (Object.keys(validationMessages).length > 0) {
            setFormFeedback(validationMessages);
            return;
        }

        if (isReviewed) {
            await edit(dataFormReview._id, trimmedValues);
            setDataFormReview({});
            refreshData();
            setFormFeedback({});
        } else {
            await create(trimmedValues);
            refreshData();
            setShowForm(false);
            setFormFeedback({});
        }

    }

    return (
        <div className="max-w-7xl mx-auto p-3 bg-white my-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 shadow-lg rounded-lg pt-5 pb-20 px-5">
                {/* Product Image */}
                <div className="relative w-full min-h-[200px] flex items-center justify-center">
                    {loadingImage && (
                        <FaSpinner className="animate-spin text-3xl text-gray-500 absolute" />
                    )}

                    <img
                        src={getOne.itemImgUrl || "/alert-images/noimage.jpg"}
                        alt="Product"
                        className={`w-full rounded-lg cursor-pointer transition-opacity duration-300 ${loadingImage ? "opacity-0" : "opacity-100"
                            }`}
                        onLoad={() => setLoadingImage(false)}
                        onError={(e) => {
                            e.target.src = "/alert-images/noimage.png";
                            setLoadingImage(false);
                        }}
                        onClick={() => setShowImage(getOne.itemImgUrl)}
                    />
                </div>



                <Dialog open={!!showImage} onClose={() => setShowImage(null)} className="relative z-10">
                    <DialogBackdrop className="fixed inset-0 bg-black/70" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <DialogPanel className="max-w-3xl w-full">
                            <img
                                src={showImage}
                                alt="item"
                                className="w-full rounded-lg"
                                onClick={() => setShowImage(null)}
                            />
                        </DialogPanel>
                    </div>
                </Dialog>


                {/* Product Details */}
                <div className="col-span-1">
                    <h2 className="text-2xl font-bold text-gray-800">{getOne.itemTitle}</h2>
                    <div className="border-b border-gray-300 text-sm text-sky-600 mt-2">
                        <span>Kатегория: </span>
                        <span>{getOne.itemCategory}</span>
                    </div>
                    <div className="flex items-center mt-2">
                        <span className="text-gray-600 text-sm mr-2">{averageRating}</span>
                        <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                                <span
                                    key={i}
                                    className={`text-lg ${i < Math.round(averageRating) ? "text-yellow-500" : "text-gray-300"}`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Size Options */}
                    {getOne.sizeData && Object.keys(getOne.sizeData).length > 0 && (
                        <div className="mt-4">
                            <label className="text-gray-400 font-semibold mr-2">Размер:</label>
                            <span>{selectedSize.size}</span>
                            <div className="mt-2 flex flex-wrap gap-2">
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                    {ITEMS_SIZES.map((size) => {
                                        const isAvailable = getOne.sizeData[size];

                                        return (
                                            <div
                                                key={size}
                                                className={`flex flex-col border rounded-lg w-20 py-1
                                                    ${isAvailable
                                                        ? "border-gray-400 hover:border-sky-600 cursor-pointer"
                                                        : "border-gray-300 bg-gray-200 cursor-not-allowed opacity-50"
                                                    }
                                                    ${selectedSize.size === size && isAvailable
                                                        ? "border-sky-500 border-2"
                                                        : ""}`
                                                }
                                                onClick={() => isAvailable && handleSizeClick(size, getOne.sizeData[size])}
                                            >
                                                <span className="text-sm font-semibold border-b border-gray-300 w-full pl-2">{size}</span>
                                                <span className="text-xs text-gray-600 mt-1 pl-2">
                                                    {isAvailable ? `${getOne.sizeData[size].price.toFixed(2)} ${getOne.sizeData[size].currency}` : "Няма наличност"}
                                                </span>
                                            </div>
                                        );
                                    })}

                                </div>

                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <div className="mt-4">
                        <label className="text-gray-700 font-bold">Описание</label>
                        <p className="text-gray-600">{getOne.itemDescription}</p>
                    </div>
                </div>

                {/* Price & Purchase Options */}
                <div className="w-80 border rounded-xl border-gray-300 px-6 py-4 flex flex-col gap-4 mx-auto">
                    <h3 className="text-xl font-semibold text-gray-800">
                        {getOne && getOne.sizeData && Object.keys(getOne.sizeData).length > 0
                            ? (selectedSize && selectedSize.price && selectedSize.currency
                                ? (
                                    <div>
                                        {/* Integer part */}
                                        <span className="text-2xl">{Math.floor(selectedSize.price)}</span>
                                        {/* Decimal part */}
                                        {selectedSize.price.toString().includes('.') && (
                                            <sup className="text-md">{selectedSize.price.toFixed(2).toString().split('.')[1]}</sup>
                                        )}
                                        <span className="text-base">{selectedSize.currency}</span>
                                    </div>
                                )
                                : "")
                            : (getOne && getOne.itemPrice && getOne.currency
                                ? (
                                    <div>
                                        {/* Integer part */}
                                        <span className="text-2xl">{Math.floor(getOne.itemPrice)}</span>
                                        {/* Decimal part */}
                                        {getOne.itemPrice.toString().includes('.') && (
                                            <sup className="text-md">{getOne.itemPrice.toFixed(2).toString().split('.')[1]}</sup>
                                        )}
                                        <span className="text-base">{getOne.currency}</span>
                                    </div>
                                )
                                : "")} {/* Loading ... */}
                    </h3>

                    <div className="flex flex-col gap-0">
                        <p className="flex items-center text-gray-700 ">
                            <TbTruckDelivery className="text-green-600 text-2xl mr-2" />
                            2-4 дни
                            <span className="text-dark flex items-center ml-2 font-semibold ">(<SlLocationPin className="mr-1" /> България)</span>
                        </p>
                        <p className="text-dark text-sm ">
                            &bull; доставката се поема от купувача
                        </p>
                    </div>

                    {/* Quantity Selector */}
                    <label className="text-green-600 font-semibold">Налично</label>
                    <div className="flex items-center justify-between space-x-4">
                        <span className="text-gray-700 font-semibold text-sm">Количество:</span>
                        <select
                            className="border rounded-md border-gray-300 h-8 w-auto px-1 text-sm cursor-pointer bg-gray-100 flex-grow sm:w-1/4"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        >
                            {getOne.sizeData && Object.keys(getOne.sizeData).length > 0 ? (
                                selectedSize && selectedSize.qtty ? (
                                    [...Array(Number(selectedSize.qtty))].map((_, index) => (
                                        <option key={index} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Няма маркиран размер</option>
                                )
                            ) : (
                                getOne.itemQtty ? (
                                    [...Array(getOne.itemQtty)].map((_, index) => (
                                        <option key={index} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Loading...</option>
                                )

                            )}
                        </select>

                    </div>

                    {/* Buttons */}
                    <button
                        className="w-full bg-yellow-300 text-dark py-2 rounded-xl hover:bg-yellow-400 cursor-pointer">
                        Добави в количката
                    </button>
                    <button className="w-full bg-orange-400 text-dark py-2 rounded-xl hover:bg-orange-500 cursor-pointer">Купи сега</button>

                    <div className="grid grid-cols-2 gap-4 items-start text-gray-700">
                        <div className="flex flex-col gap-0 self-start">
                            <p className="text-gray-500 text-xs">Плащане</p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="text-xs text-gray-700">наложен платеж</p>
                            <p className="text-xs text-gray-700">банков път</p>
                        </div>
                    </div>


                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-10 grid grid-cols-12 gap-8">
                {/* Left Column - Review Form */}
                {email && showForm &&
                    (
                        <div className="col-span-12 md:col-span-4 p-2">
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-3">Оставете отзив</h3>
                            <form className="mt-4 space-y-3" onSubmit={handleReviewForm}>
                                {/* <input type="text" placeholder="Вашето име" name="reviewSender" className="w-full p-2 border rounded h-8 border-gray-300 bg-gray-200 cursor-not-allowed opacity-50" defaultValue={email} readOnly /> */}
                                <h1>{email}</h1>

                                <div className={`${styles.rate} justify-start mb-0`}>
                                    <input
                                        type="radio"
                                        id="star5"
                                        name="rate"
                                        value="5"
                                        checked={formValues.rate === 5}
                                        onChange={(e) => setFormValues({ ...formValues, rate: Number(e.target.value) })}
                                    />
                                    <label htmlFor="star5" title="5 stars">★</label>

                                    <input
                                        type="radio"
                                        id="star4"
                                        name="rate"
                                        value="4"
                                        checked={formValues.rate === 4}
                                        onChange={(e) => setFormValues({ ...formValues, rate: Number(e.target.value) })}
                                    />
                                    <label htmlFor="star4" title="4 stars">★</label>

                                    <input
                                        type="radio"
                                        id="star3"
                                        name="rate"
                                        value="3"
                                        checked={formValues.rate === 3}
                                        onChange={(e) => setFormValues({ ...formValues, rate: Number(e.target.value) })}
                                    />
                                    <label htmlFor="star3" title="3 stars">★</label>

                                    <input
                                        type="radio"
                                        id="star2"
                                        name="rate"
                                        value="2"
                                        checked={formValues.rate === 2}
                                        onChange={(e) => setFormValues({ ...formValues, rate: Number(e.target.value) })}
                                    />
                                    <label htmlFor="star2" title="2 stars">★</label>

                                    <input
                                        type="radio"
                                        id="star1"
                                        name="rate"
                                        value="1"
                                        checked={formValues.rate === 1}
                                        onChange={(e) => setFormValues({ ...formValues, rate: Number(e.target.value) })}
                                    />
                                    <label htmlFor="star1" title="1 star">★</label>

                                </div>
                                {formFeedback.rate && <p className="text-red-500 text-xs">{formFeedback.rate}</p>}

                                <input
                                    type="text"
                                    name="reviewTite"
                                    placeholder="Заглавие на отзива"
                                    className="w-full p-2 border rounded h-8 border-gray-300 mb-1 mt-3"
                                    value={formValues.reviewTite}
                                    onChange={(e) => setFormValues({ ...formValues, reviewTite: e.target.value })}
                                />
                                {formFeedback.reviewTite && <p className="text-red-500 text-xs">{formFeedback.reviewTite}</p>}

                                <textarea
                                    placeholder="Вашият отзив..."
                                    name="reviewDescription"
                                    rows="3"
                                    className="w-full p-2 border rounded border-gray-300 mb-0 mt-3"
                                    value={formValues.reviewDescription}
                                    onChange={(e) => setFormValues({ ...formValues, reviewDescription: e.target.value })}
                                >
                                </textarea>
                                {formFeedback.reviewDescription && <p className="text-red-500 text-xs">{formFeedback.reviewDescription}</p>}

                                <div className="flex justify-between gap-2 mt-5">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
                                    >
                                        {isReviewed ? 'Редактирайте отзива' : 'Публикувайте отзив'}
                                    </button>

                                    {/* Cancel Button */}
                                    {isReviewed && (
                                        <button
                                            type="button"
                                            onClick={cancelReviewClickHandle}
                                            className="w-full bg-gray-300 text-black p-2 rounded hover:bg-gray-400 cursor-pointer"
                                        >
                                            Отказ
                                        </button>
                                    )}

                                </div>
                            </form>
                        </div>
                    )
                }


                {/* Right Column - Reviews */}
                <div className="col-span-12 md:col-span-8">
                    <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-5 pl-4">Отзиви</h3>
                    <div className="mt-2 space-y-4">
                        {getAll.filter(r => r.postId === getOne._id).length === 0 ? (
                            <h1 className="text-center text-gray-500">Няма налични отзиви за този продукт.</h1>
                        ) : (
                            getAll
                                .filter(review => review.postId === getOne._id)
                                .sort((a, b) => b._createdOn - a._createdOn)
                                .map((review, index, filtered) => (
                                    <div key={index}>
                                        <div className="grid grid-cols-12 gap-4 p-4 items-center">
                                            <p className="col-span-3 font-bold text-gray-800 ">{review.reviewSender}</p>

                                            <p className="col-span-3 text-yellow-500 flex gap-1 justify-center ">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={i < review.rate ? 'text-yellow-500' : 'text-gray-300'}>
                                                        ★
                                                    </span>
                                                ))}
                                            </p>

                                            <div className={`col-span-${review._ownerId === authorId ? '4' : '6'}`}>
                                                <p className="font-semibold text-gray-900">{review.reviewTite}</p>
                                                <p className="text-gray-600">{review.reviewDescription}</p>
                                            </div>

                                            {review._ownerId === authorId && (
                                                <div className="col-span-2 flex flex-col md:flex-row gap-2 justify-end">
                                                    <button
                                                        onClick={() => editReviewClickHandle(review)}
                                                        className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500 cursor-pointer"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteReviewClickHandle(review._id)}
                                                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                                                    >
                                                        <FaRegTrashAlt />
                                                    </button>
                                                </div>
                                            )}

                                        </div>

                                        {index < filtered.length - 1 && <hr className="border-gray-300" />}
                                    </div>

                                ))
                        )}
                    </div>
                </div>

            </div>

        </div >
    );
}
