import { useEffect, useState } from "react";
import adminServices from "../../api/adminServices";


export default function AboutUs() {
    const [tkdClubs, setTkdClubs] = useState([]);
        useEffect(() => {
            adminServices.getAll()
                .then(result => {
                    setTkdClubs(result);
                })
        }, []);

    return (
        <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:pt-16 sm:pb-0 lg:overflow-visible lg:px-0">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            <p className="text-base/7 font-semibold text-indigo-600">Българска Федерация по Таекуон-до АЙ-ТИ-ЕФ</p>
                            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                                (Б.Ф.Т. ITF),
                            </h1>
                            <p className="mt-6 text-xl/8 text-gray-700">
                                е регистрирана с решение № 71 и пререгистрирана съгласно новия Закон за юридическите лица с нестопанска цел с решение № 4207/14.12.01г. по фирмено дело № 443/ 1999г. на Благоевградския окръжен съд и лицензирана с лиценз № 001691/29.07.1999г. в тогавашния КМФВС към МС на Р.България и прелицензирана с лиценз No 001691/23.07.2003г. на Министерство на Младежта и спорта.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="-mt-0 -ml-0 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                    <img
                        alt=""
                        src="https://itfbulgaria.com/wp-content/uploads/elementor/thumbs/plovdi-2019-pk7ydcwiu3zx6mwzlq7eqzwiuwtvorea8dggls6ur2.png"
                        className="w-[48rem] max-w-none rounded-xl bg-gray-900 ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem]"
                    />
                </div>
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg">
                            <p className="mb-4 leading-relaxed">
                                Б.Ф.Т. ITF е член на Балканската Федерация по Таекуон-до от 1997г. и неин учредител, на Европейската Федерация по Таекуон-до (AЕТF) oт 1995г. и на Международната Таекуон-до Федерация (ITF) от 1988г.
                            </p>
                            <p className="mb-4 leading-relaxed">
                                В Международната Таекуон-до Федерация (ITF) членуват над 120 страни, между които САЩ, Канада, Япония, Русия, Германия, Испания и др. с над 40 милиона трениращи.
                            </p>
                            <p className="mb-4 leading-relaxed">
                                В края на 1985 г. в България пристига майстор Ким Унг Чол от Северна Корея и се превръща в основоположник на Таекуон-до в страната. Въпреки че първоначалният му престой е кратък, той оставя след себе си запалени ученици и верни последователи. По тяхно настояване през 1988 г. към майстора е отправена официална покана отново да посети България от името на Национална Спортна Академия (тогава ВИФ “Г. Димитров”). За периода на своето пребиваване майстор Ким Унг Чол си поставя за цел да създаде Българска Федерация по Таекуон-до (БФТ) към Международната Таекуон-до Федерация, както и да събере и подготви български национален отбор за участие в международни прояви.
                            </p>
                            <p className="mb-4 leading-relaxed">
                                Създава се и специалност “Таекуон-до” в НСА, където майсторът става и първи преподавател. През 1989 г. официално се учредява БФТ, а за президент на федерацията е избран Светослав Иванов. Седалището на БФТ се намира в Благоевград, а настоящият президент е Марио Богданов. Следват години на възход за таекуон-до в България. До голяма степен успехите се дължат на корейските инструктори, работили у нас: майстор Ким Чол Ман VI дан (1989 – 1993 г.), майстор Сок Мин Чол VII дан (1993 – 1999 г.), и разбира се най-вече на майстор Ким Унг Чол VIII дан, който и до днес преподава в България
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="bg-gray-200 flex flex-col justify-center items-center p-8 text-white mt-10">

                <div className="text-center mb-8 ">
                    <h1 className="text-4xl font-bold text-gray-700 border-b border-gray-900">Таекуон-До Клубове</h1>
                    <p className="text-xl mt-2 text-gray-500">Нашите членове</p>
                </div>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full max-w-7xl justify-center place-items-center ">

                    {tkdClubs.map(club => (
                        <div key={club._id} className="p-0 text-center flex flex-col items-center">
                            <img
                                src={club.imageUrl}
                                alt="Contact"
                                className="rounded-full mb-4 w-30"
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-10 mb-15">
                    <a href="/clubs" className="bg-green-600 hover:bg-green-900 text-white font-semibold py-2 px-8 text-lg rounded transition duration-300">
                        Виж всички
                    </a>
                </div>

            </div>

        </div>
    );
}
