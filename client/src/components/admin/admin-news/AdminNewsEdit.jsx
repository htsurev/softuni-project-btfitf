import { useNavigate, useParams } from "react-router";
import { useEdit, useGetOne } from "../../../api/adminApi";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";

export default function AdminNewsEdit() {
    const navigate = useNavigate();
    const { newsId } = useParams();
    const { getOne } = useGetOne("news", newsId);
    const { edit } = useEdit("news");


    const { email } = useContext(UserContext);
    const [newsType, setNewsType] = useState(getOne.newsType);

    useEffect(() => {
        if (getOne) {
            setNewsType(getOne.newsType);
        }
    }, [getOne]);

    const editNewsForm = async (formData) => {
        const data = Object.fromEntries(formData);

        const todaysDate = new Date();
        const formattedDate = todaysDate.toISOString().split('T')[0];

        data.newsType = newsType;
        data.eventDate = formData.get("eventDate") || new Date().toISOString().split('T')[0];
        data.postStatus = formData.get("postStatus") || "off";
        data.publishedDate = formattedDate;
        data.publishedBy = email;

        await edit(newsId, data)

        navigate('/admin/news')
    };

    // Handle radio button change
    const handleNewsTypeChange = (e) => {
        setNewsType(e.target.value);
    };

    return (
        <div className="flex items-center justify-center min-h-screen py-10">
            <form action={editNewsForm} className="w-full max-w-2xl">
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-2xl font-semibold text-gray-900">Редактиране на</h2>
                        <p className="mt-2 text-sm text-gray-600 border-b border-gray-900/10">* задължителни полета</p>

                        <div className="mt-6 flex items-center gap-x-6">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="news"
                                    name="newsType"
                                    value="news"
                                    checked={newsType === "news"}
                                    onChange={handleNewsTypeChange}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label htmlFor="news" className="ml-2 text-sm text-gray-600">Новина</label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="event"
                                    name="newsType"
                                    value="event"
                                    checked={newsType === "event"}
                                    onChange={handleNewsTypeChange}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label htmlFor="event" className="ml-2 text-sm text-gray-600">Събитие</label>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            {/* Image Section */}
                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-900">
                                    Снимка
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <div className="mt-4 flex text-sm text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>

                            {/* Image URL Section */}
                            <div className="sm:col-span-full">
                                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-900">
                                    Снимка URL
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="imageUrl"
                                        name="imageUrl"
                                        type="text"
                                        placeholder="https://..."
                                        defaultValue={getOne.imageUrl}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                    />
                                </div>
                            </div>

                            {/* Title Section */}
                            <div className="sm:col-span-full">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-900">
                                    Заглавие *
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        placeholder="Заглавие"
                                        defaultValue={getOne.title}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                    />
                                </div>
                            </div>

                            {/* Description Section */}
                            <div className="sm:col-span-full">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                                    Описание *
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Описание"
                                        defaultValue={getOne.description}
                                        className="block w-full h-50 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                    />
                                </div>
                            </div>

                            {/* Event Specific Fields */}
                            {newsType === "event" && (
                                <>
                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="eventLocation" className="block text-sm font-medium text-gray-900">
                                            Град, Държава *
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="eventLocation"
                                                name="eventLocation"
                                                type="text"
                                                placeholder="Град, Държава"
                                                defaultValue={getOne.eventLocation}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="eventDate" className="block text-sm font-medium text-gray-900">
                                            Дата *
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="eventDate"
                                                name="eventDate"
                                                type="date"
                                                defaultValue={getOne.eventDate}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>

                    {/* Checkbox and Submit Button */}
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="postStatus"
                                name="postStatus"
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label htmlFor="postStatus" className="ml-2 text-sm text-gray-600">Публикувай</label>
                        </div>

                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            редактирай
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
}
