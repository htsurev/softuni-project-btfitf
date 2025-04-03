import { useState } from "react";

const clubsData = [
    {
        id: 1,
        name: "Христо Цурев",
        belt: "Black",
        logo: "/clubs-logo/bft.png",
    },
    {
        id: 2,
        name: "Tiger Academy",
        belt: "Brown",
        logo: "https://via.placeholder.com/40",
    },
    {
        id: 3,
        name: "Phoenix Gym",
        belt: "Purple",
        logo: "https://via.placeholder.com/40",
    },
];

export default function AdminProfiles() {
    const [search, setSearch] = useState("");

    const filteredClubs = clubsData.filter((club) =>
        club.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4 space-y-4">

            {/* Top Bar */}
            <div className="flex justify-between items-center flex-wrap gap-2">
                {/* Sort Options */}
                <select className="border rounded px-2 py-1 text-sm">
                    <option>Сортирай по име</option>
                    <option>Сортирай по степен</option>
                </select>

                {/* Search */}
                <input
                    type="text"
                    placeholder="Търсене..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded px-2 py-1 text-sm w-60"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl shadow-md">
                <table className="min-w-full bg-white rounded-xl text-sm">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="p-3 text-left"></th>
                            <th className="p-3 text-left">Име</th>
                            <th className="p-3 text-left">роля</th>
                            <th className="p-3 text-left">Степен</th>
                            <th className="p-3 text-left">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClubs.map((club) => (
                            <tr key={club.id} className="border-t hover:bg-gray-100 transition">
                                <td className="p-3">
                                    <img src={club.logo} alt={club.name} className="w-10 h-10 rounded-full object-cover" />
                                </td>
                                <td className="p-3 font-medium">{club.name}</td>
                                <td className="p-3 font-medium">Треньор</td>
                                <td className="p-3">
                                    <span className="inline-block px-2 py-1 text-xs rounded bg-gray-200">
                                        {club.belt}
                                    </span>
                                </td>
                                <td className="p-3 space-x-2">
                                    <button className="border px-2 py-1 rounded text-xs hover:bg-gray-100">Edit</button>
                                    <button className="border px-2 py-1 rounded text-xs text-red-600 hover:bg-red-100">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bottom Bar */}
            <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                {/* Total */}
                <div>
                    Общо: {filteredClubs.length} {filteredClubs.length === 1 ? 'профил' : 'профила'}
                </div>

                {/* Pagination */}
                <div className="flex items-center space-x-2">
                    <button className="border px-2 py-1 rounded text-xs hover:bg-gray-100">Previous</button>

                    {/* Page Numbers */}
                    <div className="flex space-x-1">
                        <button className="border px-2 py-1 rounded text-xs hover:bg-gray-100">1</button>
                        <button className="border px-2 py-1 rounded text-xs hover:bg-gray-100">2</button>
                        <button className="border px-2 py-1 rounded text-xs hover:bg-gray-100">3</button>
                        {/* you can dynamically generate these later */}
                    </div>

                    <button className="border px-2 py-1 rounded text-xs hover:bg-gray-100">Next</button>
                </div>
            </div>

        </div>
    );
}
