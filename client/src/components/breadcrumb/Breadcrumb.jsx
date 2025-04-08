import { useLocation, Link } from "react-router-dom";

const translations = {
    education: "Обучение",
    news: "Новини",
    history: "История",
    theory: "Теория",
    terminology: "Терминология",
    details: "Детайли",
    contact: "Контакт",
    'about-us': "За нас",
};

export default function Breadcrumb() {
    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter(segment => segment);

    return (
        <div className="mb-6 text-sm text-gray-600">
            {pathSegments.map((segment, index) => (
                <span key={index}>
                    {index > 0 && <span className="mx-2">/</span>}
                    {index === 0 ? (
                        // First segment as Link
                        <Link to={`/${segment}`} className="text-blue-500 hover:underline">
                            {translations[segment] || segment}
                        </Link>
                    ) : (
                        // Remaining segments - translated name
                        <span>{translations[segment] || segment}</span>
                    )}
                </span>
            ))}
        </div>
    );
}
