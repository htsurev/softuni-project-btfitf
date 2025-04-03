import { useNavigate, useParams } from "react-router";
import { useEdit, useGetOne } from "../../../api/adminApi";

export default function AdminClubsEdit() {
    const navigate = useNavigate();
    const { clubId } = useParams();
    const { getOne: club } = useGetOne("clubs", clubId);
    const { edit } = useEdit("clubs");

    const editClubForm = async (formData) => {
        const data = Object.fromEntries(formData);

        await edit(clubId, data);

        navigate('/admin/clubs');

    };

    return (
        <div className="flex flex-col justify-center items-center text-white my-10">
            <form action={editClubForm}>
                <div className="space-y-12">

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-2xl/7 font-semibold text-gray-900">Редактиране - <span className="text-sm text-blue-700">{club.clubName}</span></h2>
                        <p className="mt-1 text-sm/6 text-gray-600 border-b border-gray-900/10">* задължителни полета</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">

                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                                    Лого
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <div className="mt-4 flex text-sm/6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                {/* <input id="file-upload" name="file-upload" type="file" className="sr-only" /> */}
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="clubImgUrl" className="block text-sm/6 font-medium text-gray-900">
                                    Снимка URL
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="clubImgUrl"
                                        name="clubImgUrl"
                                        type="text"
                                        placeholder="https://..."
                                        defaultValue={club.clubImgUrl}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="clubName" className="block text-sm/6 font-medium text-gray-900">
                                    Име на клуба *
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="clubName"
                                        name="clubName"
                                        type="text"
                                        placeholder="Име на клуба"
                                        defaultValue={club.clubName}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="clubDescription" className="block text-sm/6 font-medium text-gray-900">
                                    Кратко описание
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="clubDescription"
                                        name="clubDescription"
                                        placeholder="Година на създаване, постижения, интересни факти, какво е постигнал и какво го прави специален ..."
                                        defaultValue={club.clubDescription}
                                        className="h-30 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                                    Град *
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        placeholder="Град"
                                        defaultValue={club.city}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="postcode" className="block text-sm/6 font-medium text-gray-900">
                                    пощенски код *
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="postcode"
                                        name="postcode"
                                        type="text"
                                        placeholder="1234"
                                        defaultValue={club.postcode}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
                                    Адрес *
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        placeholder="Адрес"
                                        defaultValue={club.address}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="phoneNumberOne" className="block text-sm/6 font-medium text-gray-900">
                                    Телефон *
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="phoneNumberOne"
                                        name="phoneNumberOne"
                                        type="tel"
                                        placeholder="0879123456"
                                        defaultValue={club.phoneNumberOne}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                    <input
                                        id="phoneNumberTwo"
                                        name="phoneNumberTwo"
                                        type="tel"
                                        autoComplete="tel"
                                        placeholder="optional"
                                        defaultValue={club.phoneNumberTwo}
                                        className=" mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Email *
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="name@domain.com"
                                        defaultValue={club.email}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>


                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Редактирай
                    </button>
                </div>
            </form>
        </div>
    );
}