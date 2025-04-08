import { Link } from "react-router-dom";
import { useGetAll } from "../../api/adminApi";

export default function Store() {
    const { getAll } = useGetAll("store");

    return (
        <div className="p-8">
            {/* <h1 className="text-3xl font-semibold text-center mb-8">Магазин</h1> */}
            {getAll.filter(item => item.itemStatus !== "off").length === 0 ? (
                <p className="text-center text-gray-600">В момента няма налични артикули.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {getAll
                        .filter(item => item.itemStatus !== "off")
                        .map((item) => (
                            <div
                                key={item._id}
                                className="bg-white rounded-lg shadow-lg text-center p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
                            >
                                <div className="relative w-full h-60 mb-4">
                                    <Link to={`/store/${item._id}/details`}>
                                        <img
                                            src={item.itemImgUrl || "/alert-images/noimage.jpg"}
                                            alt={item.itemTitle}

                                            className="absolute inset-0 w-full h-full object-contain rounded-lg cursor-pointer "
                                        />
                                    </Link>
                                </div>
                                <Link
                                    to={`/store/${item._id}/details`}
                                    className="font-semibold text-lg text-gray-800 hover:underline font-semibold"
                                >
                                    {item.itemTitle}
                                </Link>
                            </div>
                        ))}
                </div>
            )}


        </div>
    );
}
