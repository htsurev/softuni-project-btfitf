import { Link } from 'react-router-dom'; // Note: Using 'react-router-dom' instead of 'react-router'
import { navigation } from '../header/navigation';

export default function Education() {
    const education = navigation.find(item => item.href === '/education');

    if (education && education.submenu) {
        return (
            <div className="flex flex-col justify-center items-center p-8 text-white mt-10">
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-7xl justify-center">
                    {education.submenu.map(subItem => (
                        <Link
                            to={subItem.href}
                            key={subItem.id}
                            className="bg-gray-100 rounded-xl px-4 text-left shadow-md flex flex-col justify-center items-center h-full transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-white hover:border-gray-300 border-1"
                        >
                            <div className="flex justify-center items-center w-full h-full">
                                <h4 className="font-semibold text-gray-900 my-3">{subItem.name}</h4>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col justify-center items-center p-8 text-white mt-10">
                <p>Няма намерени материали ...</p>
            </div>
        );
    }
}
