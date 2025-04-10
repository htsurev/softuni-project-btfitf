export const validateClubs = (data) => {
    const errors = {}

    if (!data.clubName || !/^[a-zA-Zа-яА-ЯёЁ\s"_\-]+$/.test(data.clubName)) {
        errors.clubName = "Задължително поле!";
    }

    if (!data.city || !/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(data.city)) {
        errors.city = "Задължително поле!";
    }

    if (!/^\d{4}$/.test(data.postcode)) {
        errors.postcode = "Трябва да въведете точно 4 цифри!";
    }

    if (!data.address) {
        errors.address = "Задължително поле!";
    }

    if (!data.phoneNumberOne) {
        errors.phoneNumberOne = "Задължително поле!";
    } else {
        let phoneNumberOne = data.phoneNumberOne.trim();
        if (phoneNumberOne.startsWith("0")) {
            phoneNumberOne = "+359" + phoneNumberOne.slice(1);
        }

        if (!/^\+359\d{9}$/.test(phoneNumberOne)) {
            errors.phoneNumberOne = "Невалиден телефонен номер!";
        }
    }

    if (data.phoneNumberTwo) {
        let phoneNumberTwo = data.phoneNumberTwo.trim();
        if (phoneNumberTwo.startsWith("0")) {
            phoneNumberTwo = "+359" + phoneNumberTwo.slice(1);
        }

        if (!/^\+359\d{9}$/.test(phoneNumberTwo)) {
            errors.phoneNumberTwo = "Невалиден втори телефонен номер!";
        }
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!data.email) {
        errors.email = "Задължително поле!";
    } else if (!emailRegex.test(data.email)) {
        errors.email = "Невалиден имейл адрес!";
    }

    return errors;
};
