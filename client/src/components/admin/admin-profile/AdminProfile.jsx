import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

import { FaRegUser } from "react-icons/fa";

export default function AdminProfile() {
    const { email, fullName } = useAuth();

    return (
        <div className="profile-container p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-8">
            <h1 className="text-2xl font-semibold mb-4 text-center">Вашият профил</h1>
            <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {/* <img src="https://via.placeholder.com/150" alt="Profile" className="w-full h-full object-cover" /> */}
                    <FaRegUser />
                </div>
                <div>
                    <p className="text-lg font-medium text-gray-800"><strong>Name: </strong>{fullName}</p>
                    <p className="text-lg text-gray-600"><strong>Email: </strong>{email}</p>
                </div>
            </div>

            <div className="flex space-x-4 justify-center border-t border-gray-300 pt-4">
                <Link to="/admin/profile/edit" className="bg-blue-500 text-white px-4 py-2 rounded-t-md w-full hover:bg-blue-600 transition duration-300 text-sm">
                    редактирай
                </Link>
                <div className="border-l border-gray-300 h-8"></div>
                <Link to="#" className="bg-red-500 text-white px-4 py-2 rounded-t-md w-full hover:bg-red-600 transition duration-300 text-sm">
                    изтриване на акаунт
                </Link>
            </div>

        </div>

    );
}