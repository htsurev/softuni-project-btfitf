// const posts = [
//     {
//         id: 1,
//         postStatus: 'Active',
//         title: 'Изпит за черни колани',
//         description:
//             'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
//         publishedDate: 'Mar 16, 2020',
//         category: "новина или събитие",
//         imageUrl:
//             'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         eventDate: 'Mar 16, 2020',
//         eventLocation: 'Благоевград, България',
//     },
//     {
//         id: 2,
//         postStatus: 'Active',
//         title: 'Изпит за черни колани',
//         description:
//             'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
//         publishedDate: 'Mar 16, 2020',
//         category: "новина или събитие",
//         imageUrl:
//             'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         eventDate: '',
//         eventLocation: '',
//     },
//     {
//         id: 3,
//         postStatus: 'Active',
//         title: 'Изпит за черни колани',
//         description:
//             'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
//         publishedDate: 'Mar 16, 2020',
//         category: "новина или събитие",
//         imageUrl:
//             'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         eventDate: 'Mar 16, 2020',
//         eventLocation: 'Благоевград, България',
//     },
//     {
//         id: 4,
//         postStatus: 'Active',
//         title: 'Изпит за черни колани',
//         description:
//             'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
//         publishedDate: 'Mar 16, 2020',
//         category: "новина или събитие",
//         imageUrl:
//             'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         eventDate: 'Mar 16, 2020',
//         eventLocation: 'Благоевград, България',
//     },

import { Link } from "react-router";
import { useGetAll } from "../../api/adminApi";

// ];

// import { useGetAll } from "../../../api/adminApi";

export default function News() {

    const { getAll } = useGetAll("news");

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
        <div className="bg-white pb-24 sm:pb-32 pt-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Новини и събития</h2>
                    {/* <p className="mt-2 text-lg/8 text-gray-600">Learn how to grow your business with our expert advice.</p> */}
                </div>

                {getAll.length === 0 ? (
                    <p className="text-center text-gray-500 col-span-full">Няма налични новини и събития.</p>
                ) : (
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {getAll
                            .filter((news) => news.postStatus === "on")
                            .sort((a, b) => b._createdOn - a._createdOn)
                            .map((post) => (
                                <article key={post._id} className=" max-w-xl flex-col items-start justify-between bg-sky-50 rounded-xl px-4 py-4 min-h-[400px] ">
                                    {post.newsType === "event" && (
                                        <div className="flex items-center gap-x-4 text-xs">
                                            <time dateTime={post.eventDate} className="text-gray-500">
                                                {formattedDate(post.eventDate)}
                                            </time>
                                            <span className="relative rounded-full bg-white border px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                                {post.eventLocation}
                                            </span>
                                        </div>
                                    )}

                                    <div className="group relative flex-1 flex flex-col gap-y-4 w-full">
                                        <h3 className="mt-2 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600 line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <div className="flex justify-center items-center w-full h-50 bg-white rounded-md overflow-hidden">
                                            {post.imageUrl ? (
                                                <img
                                                    alt=""
                                                    src={post.imageUrl}
                                                    className="object-contain w-full h-full"
                                                />
                                            ) : (
                                                <div className="text-gray-400">No Image</div>
                                            )}
                                        </div>
                                        <Link to={`/news/${post._id}/details`}>
                                            <p className="mt-0 line-clamp-3 text-sm/6 text-gray-900">{post.description}</p>
                                        </Link>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="text-sm/6">
                                            <p className="text-gray-600 text-xs">публикувано на {formattedDate(post.publishedDate)}</p>
                                        </div>

                                        {/* <a href="#" className="text-xs bg-blue-200 text-dark px-3 py-1 rounded-md hover:bg-blue-600 transition">...още</a> */}

                                    </div>
                                </article>
                            ))}
                    </div>
                )}
            </div>
        </div>

    );
}