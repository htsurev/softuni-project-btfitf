import { ImLocation } from "react-icons/im";
import { MdPhone, MdEmail } from "react-icons/md";
import { useGetOne } from "../../api/adminApi";
import { useParams } from "react-router";


const sportists = [
    { name: 'Иван Стоянов', category: 'до 68 кг' },
    { name: 'Елена Николова', category: 'до 55 кг' },
    { name: 'Петър Димитров', category: 'до 74 кг' },
];



export default function ClubDetails() {
    const { clubId } = useParams();
    const { getOne } = useGetOne('clubs', clubId);

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg my-5">

            <div className="flex flex-col md:flex-row items-start mb-6 p-4 bg-gray-50 rounded-lg">
                <img
                    src="https://itfbulgaria.com/wp-content/uploads/2022/02/falcon-logo-200px.jpg"
                    alt="Club Logo"
                    className="w-32 h-32 object-cover rounded-full mr-6 mb-4 md:mb-0"
                />

                <div className="flex flex-col flex-1 mx-5 text-center md:text-left">
                    <h1 className="text-2xl font-bold mb-2">{getOne.clubName}</h1>
                    <p className="text-gray-600 mb-2">
                        {getOne.clubDescription}
                    </p>

                    <div className="flex flex-col md:flex-row md:items-center md:space-x-8 justify-center md:justify-start mt-4">
                        <div className="flex items-center">
                            <ImLocation className="mr-2 text-lg" />
                            <p className="text-gray-700">{getOne.address}</p>
                        </div>

                        <div className="flex items-center mb-2 md:mb-0">
                            <MdPhone className="mr-2 text-lg" />
                            <p className="text-gray-700">
                                {getOne.phoneNumberOne && `${getOne.phoneNumberOne.startsWith('0') ? '+359 ' + getOne.phoneNumberOne.slice(1) : getOne.phoneNumberOne}`}
                                {getOne.phoneNumberTwo && `, ${getOne.phoneNumberTwo.startsWith('0') ? '+359 ' + getOne.phoneNumberTwo.slice(1) : getOne.phoneNumberTwo}`}
                            </p>
                        </div>

                        <div className="flex items-center mb-2 md:mb-0">
                            <MdEmail className="mr-2 text-lg" />
                            <p className="text-gray-700">{getOne.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="my-6" />

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Треньори</h2>
                <ul className="list-disc pl-5 text-gray-700">
                    <li>Георги Иванов - Главен треньор</li>
                    <li>Мария Петрова - Асистент треньор</li>
                </ul>
            </div>


            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Активни Спортисти</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white mb-10 border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b text-left">Име</th>
                                <th className="px-4 py-2 border-b text-center">Степен</th>
                                <th className="px-4 py-2 border-b text-center">Форма (тъль)</th>
                                <th className="px-4 py-2 border-b text-center">Спаринг (матсоги)</th>
                                <th className="px-4 py-2 border-b text-center">Силов тест (Вийрьок)</th>
                                <th className="px-4 py-2 border-b text-center">Специална техника (Тъки)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sportists.map((sportist, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border-b text-left">{sportist.name}</td>
                                    <td className="px-4 py-2 border-b text-center">2 гуп</td>
                                    <td className="px-4 py-2 border-b text-center">da</td>
                                    <td className="px-4 py-2 border-b text-center">da</td>
                                    <td className="px-4 py-2 border-b text-center">da</td>
                                    <td className="px-4 py-2 border-b text-center">{sportist.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            <hr className="my-6" />

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Постижения</h2>
                <ul className="list-disc pl-5 text-gray-700">
                    <li>3 златни медала на Държавно първенство 2024</li>
                    <li>1-во място в Международен турнир Гърция 2023</li>
                </ul>
            </div>

        </div>
    );
}