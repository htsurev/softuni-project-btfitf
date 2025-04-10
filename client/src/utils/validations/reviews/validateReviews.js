export function validateReviews(data) {
    const errors = {};

    const validTextPattern = /^[a-zA-Zа-яА-ЯёЁ0-9\s]+$/;

    if (!data.reviewTite || !validTextPattern.test(data.reviewTite)) {
        errors.reviewTite = "Заглавието е задължително и трябва да съдържа само букви, цифри и интервали.";
    }

    if (!data.reviewDescription || !validTextPattern.test(data.reviewDescription)) {
        errors.reviewDescription = "Описанието е задължително и трябва да съдържа само букви, цифри и интервали.";
    }

    if (!data.rate || isNaN(data.rate) || data.rate < 1 || data.rate > 5) {
        errors.rate = "Моля, изберете оценка от 1 до 5 звезди.";
    }

    return errors;
}
