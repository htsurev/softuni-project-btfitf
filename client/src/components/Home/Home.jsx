import { Link } from "react-router";
import { useLatestData } from "../../api/adminApi";

const managementBoard = [
    {
        id: 1,
        name: 'Марио Богданов',
        role: 'Председател на УС на БФТ ITF',
        imageUrl:
            'https://itfbulgaria.com/wp-content/uploads/2022/03/mario_bogdanov_172x172.png',
    },
    {
        id: 2,
        name: 'Костадин Димитров',
        role: 'Зам. председател на УС на БФТ ITF',
        imageUrl:
            'https://itfbulgaria.com/wp-content/uploads/2022/03/kostadin_dimitrov_172x172.png',
    },
    {
        id: 3,
        name: 'Вергилий Ситнилски',
        role: 'Генерален секретар на БФТ ITF',
        imageUrl:
            'https://itfbulgaria.com/wp-content/uploads/2022/03/vergilii_sitnilski_172x172.png',
    },
];

const chairmenAndMembersOfCommittees = [
    {
        id: 1,
        committees: 'Съдийска комисия',
        chairmen: 'Няма',
        members: 'Желязко Гагов, Александър Русев',
    },
    {
        id: 2,
        committees: 'Комисия по трансферите',
        chairmen: 'Тодор Козладеров',
        members: 'Няма',
    },
    {
        id: 3,
        committees: 'WEB комисия',
        chairmen: 'Няма',
        members: 'Албена Малчева',
    },
    {
        id: 4,
        committees: 'Комисия по състезанията и турнирите',
        chairmen: 'Калин Мирчев',
        members: 'Теодор Найденов',
    },

];

const stats = [
    { id: 1, name: 'Лицензирани школи', value: '32' },
    { id: 2, name: 'Професионални ITF треньори', value: '80 +' },
    { id: 3, name: 'Състезатели с черен колан', value: '679' },
    { id: 4, name: 'Общо състезатели', value: '5123' },
]


export default function Home() {
    const { latestData = [] } = useLatestData("news");

    const formattedDate = (dateString) => {
        const monthAbbreviations = {
            "January": "Ян",
            "February": "Фев",
            "March": "Март",
            "April": "Апр",
            "May": "Май",
            "June": "Юни",
            "July": "Юли",
            "August": "Авг",
            "September": "Септ",
            "October": "Окт",
            "November": "Ное",
            "December": "Дек"
        };

        const date = new Date(dateString);

        const monthName = date.toLocaleDateString('en-US', { month: 'long' });

        const shortMonth = monthAbbreviations[monthName];

        const formattedDate = `${date.getDate()} ${shortMonth}, ${date.getFullYear()}`;

        return formattedDate;
    };

    return (
        <>
            <section className="relative isolate bg-white px-6 py-14 sm:py-14 lg:px-8 border-b border-sky-600">
                <div
                    className="absolute inset-0 -z-10 flex items-center justify-center opacity-10"
                >
                    <img
                        src="https://brandlogos.net/wp-content/uploads/2013/03/itf-taekwon-vector-logo.png"
                        alt="ITF Logo Background"
                        className="max-w-lg object-contain"
                    />
                </div>

                {/* Content */}
                <div className="mx-auto max-w-2xl lg:max-w-4xl">
                    <figure className="mt-0">
                        <blockquote className="text-center text-xl/8 font-semibold text-gray-900 sm:text-2xl/9">
                            <p>
                                Таекуон-до е създадено, изучавано и завършено от генерал Чой Хонг Хи от Корея и пуснато в света като модерни бойни изкуства. Генерал Чой Хонг Хи трябваше да практикува карате в Япония, защото Корея беше под нейна колониална окупация повече от 36 години. Корея е освободена от японското колониално управление през 1945 г.
                            </p>
                        </blockquote>
                        <figcaption className="mt-10">
                            <img
                                alt=""
                                src="https://data.taekwondo-itf.com/images/user1.svg"
                                className="mx-auto size-20 rounded-full"
                            />
                            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                                <div className="font-semibold text-gray-900">ген. Чой Хонг Хи</div>
                                <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-gray-900">
                                    <circle r={1} cx={1} cy={1} />
                                </svg>
                                <div className="text-gray-600">Основател на Таекуон-До</div>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </section>


            {/* Statistic */}
            <div className="bg-gray-300 py-24 sm:py-10">
                <h1 className="text-center text-4xl font-bold tracking-tight text-pretty text-gray-900 sm:text-3xl mb-12">
                    Българска федерация по Таекуондо ITF
                </h1>

                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4 p-6 bg-white rounded-lg shadow-lg">
                                <dt className="text-xl font-semibold text-gray-600">{stat.name}</dt>
                                <dd className="order-first text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>




            {/* Latest NEWS */}
            <div className="bg-white py-14 sm:pb-32 ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center border-b border-gray-200 ">
                        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Последни новини</h2>
                        <div className="hidden sm:my-5 sm:flex sm:justify-center">
                            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                                <Link to="/news" className="font-semibold text-indigo-600">
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    повече тук <span aria-hidden="true">&rarr;</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-10 sm:pt-0 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {latestData.length === 0 ? (
                            <p className="text-center text-gray-500">Няма налични новини.</p>
                        ) : (
                            latestData.map((post) => (
                                <article key={post._id} className="flex max-w-xl flex-col items-start justify-between border rounded-xl border-gray-200 px-3 py-3 hover:border-gray-400">
                                    {post.newsType === "event" && (
                                        <div className="flex items-center gap-x-4 text-xs">
                                            <span className="text-gray-500">
                                                {formattedDate(post.eventDate)}
                                            </span>
                                            <span className="relative rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                                {post.eventLocation}
                                            </span>
                                        </div>
                                    )}
                                    <div className="">
                                        <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">

                                            <span className="">
                                                {post.title}
                                            </span>

                                        </h3>
                                        <Link to={`/news/${post._id}/details`}>
                                            <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{post.description}</p>
                                        </Link>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="text-sm/6">
                                            <p className="text-gray-400 text-xs">публикувано на {formattedDate(post.publishedDate)}</p>
                                        </div>

                                    </div>
                                </article>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Sponsors */}
            <div className="py-15 sm:py-15 bg-sky-200">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-center text-lg/8 font-semibold text-gray-900">
                        Партньори / Спонсори
                    </h2>
                    <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                        <img
                            alt="Transistor"
                            src="https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg"
                            width={158}
                            height={48}
                            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        />
                        <img
                            alt="Reform"
                            src="https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg"
                            width={158}
                            height={48}
                            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        />
                        <img
                            alt="Tuple"
                            src="https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg"
                            width={158}
                            height={48}
                            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        />
                        <img
                            alt="SavvyCal"
                            src="https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-gray-900.svg"
                            width={158}
                            height={48}
                            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                        />
                        <img
                            alt="Statamic"
                            src="https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-gray-900.svg"
                            width={158}
                            height={48}
                            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                        />
                    </div>
                </div>
            </div>

            {/* Leadership */}
            <div className="bg-white pt-10 sm:pt-10 sm:pb-10">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-10">

                    {/* Title Block on Top */}
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
                            Управителен Съвет
                        </h2>
                        <p className="mt-0 text-lg/8 text-gray-600">
                            Основатели и дейци на федерацията
                        </p>
                    </div>

                    {/* Management Board Below */}
                    <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-y-16">
                        {managementBoard.map((person) => (
                            <li key={person.id}>
                                <div className="flex items-center gap-x-6">
                                    <img alt="" src={person.imageUrl} className="size-30 rounded-full" />
                                    <div>
                                        <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">{person.name}</h3>
                                        <p className="text-sm/6 font-semibold text-indigo-600">{person.role}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>

            <div className="bg-white pt-10 sm:pt-10 sm:pb-20 ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-10 border-t border-gray-200 pt-5">
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-3xl">
                            Комисии
                        </h2>
                        <p className="mt-0 text-lg/8 text-gray-600">
                            Председатели и членове на комисии
                        </p>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-10 pt-5">
                    <dl className="divide-y divide-gray-100">
                        {chairmenAndMembersOfCommittees.map((person) => (
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0" key={person.id}>
                                <dt className="text-md font-medium text-gray-900">{person.committees}</dt>
                                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                                    <div>
                                        <p className="text-sm font-semibold text-stone-800">Председател: <span className="text-stone-500">{person.chairmen}</span></p>
                                    </div>
                                    <div>
                                        <p className="text-sm/6 font-semibold text-stone-800">Членове: <span className="text-stone-500">{person.members}</span></p>
                                    </div>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

        </>
    );
}