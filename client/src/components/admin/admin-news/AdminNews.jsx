import { Link } from "react-router";

const posts = [
    {
        id: 1,
        postStatus: 'Active',
        title: 'Изпит за черни колани',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        publishedDate: 'Mar 16, 2020',
        category: "новина или събитие",
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        eventDate: 'Mar 16, 2020',
        eventLocation: 'Благоевград, България',
    },
    {
        id: 2,
        postStatus: 'Active',
        title: 'Изпит за черни колани',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        publishedDate: 'Mar 16, 2020',
        category: "новина или събитие",
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        eventDate: '',
        eventLocation: '',
    },
    {
        id: 3,
        postStatus: 'Active',
        title: 'Изпит за черни колани',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        publishedDate: 'Mar 16, 2020',
        category: "новина или събитие",
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        eventDate: 'Mar 16, 2020',
        eventLocation: 'Благоевград, България',
    },
    {
        id: 4,
        postStatus: 'Active',
        title: 'Изпит за черни колани',
        description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
        publishedDate: 'Mar 16, 2020',
        category: "новина или събитие",
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        eventDate: 'Mar 16, 2020',
        eventLocation: 'Благоевград, България',
    },

];


export default function AdminNews() {
    return (
        <div className="flex flex-col justify-center items-center p-8 text-white mt-10">
            <div className="mx-auto max-w-7xl">
                <div className="flex items-center w-full max-w-7xl mb-8 border-b border-gray-300 pb-10 space-x-4 px-8">
                    <h1 className="text-3xl font-bold text-gray-700">Новини и Събития</h1>

                    <Link to="/admin/news/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg shadow-md transition duration-300">
                        + Добави
                    </Link>
                </div>

                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10  lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post) => (
                        <article key={post.id} className=" max-w-xl flex-col items-start justify-between bg-sky-50 rounded-xl px-4 py-4 min-h-[400px] "> {/* Fixed min-height */}
                            <div className="flex items-center gap-x-4 text-xs">
                                <time dateTime={post.eventDate} className="text-gray-500">
                                    {post.eventDate}
                                </time>
                                <a href="#" className="relative rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                    {post.eventLocation}
                                </a>
                            </div>

                            <div className="group relative flex-1 flex flex-col gap-y-4 w-full">
                                <h3 className="mt-2 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
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

                                <p className="mt-0 line-clamp-3 text-sm/6 text-gray-600">{post.description}</p>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <div className="text-sm/6">
                                    <p className="text-gray-600 text-xs">публикувано на {post.publishedDate}</p>
                                </div>

                                {/* <a href="#" className="text-xs bg-blue-200 text-dark px-3 py-1 rounded-md hover:bg-blue-600 transition">...още</a> */}

                            </div>

                            <div className="grid grid-cols-2 border-t pt-3 mt-5 border-gray-300 text-sm text-gray-700 divide-x divide-gray-300 h-12">
                                <div className="flex items-center justify-center">
                                    <a
                                        href={`/admin/clubs/12e/edit`}
                                        className="w-full h-full bg-gray-300 hover:bg-blue-700 text-dark hover:text-white rounded-lg shadow-md transition duration-300 mx-2 cursor-pointer flex items-center justify-center"
                                    >
                                        edit
                                    </a>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        // onClick={() => onDeleteClubClickHandler(club)}
                                        className="w-full h-full bg-red-300 hover:bg-red-700 text-dark hover:text-white rounded-lg shadow-md transition duration-300 mx-2 cursor-pointer">
                                        delete
                                    </button>
                                </div>
                            </div>

                        </article>
                    ))}
                </div>
            </div>
        </div>

    );
}