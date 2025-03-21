import { Link } from "react-router";
import { useDelete, useGetAll } from "../../../api/adminApi";

export default function AdminClubs() {
    const { getAll, refreshData } = useGetAll("clubs");
    const { deleteData } = useDelete("clubs");
    
    const onDeleteClubClickHandler = async (club) => {
        const hasConfirm = confirm(`Изтриване на клуб ${club.clubName}`);
        if (!hasConfirm) {
            return;
        }

        await deleteData(club._id);
        refreshData();
    }

    return (
        <div className="flex flex-col justify-center items-center p-8 text-white mt-10">
            <div className="flex items-center w-full max-w-7xl mb-8 border-b border-gray-300 pb-10 space-x-4">
                <h1 className="text-3xl font-bold text-gray-700">Таекуон-До Клубове</h1>

                <Link to="/admin/clubs/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg shadow-md transition duration-300">
                    + Добави нов клуб
                </Link>
            </div>

            {getAll.length === 0 ? (
                    <p className="text-left text-gray-500 col-span-full">Няма налични новини и събития.</p>
                ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-7xl justify-center">
                {getAll.map(club => (
                    <div key={club._id} className="bg-white rounded-xl p-4 text-left shadow-md flex flex-col justify-between h-full">

                        <div className="flex justify-between items-center mb-4">
                            <div className="border w-4/6">
                                <h4 className="font-semibold text-gray-900 mb-2">{club.clubName}</h4>
                                <p className="text-gray-700 text-sm mb-2">{club.city}</p>
                                <p className="text-gray-700 text-sm mb-2">{club.address}</p>
                                <p className="text-gray-700 text-sm mb-2">{club.phoneNumberOne} {club.phoneNumberTwo}</p>
                                <p className="text-gray-700 text-sm mb-2">{club.email}</p>
                            </div>
                            <div className="border w-auto">
                                <img
                                    src={club.imageUrl}
                                    alt="Club"
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 border-t pt-3 border-gray-300 text-sm text-gray-700 divide-x divide-gray-300 h-12">
                            <div className="flex items-center justify-center">
                                <Link
                                    to={`/admin/clubs/${club._id}/edit`}
                                    className="w-full h-full bg-gray-300 hover:bg-blue-700 text-dark hover:text-white rounded-lg shadow-md transition duration-300 mx-2 cursor-pointer flex items-center justify-center"
                                >
                                    edit
                                </Link>
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    onClick={() => onDeleteClubClickHandler(club)}
                                    className="w-full h-full bg-red-300 hover:bg-red-700 text-dark hover:text-white rounded-lg shadow-md transition duration-300 mx-2 cursor-pointer">
                                    delete
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
            )}
        </div>
    );
}