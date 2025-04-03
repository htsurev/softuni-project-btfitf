import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

const adminMenuList = [
    {
        _id: 1,
        name: "Новини",
        path: "/admin/news",
    },
    {
        _id: 2,
        name: "Клубове",
        path: "/admin/clubs",
    },
    {
        _id: 3,
        name: "Потребители",
        path: "/admin/profiles",
    },
    {
        _id: 4,
        name: "Магазин",
        path: "/admin/store",
    },
]

export default function AdminMenu() {
    const { email } = useAuth();

    return (
        <div className="hidden lg:block lg:w-1/6 bg-gray-600 p-0 shadow-md mt-9 px-0 ">
            <div className="hidden lg:flex lg:flex-col lg:w-1/6 bg-gray-600 pl-3 fixed top-30 left-0 ">

                <div className={`flex flex-col items-start mb-5 px-0 px-2 pt-2 ${location.pathname === "/admin/profile" ? "bg-white mr-0 border-r-none rounded-l-md " : "bg-dark mr-4 rounded-md text-gray-100"}`}> 
                    <Link to="/admin/profile" className="flex items-center space-x-2 hover:text-sky-300 font-semibold transition duration-300 mb-3">
                        <FaRegUser />

                        <span>{email}</span>
                    </Link>
                    <hr className="w-full border-t-1 border-gray-400" />
                </div>

                <ul className="flex flex-col space-y-2 w-full">
                    {adminMenuList.map(item => (
                        <li
                            key={item._id}
                            className={`bg-gray-200 hover:bg-white transition duration-300 ${location.pathname === item.path ? "bg-white mr-0 border-r-none rounded-l-md" : "bg-dark mr-4 rounded-md"}`}
                        >
                            <Link
                                to={item.path}
                                className="block px-4 py-2 text-gray-800 hover:text-blue-600 transition duration-300 w-full"
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}