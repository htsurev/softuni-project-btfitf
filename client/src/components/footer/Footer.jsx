import { FaFacebook, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-10 ">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 px-4 ">
                {/* First Column (Wider) */}
                <div className="md:col-span-2">
                    <h3 className="text-md font-bold mb-4">Българска Федерация по Таекуон-до АЙ-ТИ-ЕФ (Б.Ф.Т. ITF),</h3>
                    <p className="text-gray-400 mb-4 text-sm">
                        е регистрирана с решение № 71 и пререгистрирана съгласно новия Закон за юридическите лица с нестопанска цел с решение № 4207/14.12.01г. по фирмено дело № 443/ 1999г. на Благоевградския окръжен съд и лицензирана с лиценз № 001691/29.07.1999г. в тогавашния КМФВС към МС на Р.България и прелицензирана с лиценз No 001691/23.07.2003г. на Министерство на Младежта и спорта.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white text-xl"><FaFacebook /></a>
                        <a href="#" className="text-gray-400 hover:text-white text-xl"><FaYoutube /></a>
                        <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>

                {/* Other Columns */}
                <div>
                    <h4 className="font-semibold mb-4">Products</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white">Product 1</a></li>
                        <li><a href="#" className="hover:text-white">Product 2</a></li>
                        <li><a href="#" className="hover:text-white">Product 3</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">Resources</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white">Blog</a></li>
                        <li><a href="#" className="hover:text-white">Docs</a></li>
                        <li><a href="#" className="hover:text-white">FAQ</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-4">Contact</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li>Email: info@company.com</li>
                        <li>Phone: +123456789</li>
                        <li>Address: City, Country</li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-gray-500 mt-10">© 2025 Company Name. All rights reserved.</div>
        </footer>
    );
}