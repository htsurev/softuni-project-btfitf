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


export default function News() {
    return (
        <div className="bg-white pb-24 sm:pb-32 pt-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Latest news</h2>
                    <p className="mt-2 text-lg/8 text-gray-600">Learn how to grow your business with our expert advice.</p>
                </div>

                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
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
                        </article>
                    ))}
                </div>
            </div>
        </div>

    );
}