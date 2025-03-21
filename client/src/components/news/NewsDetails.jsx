import { useParams } from "react-router";
import { useGetOne } from "../../api/adminApi";


export default function NewsDetails() {
    const { newsId } = useParams();
    const { getOne } = useGetOne("news", newsId);

    return (
        <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:pt-16 sm:pb-0 lg:overflow-visible lg:px-0">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            {getOne.newsType === "event" && (
                                <div className="flex items-center gap-x-4 text-sm mb-4">
                                    <span className="text-indigo-600 font-semibold">
                                        {getOne.eventDate}
                                    </span>
                                    <span className="relative rounded-full bg-gray-50 px-4 py-1.5 font-medium text-gray-600 border hover:bg-gray-100">
                                        {getOne.eventLocation}
                                    </span>
                                </div>
                            )}

                            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                                {getOne.title}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="-mt-0 -ml-0 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-5 lg:row-start-1 lg:overflow-hidden">
                    <img
                        alt=""
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
                                28 Март, 2025
                            </span>
                        </div>
                    </div>
                </div>
            </div>


            {/* <div className="bg-gray-200 flex flex-col justify-center items-center p-8 text-white mt-10">

                <div className="text-center mb-8 ">
                    <h1 className="text-4xl font-bold text-gray-700 border-b border-gray-900">Таекуон-До Клубове</h1>
                    <p className="text-xl mt-2 text-gray-500">Нашите членове</p>
                </div>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full max-w-7xl justify-center place-items-center ">

                    {getAll.map(club => (
                        <div key={club._id} className="p-0 text-center flex flex-col items-center">
                            <img
                                src={club.imageUrl}
                                alt="Contact"
                                className="rounded-full mb-4 w-30"
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-10 mb-15">
                    <Link to="/clubs" className="bg-green-600 hover:bg-green-900 text-white font-semibold py-2 px-8 text-lg rounded transition duration-300">
                        Виж всички
                    </Link>
                </div>

            </div> */}

        </div>
    );
}
