import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router";

export default function AdminMenu() {
    return (
        <div className="hidden lg:block lg:w-1/6 bg-gray-200 p-4 rounded-lg shadow-md mt-9 border-r border-blue-300">
            <div className="flex flex-col items-left mb-5 fixed">
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

            <ul className="space-y-4 fixed mt-12">
                <li>
                    <a href="#option1" className="text-gray-800 hover:text-blue-900 transition duration-300">Новини</a>
                </li>
                <Link to="/admin/clubs" className="text-gray-800 hover:text-blue-600 transition duration-300">Клубове</Link>
            </ul>
        </div>
    );
}