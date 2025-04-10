import { Link } from "react-router-dom";
import { useGetAll } from "../../api/adminApi";

export default function Store() {
    const { getAll } = useGetAll("store");

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {getAll.filter(item => item.itemStatus !== "off").length === 0 ? (
                <p className="text-center text-gray-600">В момента няма налични артикули.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 ">
                    {getAll
                        .filter(item => item.itemStatus !== "off")
                        .map((item) => (
                            <div
                                key={item._id}
                                className="bg-white border border-gray-200 "
                            >
                                <div className="relative w-full h-48 mb-0">
                                    <Link to={`/store/${item._id}/details`}>
                                        <img
                                            src={item.itemImgUrl || "/alert-images/noimage.jpg"}
                                            alt={item.itemTitle}
                                            className="w-full h-48 object-cover cursor-pointer px-0 py-0"
                                        />
                                    </Link>
                                </div>
                                <div className="px-1 pb-4 border-t border-gray-200 pt-2">
                                    <Link
                                        to={`/store/${item._id}/details`}
                                        className="font-semibold text-md text-gray-600 hover:text-orange-700 line-clamp-3"
                                    >
                                        {item.itemTitle}
                                    </Link>
                                    <p className="text-dark text-lg mt-2 font-semibold">
                                        {item.sizeData && Object.keys(item.sizeData).length > 0 ? (
                                            (() => {
                                                const prices = Object.values(item.sizeData).map(size => parseFloat(size.price));
                                                const min = Math.min(...prices).toFixed(2);
                                                const currency = Object.values(item.sizeData)[0]?.currency || 'лв.'; // Безопасно достъпване

                                                return (
                                                    <span className="text-gray-800 ml-2">
                                                        <span className="text-2xl">{Math.floor(min)}</span>
                                                        <sup className="text-md">{min.split('.')[1]}</sup>
                                                        <span className="text-base ml-1">{currency}</span>
                                                    </span>
                                                );
                                            })()
                                        ) : (
                                            <span className="text-gray-800 ml-2">
                                                <span className="text-2xl">{Math.floor(item.itemPrice)}</span>
                                                {item.itemPrice.toString().includes('.') && (
                                                    <sup className="text-md">{item.itemPrice.toFixed(2).toString().split('.')[1]}</sup>
                                                )}
                                                <span className="text-base">{item.currency}</span>
                                            </span>
                                        )}
                                    </p>

                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );

}
