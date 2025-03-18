import { useEffect, useState } from "react";
import { Link } from "react-router";
import adminServices from "../../../api/adminServices";

// const tkdClubs = [
//     {
//         imageUrl: 'https://itfbulgaria.com/wp-content/uploads/2022/02/falcon-logo-200px.jpg',
//         name: '"Фолкън"',
//         city: 'гр. Благоевград, 2700',
//         address: 'гр. Благоевград, 2700',
//         phoneNumber: '+359 897918913, 0895555162',
//         email: 'tkd_falcon@abv.bg',
//     },
//     {
//         imageUrl: 'https://itfbulgaria.com/wp-content/uploads/2022/02/bylgarska-federacia-taekuondo_200px.png',
//         name: '"Калоян-Ладимекс"',
//         city: 'гр. Перник, 2300',
//         address: 'кв. "Твърди Ливади", бл. 42',
//         phoneNumber: '0899934909',
//         email: 'iv_62@abv.bg',
//     },
//     {
//         imageUrl: 'https://itfbulgaria.com/wp-content/uploads/2022/02/falcon-logo-200px.jpg',
//         name: '"Фолкън"',
//         city: 'гр. Благоевград, 2700',
//         address: 'гр. Благоевград, 2700',
//         phoneNumber: '+359 897918913, 0895555162',
//         email: 'tkd_falcon@abv.bg',
//     },
//     {
//         imageUrl: 'https://itfbulgaria.com/wp-content/uploads/2022/02/bylgarska-federacia-taekuondo_200px.png',
//         name: '"Калоян-Ладимекс"',
//         city: 'гр. Перник, 2300',
//         address: 'кв. "Твърди Ливади", бл. 42',
//         phoneNumber: '0899934909',
//         email: 'iv_62@abv.bg',
//     },
//     {
//         imageUrl: 'https://itfbulgaria.com/wp-content/uploads/2022/02/falcon-logo-200px.jpg',
//         name: '"Фолкън"',
//         city: 'гр. Благоевград, 2700',
//         address: 'гр. Благоевград, 2700',
//         phoneNumber: '+359 897918913, 0895555162',
//         email: 'tkd_falcon@abv.bg',
//     },
//     {
//         imageUrl: 'https://itfbulgaria.com/wp-content/uploads/2022/02/falcon-logo-200px.jpg',
//         name: '"Фолкън"',
//         city: 'гр. Благоевград, 2700',
//         address: 'гр. Благоевград, 2700',
//         phoneNumber: '+359 897918913, 0895555162',
//         email: 'tkd_falcon@abv.bg',
//     },
// ];

export default function AdminClubs() {

    const [tkdClubs, setTkdClubs] = useState([]);
    useEffect(() => {
        adminServices.getAll()
            .then(result => {
                setTkdClubs(result);
            })
    }, []);

    const onDeleteClubClickHandler = async (club) => {
        const hasConfirm = confirm(`Изтриване на клуб ${club.clubName}`);

        if (!hasConfirm) {
            return;
        }

        await adminServices.delete(club._id);

        setTkdClubs((prevClubs) =>
            prevClubs.filter((item) => item._id !== club._id)
        );

    }

    return (
        <div className="flex flex-col justify-center items-center p-8 text-white mt-10">
            <div className="flex items-center w-full max-w-7xl mb-8 border-b border-gray-300 pb-10 space-x-4">
                <h1 className="text-3xl font-bold text-gray-700">Таекуон-До Клубове</h1>

                <Link to="/admin/clubs/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg shadow-md transition duration-300">
                    + Добави нов клуб
                </Link>
            </div>


            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-7xl justify-center">
                {tkdClubs.map(club => (
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
                                <a
                                    href={`/admin/clubs/${club._id}/edit`}
                                    className="w-full h-full bg-gray-300 hover:bg-blue-700 text-dark hover:text-white rounded-lg shadow-md transition duration-300 mx-2 cursor-pointer flex items-center justify-center"
                                >
                                    edit
                                </a>
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
        </div>
    );
}