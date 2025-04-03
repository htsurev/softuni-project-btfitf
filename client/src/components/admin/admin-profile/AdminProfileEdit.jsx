import useAuth from "../../../hooks/useAuth";

import { FaRegUser } from "react-icons/fa";

export default function AdminProfileEdit() {
    const { email, fullName, _id } = useAuth();

    return (
        <div className="profile-container p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto my-8">
            <h1 className="text-2xl font-semibold mb-2 text-center">Редактирайте профила си</h1>
            <p className="text-sm/6 text-gray-600 border-b border-gray-900/10 text-center mb-8">* задължителни полета</p>

            <div className="mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden mx-auto">
                    {/* <img src="" alt="Profile" className="w-full h-full object-cover" /> */}
                    <FaRegUser />
                </div>
            </div>

            <form className="space-y-4" >
                <div>
                    <label htmlFor="fullName" className="block text-lg font-medium text-gray-700">Име *</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        defaultValue={fullName}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-lg font-medium text-gray-700">E-mail *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="john.doe@example.com"
                        defaultValue={email}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex space-x-4 justify-center border-t border-gray-300 pt-4">

                    <button className="bg-gray-500 text-white px-4 py-2 rounded-md w-full hover:bg-gray-600 transition duration-300 text-sm">
                        Отказ
                    </button>
                    <div className="border-l border-gray-300 h-8"></div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition duration-300 text-sm">
                        Запази промените
                    </button>
                </div>
            </form>
        </div>


    );
}