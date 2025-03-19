import { useEffect, useState } from "react";
import adminServices from "../../api/adminServices";

import { ImLocation } from "react-icons/im";
import { MdPhone, MdEmail } from "react-icons/md";


export default function Clubs() {
    const [tkdClubs, setTkdClubs] = useState([]);
    useEffect(() => {
        adminServices.getAll()
            .then(result => {
                setTkdClubs(result);
            })
    }, []);

    return (
        <div className="flex flex-col justify-center items-center p-8">

            <div className="text-center mb-8 ">
                <h1 className="text-4xl font-bold text-gray-700 border-b border-gray-900">Таекуон-До Клубове</h1>
                <p className="text-xl mt-2 text-gray-500">Нашите членове</p>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-7xl justify-center place-items-center ">

                {tkdClubs.map(club => (
                    <div key={club._id} className="rounded-2xl p-6 text-center shadow-xl flex flex-col items-center shadow-stone-500/50 inset-shadow-sm inset-shadow-stone-500 bg-gray-200">
                        <img
                            src={club.imageUrl}
                            alt="Contact"
                            className="rounded-full mb-4"
                        />
                        <h4 className="font-semibold text-gray-900 mb-3">{club.clubName}</h4>
                        <p className="text-gray-700 flex items-center mb-2">
                            <ImLocation className="mr-2" />
                            гр. {club.city}
                        </p>
                        <p className="text-gray-700 mb-2">
                            {club.address}
                        </p>
                        <p className="text-gray-700 flex items-center mb-2">
                            <MdPhone className="mr-2" />
                            {club.phoneNumberOne}
                            {club.phoneNumberTwo && `, ${club.phoneNumberTwo}`}
                        </p>
                        <p className="text-gray-700 flex items-center mb-3">
                            <MdEmail className="mr-2" />
                            {club.email}
                        </p>

                    </div>
                ))}
            </div>

        </div>
    );
}