export const navigation = [
    { id: 1, name: 'Начало', href: '/' },
    { id: 2, name: 'За нас', href: '/about-us' },
    { id: 3, name: 'Новини', href: '/news' },
    {
        id: 4,
        name: 'Обучение',
        href: '/education',
        submenu: [
            { id: 41, name: 'История', href: '/education/history' },
            { id: 42, name: 'Теория', href: '/education/theory' },
            { id: 43, name: 'Форми', href: '/education/forms' },
            { id: 44, name: 'Терминология', href: '/education/terminology' },
            { id: 45, name: 'Статии', href: '/education/articles' },
        ]
    },
    { id: 5, name: 'Календар', href: '/calendar' },
    // { id: 6, name: 'Контакти', href: '/contact' },
    { id: 7, name: 'Магазин', href: '/store' },
];