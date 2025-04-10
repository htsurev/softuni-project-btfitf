export const validateStore = (data) => {
    const errors = {}

    if (!data.itemTitle || !/^[a-zA-Zа-яА-ЯёЁ0-9\s"_\-\(\)]+$/.test(data.itemTitle)) {
        errors.itemTitle = "Заглавието е задължително и трябва да съдържа само букви (на кирилица или латиница), цифри, интервали, тирета, кавички или скоби.";
    }
    
    if (!data.itemDescription) {
        errors.itemDescription = "Напишете кратко описание на артикула!";
    }

    if (!data.toggleSizes) {
        if (!data.itemQtty || isNaN(data.itemQtty) || data.itemQtty < 0 || data.itemQtty > 1000) {
            errors.itemQtty = "Количеството трябва да е положително число до 1000!";
        }

        if (!data.itemPrice || isNaN(data.itemPrice) || data.itemPrice <= 0) {
            errors.itemPrice = "Цената трябва да е положително число!";
        }

    } else {
        if (Object.keys(data.sizeData).length === 0) {
            errors.sizeData = "Трябва да добавите поне един размер!";
        }

        for (const size in data.sizeData) {
            if (!data.sizeData[size].qtty || isNaN(data.sizeData[size].qtty) || data.sizeData[size].qtty <= 0 || data.sizeData[size].qtty > 1000) {
                errors[`sizeData-${size}-qtty`] = `Количеството за размер ${size} трябва да е положително число до 1000!`;
            }

            if (!data.sizeData[size].price || isNaN(data.sizeData[size].price) || data.sizeData[size].price <= 0) {
                errors[`sizeData-${size}-price`] = `Цената за размер ${size} трябва да е положително число!`;
            }
        }
    }

    return errors;
};
