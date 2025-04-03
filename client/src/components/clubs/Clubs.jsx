
import { useGetAll } from "../../api/adminApi";

import { ImLocation } from "react-icons/im";
import { MdPhone, MdEmail } from "react-icons/md";
import { Link } from "react-router";


export default function Clubs() {
    const { getAll } = useGetAll("clubs");

    return (
        <div className="flex flex-col justify-center items-center p-8">

            <div className="text-center mb-8 ">
                <h1 className="text-4xl font-bold text-gray-700 border-b border-gray-900">Таекуон-До Клубове</h1>
                <p className="text-xl mt-2 text-gray-500">Нашите членове</p>
            </div>
            {getAll.length === 0 ? (
                <p className="text-center text-gray-500 col-span-full">Няма налични клубове.</p>
            ) : (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-7xl justify-center place-items-center ">

                    {getAll.map(club => (
                        <Link to={`/club/${club._id}/details`} key={club._id}>
                            <div className="rounded-2xl p-6 text-center shadow-xl flex flex-col items-center shadow-stone-500/50 inset-shadow-sm inset-shadow-stone-500 bg-gray-200 hover:shadow-stone-100/50 hover:inset-shadow-lg hover:inset-shadow-stone-800 hover:bg-gray-300">
                                <img
                                    src={
                                        club.clubImgFile && club.clubImgFile.length > 0
                                            ? URL.createObjectURL(club.clubImgFile[0])
                                            : club.clubImgUrl && club.clubImgUrl.trim() !== ""
                                                ? club.clubImgUrl
                                                : "/public/clubs-logo/bft.png"
                                    }
                                    alt={club.clubName}
                                    className="mb-4 w-32 h-32 object-cover rounded-xl"
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
                        </Link>
                    ))}
                </div>
            )}

        </div >
    );
}