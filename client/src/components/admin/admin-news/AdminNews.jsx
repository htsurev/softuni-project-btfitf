import { Link } from "react-router";
import { useDelete, useGetAll } from "../../../api/adminApi";

export default function AdminNews() {
    const { getAll } = useGetAll("news");
    const { deleteData } = useDelete("news");

    const onDeleteNewsClickHandler = async (news) => {
        const hasConfirm = confirm(`Изтриване на новина - ${news.title}`);
        if (!hasConfirm) {
            return;
        }

        await deleteData(news._id);
    }

    // Formatted date to Ex.: 28 Март, 2025
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
        <div className="flex flex-col justify-center items-center p-8 mt-10">
            <div className="mx-auto max-w-7xl">
                <div className="flex items-center w-full max-w-7xl mb-8 border-b border-gray-300 pb-10 space-x-4 px-8">
                    <h1 className="text-3xl font-bold text-gray-700">Новини и Събития</h1>

                    <Link to="/admin/news/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg shadow-md transition duration-300">
                        + Добави
                    </Link>
                </div>

                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10  lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {getAll
                        .sort((a, b) => b._createdOn - a._createdOn)
                        .map((news) => (
                            <article key={news.id} className={`max-w-xl flex-col items-start justify-between rounded-xl px-4 py-4 min-h-[400px] ${news.postStatus === "off" ? "border-2 border-red-500" : "border-2 border-green-500"}`}>
                                {news.newsType === "event" && (
                                    <div className="flex items-center gap-x-4 text-xs">
                                        <time dateTime={news.eventDate} className="text-gray-500">
                                            {formattedDate(news.eventDate)}
                                        </time>
                                        <span href="#" className="relative rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 border">
                                            {news.eventLocation}
                                        </span>
                                    </div>
                                )}


                                <div className="group relative flex-1 flex flex-col gap-y-4 w-full">
                                    <h3 className="mt-2 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                                        {news.title}
                                    </h3>

                                    <div className="flex justify-center items-center w-full h-50 bg-sky-100 rounded-md overflow-hidden">
                                        {news.imageUrl ? (
                                            <img
                                                alt=""
                                                src={news.imageUrl}
                                                className="object-contain w-full h-full"
                                            />
                                        ) : (
                                            <div className="text-gray-400">No Image</div>
                                        )}
                                    </div>

                                    <p className="mt-0 line-clamp-3 text-sm/6 text-gray-900">{news.description}</p>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <div className="text-sm/6">
                                        <p className="text-gray-600 text-xs">публикувано на {formattedDate(news.publishedDate)}</p>
                                    </div>

                                    <p className="text-xs bg-blue-100 text-dark px-3 py-1 rounded-md hover:bg-blue-400 hover:text-white transition"><span className="text-dark-800 mr-2">от</span>{news.publishedBy}</p>
                                    {/* <a href="#" className="text-xs bg-blue-200 text-dark px-3 py-1 rounded-md hover:bg-blue-600 transition">...още</a> */}

                                </div>

                                <div className="grid grid-cols-2 border-t pt-3 mt-5 border-gray-300 text-sm text-gray-700 divide-x divide-gray-300 h-12">
                                    <div className="flex items-center justify-center">
                                        <Link
                                            to={`/admin/news/${news._id}/edit`}
                                            className="w-full h-full bg-gray-300 hover:bg-blue-700 text-dark hover:text-white rounded-lg shadow-md transition duration-300 mx-2 cursor-pointer flex items-center justify-center"
                                        >
                                            edit
                                        </Link>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <button
                                            onClick={() => onDeleteNewsClickHandler(news)}
                                            className="w-full h-full bg-red-300 hover:bg-red-700 text-dark hover:text-white rounded-lg shadow-md transition duration-300 mx-2 cursor-pointer">
                                            delete
                                        </button>
                                    </div>
                                </div>

                            </article>
                        ))}
                </div>
            </div>
        </div >

    );
}