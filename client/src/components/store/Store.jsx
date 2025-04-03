import { Link } from "react-router-dom";
import { useState } from 'react'
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import { useGetAll } from "../../api/adminApi";


// Sample data for the items
// const items = [
//     {
//         id: 1,
//         name: "item 1",
//         description: "Brief description of item 1.",
//         imageUrl: null,
//         link: "/store/item-1",
//     },
//     {
//         id: 2,
//         name: "item 2",
//         description: "Brief description of item 2.",
//         imageUrl: "https://itfbulgaria.com/wp-content/uploads/2022/03/itf-universal-belt-dobok-410x430.jpg",
//         link: "/store/item-2",
//     },
//     {
//         id: 3,
//         name: "item 3",
//         description: "Brief description of item 3.",
//         imageUrl: "https://itfbulgaria.com/wp-content/uploads/2022/06/nazybnik-za-sparing-n-410x430.jpg",
//         link: "/store/item-3",
//     },
//     {
//         id: 4,
//         name: "item 3",
//         description: "Brief description of item 3.",
//         imageUrl: null,
//         link: "/store/item-3",
//     },
//     {
//         id: 5,
//         name: "item 3",
//         description: "Brief description of item 3.",
//         imageUrl: null,
//         link: "/store/item-3",
//     },
// ];

export default function Store() {
    const { getAll } = useGetAll("store");

    const [showImage, setShowImage] = useState(null)

    return (
        <div className="p-8">
            {/* <h1 className="text-3xl font-semibold text-center mb-8">Магазин</h1> */}
            {getAll.filter(item => item.itemStatus !== "off").length === 0 ? (
                <p className="text-center text-gray-600">В момента няма налични артикули.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {getAll
                        .filter(item => item.itemStatus !== "off") // Exclude items with status "off"
                        .map((item) => (
                            <div
                                key={item._id}
                                className="bg-white rounded-lg shadow-lg p-4 text-center transition-transform transform hover:scale-105 hover:shadow-xl"
                            >
                                <div className="relative w-full h-60 mb-4">
                                    <img
                                        src={item.itemImgUrl || "/public/alert-images/noimage.jpg"}
                                        alt={item.itemTitle}
                                        onClick={() => setShowImage(item.itemImgUrl)}
                                        className="absolute inset-0 w-full h-full object-contain rounded-lg cursor-pointer"
                                    />
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

            <Dialog open={!!showImage} onClose={() => setShowImage(null)} className="relative z-10">
                <DialogBackdrop className="fixed inset-0 bg-black/70" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="max-w-3xl w-full">
                        <img
                            src={showImage}
                            alt="item"
                            className="w-full rounded-lg"
                            onClick={() => setShowImage(null)}
                        />
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}
