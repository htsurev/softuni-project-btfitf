import { FaFacebook, FaYoutube } from "react-icons/fa";
import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-10 ">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 px-4 ">
                <div className="md:col-span-2">
                    <h3 className="text-md font-bold mb-4 flex items-center">
                        <img src="https://itfbulgaria.com/wp-content/uploads/2020/04/btf-logo_84px-f.png" alt="Bulgarian Taekwondo Federation ITF" className="w-15 h-15 mr-2" />
                        <span className="text-base">Българска Федерация по Таекуон-до АЙ-ТИ-ЕФ <br /> 
                        (Б.Ф.Т. ITF),</span>
                        <img src="https://itfbulgaria.com/wp-content/uploads/2020/04/itf_white.png" alt="Bulgarian Taekwondo Federation ITF" className="w-15 h-15 ml-2" />
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm">
                        е регистрирана с решение № 71 и пререгистрирана съгласно новия Закон за юридическите лица с нестопанска цел с решение № 4207/14.12.01г. по фирмено дело № 443/ 1999г. на Благоевградския окръжен съд и лицензирана с лиценз № 001691/29.07.1999г. в тогавашния КМФВС към МС на Р.България и прелицензирана с лиценз No 001691/23.07.2003г. на Министерство на Младежта и спорта.
                    </p>
                    {/* <div className="flex space-x-4">
                        <Link to="https://www.facebook.com/BulgarianTaekwondoFederationITF" target="_blank" className="text-gray-400 hover:text-white text-xl"><FaFacebook /></Link>
                        <Link to="https://www.youtube.com/channel/UCyrVwRwYnYrOPfJWosSlnNg" className="text-gray-400 hover:text-white text-xl" target="_blank"><FaYoutube /></Link>
                    </div> */}
                </div>

                <div>
                    <h4 className="font-semibold mb-4">За нас</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white">Клубове</a></li>
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
                    <h4 className="font-semibold mb-4">Контакти</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li>
                            E-mail:
                            <Link to="mailto:bft_itf@abv.bg" className="text-white ml-2">bft_itf@abv.bg</Link>
                        </li>
                        <li>
                            Телефон:
                            <Link to="tel:+359898945555" className="text-white ml-2">+359 898 945 555</Link>
                        </li>
                        <li>
                            Адрес:
                            <Link to="https://www.google.com/maps?q=Благоевград,+България+2700,+площад+Георги+Измирлиев+5"
                                target="_blank"
                                className="text-white ml-2">
                                Благоевград, България 2700, площад Георги Измирлиев 5
                            </Link>
                        </li>
                        <li className="flex justify-center mt-5">
                            <div className="flex space-x-5">
                                <Link to="https://www.facebook.com/BulgarianTaekwondoFederationITF" target="_blank" className="text-gray-400 hover:text-white text-xl"><FaFacebook /></Link>
                                <Link to="https://www.youtube.com/channel/UCyrVwRwYnYrOPfJWosSlnNg" className="text-gray-400 hover:text-white text-xl" target="_blank"><FaYoutube /></Link>
                            </div>
                        </li>


                    </ul>
                </div>
            </div>

            <div className="text-center text-gray-500 mt-10">© Copyrights BITF © 2025. All Rights Reserved.</div>
        </footer>
    );
}