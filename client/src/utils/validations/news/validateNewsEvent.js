export const validateNewsEvent = (data, newsType) => {
    const errors = {};

    if (!data.title) {
        errors.title = "Задължително поле!";
    }

    if (!data.description) {
        errors.description = "Задължително поле!";
    }

    if (newsType === "event") {
        if (!data.eventLocation || !/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(data.eventLocation)) {
            errors.eventLocation = "Задължително поле!";
        }

        if (!data.eventDate) {
            errors.eventDate = "Задължително поле!";
        }
    }

    return errors;
};
