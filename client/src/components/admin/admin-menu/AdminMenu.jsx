import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router";

export default function AdminMenu() {
    return (
        <div className="hidden lg:block lg:w-1/6 bg-gray-200 p-4 rounded-lg shadow-md mt-9 border-r border-blue-300 px-0">
            <div className="flex flex-col items-left mb-5 fixed px-4">
                {/* User Icon and Username */}
                <div className="flex items-center space-x-2 mb-3">
                    <a href="/account" className="text-gray-800 hover:text-blue-600 font-semibold transition duration-300">
                        <div className="flex items-center">
                            <FaRegUser />
                            <span className="ml-2 font-semibold text-gray-800">Вергилий Ситнилски</span>
                        </div>
                    </a>
                </div>

                <hr className="w-full border-t-2 border-gray-300 mb-0" />
            </div>

            <ul className="w-full space-y-4 lg:static fixed mt-12 ">
                <li className=" my-1 w-full bg-gray-100 hover:bg-gray-300 transition duration-300">
                    <Link
                        to="/admin/news"
                        className="block w-full px-4 py-2 text-gray-800 hover:text-blue-600 transition duration-300"
                    >
                        Новини
                    </Link>
                </li>
                <li className="my-1 w-full bg-gray-100 hover:bg-gray-300 transition duration-300">
                    <Link
                        to="/admin/clubs"
                        className="block w-full px-4 py-2 text-gray-800 hover:text-blue-600 transition duration-300"
                    >
                        Клубове
                    </Link>
                </li>
            </ul>
        </div>
    );
}