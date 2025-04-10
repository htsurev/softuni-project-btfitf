import { Link } from "react-router-dom";
import { useState } from 'react'
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import { useDelete, useGetAll } from "../../../api/adminApi";
import useAuth from "../../../hooks/useAuth";

export default function AdminStore() {
    const { getAll, refreshData } = useGetAll("store");
    const [showImage, setShowImage] = useState(null)
    const { deleteData } = useDelete("store");
    const { _id: ownerIdOfPost } = useAuth();

    const onDeleteItemClickHandler = async (item) => {
        const hasConfirm = confirm(`Изтриване на артикул - ${item.itemTitle}`);
        if (!hasConfirm) {
            return;
        }

        await deleteData(item._id);
        refreshData();
    }

    return (
        <div className="p-8">
            <div className="flex items-center w-full max-w-8xl mb-8 border-b border-gray-300 pb-10 space-x-4">
                <h1 className="text-3xl font-bold text-gray-700">Магазин</h1>

                <Link to="/admin/store/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg shadow-md transition duration-300">
                    + Добави артикул
                </Link>
            </div>
            {/* <h1 className="text-3xl font-semibold text-center mb-8">Магазин</h1> */}
            {getAll.length === 0 ? (
                <p className="text-center text-gray-600">В момента няма налични артикули.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {getAll
                        .sort((a, b) => b._createdOn - a._createdOn)
                        .map((item) => (
                            <div
                                key={item._id}
                                className={`border border-gray-300 rounded-lg shadow-lg p-4 text-center transition-transform transform hover:scale-105 hover:shadow-xl ${item.itemStatus === "off" ? "bg-red-100 border border-red-500" : "bg-green-50 border border-green-500"}`}
                            >
                                <div className="relative w-full h-40 mb-4">
                                    <img
                                        src={item.itemImgUrl !== ""
                                            ? item.itemImgUrl
                                            : "/alert-images/noimage.jpg"
                                        }
                                        alt={item.itemTitle}
                                        onClick={() => setShowImage(item.itemImgUrl)}
                                        className="absolute inset-0 w-full h-full object-contain rounded-lg cursor-pointer"
                                    />
                                </div>

                                <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">{item.itemTitle}</h3>

                                {ownerIdOfPost === item._ownerId && (
                                    <div className="grid grid-cols-2 border-t pt-3 border-gray-300 text-sm text-gray-700 divide-x divide-gray-300 h-12">
                                        <div className="flex items-center justify-center">
                                            <Link
                                                to={`/admin/store/${item._id}/edit`}
                                                className="w-full h-full bg-gray-300 hover:bg-blue-700 text-dark hover:text-white rounded-lg shadow-md transition duration-300 mx-2 cursor-pointer flex items-center justify-center"
                                            >
                                                edit
                                            </Link>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <button
                                                onClick={() => onDeleteItemClickHandler(item)}
                                                className="w-full h-full bg-red-300 hover:bg-red-700 text-dark hover:text-white rounded-lg shadow-md transition duration-300 mx-2 cursor-pointer">
                                                delete
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </div>
                        ))}
                </div>
            )}
            <Dialog open={!!showImage} onClose={() => setShowImage(null)} className="relative z-10">
                <DialogBackdrop className="fixed inset-0 bg-black/70" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="max-w-3xl w-full">
                        <img
                            src={showImage}
                            alt="Product"
                            className="w-full rounded-lg"
                            onClick={() => setShowImage(null)}
                        />
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}
