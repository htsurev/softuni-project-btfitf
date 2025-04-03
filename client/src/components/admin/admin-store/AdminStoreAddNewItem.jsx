import { useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useCreate } from '../../../api/adminApi';
import { useNavigate } from 'react-router';
import { ITEMS_SIZES } from '../../../constants/store/itemsSizes';
import { ITEMS_CATEGORIES } from '../../../constants/store/itemsCategories';

export default function AdminStoreAddNewItem() {
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState(ITEMS_CATEGORIES[0]);
    const [sizeData, setSizeData] = useState({});

    const { create } = useCreate("store");

    const addNewItemForm = async (formData) => {
        const data = Object.fromEntries(formData);

        const hasConfirm = confirm(`Добави артикул - ${data.itemTitle}`);
        if (!hasConfirm) {
            return;
        }

        data.itemStatus = formData.get("itemStatus") || "off";
        data.itemCategory = selectedCategory;

        if (selectedCategory === "Екипи" || selectedCategory === "Протектори") {
            data.sizeData = sizeData;
        } else {
            data.itemQtty = Number(data.itemQtty);
            data.itemPrice = Number(data.itemPrice);
        }

        await create(data);

        setSelectedCategory(ITEMS_CATEGORIES[0]);
        setSizeData({});

        navigate('/admin/store')

    }

    return (
        <div className="flex flex-col justify-center items-center my-10">
            <form action={addNewItemForm}>
                <div className="space-y-12">

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-2xl/7 font-semibold text-gray-900">Добавяне на нов артикул</h2>
                        <p className="mt-1 text-sm/6 text-gray-600 border-b border-gray-900/10">* задължителни полета</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">

                            <div className="sm:col-span-full">
                                <label htmlFor="itemCategory" className="block text-sm/6 font-medium text-gray-900">
                                    Категория
                                </label>
                                <div className="mt-2">
                                    <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                                        <div className="relative mt-2 w-64">
                                            <ListboxButton className="w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                                <span className="block truncate">{selectedCategory}</span>
                                                <ChevronUpDownIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" aria-hidden="true" />
                                            </ListboxButton>

                                            <ListboxOptions className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                                {ITEMS_CATEGORIES.map((category, index) => (
                                                    <ListboxOption
                                                        key={index}
                                                        value={category}
                                                        className="cursor-pointer select-none py-2 px-4 text-gray-900 hover:bg-indigo-500 hover:text-white"
                                                    >
                                                        {category}
                                                    </ListboxOption>
                                                ))}
                                            </ListboxOptions>
                                        </div>
                                    </Listbox>
                                </div>
                            </div>

                            <div className="sm:col-span-full w-150">
                                <label htmlFor="itemImgUrl" className="block text-sm/6 font-medium text-gray-900">
                                    Снимка URL
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="itemImgUrl"
                                        name="itemImgUrl"
                                        type="text"
                                        placeholder="https://..."
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-full w-150 ">
                                <label htmlFor="itemTitle" className="block text-sm/6 font-medium text-gray-900">
                                    Заглавие *
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="itemTitle"
                                        name="itemTitle"
                                        type="text"
                                        placeholder="Заглавие"
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label htmlFor="itemDescription" className="block text-sm/6 font-medium text-gray-900">
                                    Кратко описание
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="itemDescription"
                                        name="itemDescription"
                                        placeholder="Кратко описание на продукта ..."
                                        className="h-30 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    ></textarea>
                                </div>
                            </div>

                            {(selectedCategory === "Екипи" || selectedCategory === "Протектори") && (
                                <div className="sm:col-span-full">
                                    <label className="block text-sm font-medium text-gray-900">Налични размери *</label>
                                    <div className="mt-2 flex flex-col gap-2">
                                        {ITEMS_SIZES.map((size) => (
                                            <div key={size} className="flex items-center gap-4">
                                                {/* Clickable Size Box */}
                                                <div
                                                    onClick={() =>
                                                        setSizeData((prev) => {
                                                            const newData = { ...prev };
                                                            if (newData[size]) {
                                                                delete newData[size]; // Remove if already selected
                                                            } else {
                                                                newData[size] = { qtty: "", price: "", currency: "лв." }; // Default empty values
                                                            }
                                                            return newData;
                                                        })
                                                    }
                                                    className={`cursor-pointer flex items-center justify-center h-10 w-20 rounded-md border text-sm font-medium uppercase 
                                                        ${sizeData[size]
                                                            ? "bg-blue-500 text-white border-blue-600"
                                                            : "bg-white text-gray-900 border-gray-300"
                                                        }
                                                        hover:bg-indigo-50 hover:text-indigo-600 transition duration-200`}
                                                >
                                                    {size}
                                                </div>

                                                {/* Quantity Input Field (Shown Only When Size is Selected) */}
                                                {sizeData[size] && (
                                                    <>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            placeholder="Qtty"
                                                            className="h-10 w-20 px-2 border rounded-md text-center focus:ring-2 focus:ring-indigo-500"
                                                            value={sizeData[size].qtty}
                                                            onChange={(e) =>
                                                                setSizeData((prev) => ({
                                                                    ...prev,
                                                                    [size]: { ...prev[size], qtty: e.target.value },
                                                                }))
                                                            }
                                                        />

                                                        {/* Price Input Field (Styled as Requested) */}
                                                        <div className="sm:col-span-2 w-50">
                                                            <div className="mt-2 flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                                                <input
                                                                    type="text"
                                                                    placeholder="0.00"
                                                                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                                                    value={sizeData[size].price}
                                                                    onChange={(e) =>
                                                                        setSizeData((prev) => ({
                                                                            ...prev,
                                                                            [size]: { ...prev[size], price: e.target.value },
                                                                        }))
                                                                    }
                                                                />
                                                                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                                                                    <select
                                                                        aria-label="Currency"
                                                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                                        value={sizeData[size].currency}
                                                                        onChange={(e) =>
                                                                            setSizeData((prev) => ({
                                                                                ...prev,
                                                                                [size]: { ...prev[size], currency: e.target.value },
                                                                            }))
                                                                        }
                                                                    >
                                                                        <option>лв.</option>
                                                                        <option>EUR</option>
                                                                    </select>
                                                                    <ChevronDownIcon
                                                                        aria-hidden="true"
                                                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {(selectedCategory != "Екипи" && selectedCategory != "Протектори") && (
                                <>
                                    <hr className='border-t col-span-full border-sky-300' />
                                    <div className="sm:col-span-2 w-30 justify-self-end sm:col-start-3">
                                        <div className="flex items-center gap-2">
                                            <label htmlFor="itemQtty" className="block text-sm/6 font-medium text-gray-900">
                                                Количество
                                            </label>
                                        </div>
                                        <input
                                            id="itemQtty"
                                            name="itemQtty"
                                            type="number"
                                            placeholder="1"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mt-2"
                                        />
                                    </div>



                                    <div className="sm:col-span-2 w-50">
                                        <label htmlFor="itemPrice" className="block text-sm/6 font-medium text-gray-900">
                                            Цена *
                                        </label>
                                        <div className="mt-2 flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                            {/* <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">$</div> */}
                                            <input
                                                id="itemPrice"
                                                name="itemPrice"
                                                type="text"
                                                placeholder="0.00"
                                                step="0.01"
                                                min="0"
                                                required
                                                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                            />
                                            <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                                                <select
                                                    id="currency"
                                                    name="currency"
                                                    aria-label="Currency"
                                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                >
                                                    <option>лв.</option>
                                                    <option>EUR</option>
                                                </select>
                                                <ChevronDownIcon
                                                    aria-hidden="true"
                                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}


                        </div>
                    </div>


                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="itemStatus"
                            name="itemStatus"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="itemStatus" className="ml-2 text-sm text-gray-600">Публикувай</label>
                    </div>

                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Добави
                    </button>
                </div>
            </form >
        </div >
    );
}