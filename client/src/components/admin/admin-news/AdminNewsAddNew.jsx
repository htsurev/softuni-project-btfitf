import { useNavigate } from "react-router";
import adminServices from "../../../api/adminServices";



export default function AdminNewsAddNew() {
    const navigate = useNavigate();

    const addNewsEventsForm = async (formData) => {
        const data = Object.fromEntries(formData);

        // await adminServices.create(data);

        // navigate('/admin/news');

        const newsType = formData.get("newsType");
        const eventDate = formData.get("eventDate");
        const postStatus = formData.get("postStatus");
        const publishedDate = new Date();
        const formattedDate = publishedDate.toISOString().split('T')[0];

        data.newsType = newsType;
        data.eventDate = eventDate;
        data.postStatus = postStatus;
        data.publishedDate = formattedDate;

        console.log(data);


    };

    return (
        <div className="flex flex-col justify-center items-center text-white my-10">
            <form action={addNewsEventsForm}>
                <div className="space-y-12">

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-2xl/7 font-semibold text-gray-900">Добавяне на</h2>

                        <div className="mt-2 flex items-center gap-x-6">
                            {/* Radio button for News */}
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="news"
                                    name="newsType"
                                    value="news"
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label htmlFor="news" className="ml-2 text-sm text-gray-600">Новина</label>
                            </div>

                            {/* Radio button for Event */}
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="event"
                                    name="newsType"
                                    value="event"
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label htmlFor="event" className="ml-2 text-sm text-gray-600">Събитие</label>
                            </div>
                        </div>

                        <p className="mt-4 text-sm/6 text-gray-600 border-b border-gray-900/10">* задължителни полета</p>


                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">

                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                                    Снимка
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <div className="mt-4 flex text-sm/6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                {/* <input id="file-upload" name="file-upload" type="file" className="sr-only" /> */}
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="imageUrl" className="block text-sm/6 font-medium text-gray-900">
                                    Снимка URL
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="imageUrl"
                                        name="imageUrl"
                                        type="text"
                                        placeholder="https://..."
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                                    Заглавие *
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        placeholder="Заглавие"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                                    Описание *
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        type="text"
                                        placeholder="Описание"
                                        className="block w-full h-50 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1 displayForEvents">
                                <label htmlFor="eventLocation" className="block text-sm/6 font-medium text-gray-900">
                                    Град, Държава *
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="eventLocation"
                                        name="eventLocation"
                                        type="text"
                                        placeholder="Град, Държава"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 displayForEvents">
                                <label htmlFor="eventDate" className="block text-sm/6 font-medium text-gray-900">
                                    Дата *
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="eventDate"
                                        name="eventDate"
                                        type="date"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>


                        </div>
                    </div>


                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    {/* Checkbox */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="postStatus"
                            name="postStatus"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="postStatus" className="ml-2 text-sm text-gray-600">Публикувай</label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Добави
                    </button>
                </div>

            </form>
        </div>
    );
}