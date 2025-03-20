import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

export default function AdminMenu() {
    const { email } = useAuth();

    return (
        <div className="hidden lg:block lg:w-1/6 bg-gray-200 p-0 rounded-lg shadow-md mt-9 px-0 ">
            <div className="hidden lg:flex lg:flex-col lg:w-1/6 bg-gray-200 pl-3 fixed top-30 left-0 ">

                {/* User Section */}
                <div className="flex flex-col items-start mb-5 px-0">
                    <Link to="/admin/profile" className="flex items-center space-x-2 text-gray-800 hover:text-blue-600 font-semibold transition duration-300 mb-3">
                        <FaRegUser />
                        
                        <span>{email}</span>
                    </Link>
                    <hr className="w-full border-t-2 border-gray-300" />
                </div>

                {/* Menu List */}
                <ul className="flex flex-col space-y-2 w-full pr-2">
                    <li className="bg-gray-100 hover:bg-gray-300 transition duration-300 rounded-md w-full">
                        <Link
                            to="/admin/news"
                            className="block px-4 py-2 text-gray-800 hover:text-blue-600 transition duration-300 w-full"
                        >
                            Новини
                        </Link>
                    </li>
                    <li className="bg-gray-100 hover:bg-gray-300 transition duration-300 rounded-md w-full">
                        <Link
                            to="/admin/clubs"
                            className="block px-4 py-2 text-gray-800 hover:text-blue-600 transition duration-300 w-full"
                        >
                            Клубове
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}