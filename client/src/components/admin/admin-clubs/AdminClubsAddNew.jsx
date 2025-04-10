import { useNavigate } from "react-router";
import { useCreate } from "../../../api/adminApi";
import { useState } from "react";
import { validateClubs } from "../../../utils/validations/clubs/validateClubs";

export default function AdminClubsAddNew() {
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        clubImgUrl: "",
        clubName: "",
        clubDescription: "",
        city: "",
        postcode: "",
        address: "",
        phoneNumberOne: "",
        phoneNumberTwo: "",
        email: "",
    })
    const [formFeedback, setFormFeedback] = useState({});

    const { create } = useCreate("clubs");

    const addClubForm = async (e) => {
        e.preventDefault();

        const isConfirmed = window.confirm("Добавяне на нов клуб.");

        if (!isConfirmed) {
            return;
        }


        const trimmedValues = {
            ...formValues,
            clubImgUrl: formValues.clubImgUrl?.trim(),
            clubName: formValues.clubName?.trim(),
            clubDescription: formValues.clubDescription?.trim(),
            city: formValues.city?.trim(),
            postcode: formValues.postcode?.trim(),
            address: formValues.address?.trim(),
            phoneNumberOne: formValues.phoneNumberOne?.trim(),
            phoneNumberTwo: formValues.phoneNumberTwo?.trim(),
            email: formValues.email?.trim(),
        }

        const validationMessages = validateClubs(trimmedValues);

        if (Object.keys(validationMessages).length > 0) {
            setFormFeedback(validationMessages);
            return;
        }

        const data = {
            ...trimmedValues,
        }

        try {
            await create(data);
            navigate('/admin/clubs');
        } catch (error) {
            console.error("Error creating club:", error);
        }


    };

    return (
        <div className="flex flex-col justify-center items-center text-white my-10">
            <form onSubmit={addClubForm}>
                <div className="space-y-12">

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-2xl/7 font-semibold text-gray-900">Добавяне на нов клуб</h2>
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
                                                htmlFor="clubImgFile"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="clubImgFile" name="clubImgFile" type="file" className="sr-only" />
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
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="clubName" className="block text-sm/6 font-medium text-gray-900">
                                    Име на клуба *
                                </label>
                                {formFeedback.clubName && <p className="text-red-500 text-sm mt-1">{formFeedback.clubName}</p>}
                                <div className="mt-2">
                                    <input
                                        id="clubName"
                                        name="clubName"
                                        type="text"
                                        value={formValues.clubName}
                                        onChange={(e) => setFormValues({ ...formValues, clubName: e.target.value })}
                                        placeholder="Име на клуба"
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
                                        value={formValues.clubDescription}
                                        onChange={(e) => setFormValues({ ...formValues, clubDescription: e.target.value })}
                                        placeholder="Година на създаване, постижения, интересни факти, какво е постигнал и какво го прави специален ..."
                                        className="h-30 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                                    Град *
                                </label>
                                {formFeedback.city && <p className="text-red-500 text-sm mt-1">{formFeedback.city}</p>}
                                <div className="mt-2">
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        placeholder="Град"
                                        value={formValues.city}
                                        onChange={(e) => setFormValues({ ...formValues, city: e.target.value })}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="postcode" className="block text-sm/6 font-medium text-gray-900">
                                    пощенски код *
                                </label>
                                {formFeedback.postcode && <p className="text-red-500 text-sm mt-1">{formFeedback.postcode}</p>}
                                <div className="mt-2">
                                    <input
                                        id="postcode"
                                        name="postcode"
                                        type="number"
                                        placeholder="1234"
                                        value={formValues.postcode}
                                        onChange={(e) => setFormValues({ ...formValues, postcode: e.target.value })}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
                                    Адрес *
                                </label>
                                {formFeedback.address && <p className="text-red-500 text-sm mt-1">{formFeedback.address}</p>}
                                <div className="mt-2">
                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        placeholder="Адрес"
                                        value={formValues.address}
                                        onChange={(e) => setFormValues({ ...formValues, address: e.target.value })}
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
                                        type="number"
                                        placeholder="0879123456"
                                        value={formValues.phoneNumberOne}
                                        onChange={(e) => setFormValues({ ...formValues, phoneNumberOne: e.target.value })}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                    {formFeedback.phoneNumberOne && <p className="text-red-500 text-sm mt-1">{formFeedback.phoneNumberOne}</p>}
                                    <input
                                        id="phoneNumberTwo"
                                        name="phoneNumberTwo"
                                        type="number"
                                        autoComplete="tel"
                                        placeholder="optional"
                                        value={formValues.phoneNumberTwo}
                                        onChange={(e) => setFormValues({ ...formValues, phoneNumberTwo: e.target.value })}
                                        className=" mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                    {formFeedback.phoneNumberTwo && <p className="text-red-500 text-sm mt-1">{formFeedback.phoneNumberTwo}</p>}
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Email *
                                </label>
                                {formFeedback.email && <p className="text-red-500 text-sm mt-1">{formFeedback.email}</p>}
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="example@domain.com"
                                        value={formValues.email}
                                        onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
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
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                    >
                        Добави
                    </button>
                </div>
            </form>
        </div>
    );
}