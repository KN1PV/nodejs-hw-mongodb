const parseContactType = (type) => {
    const isString = typeof type === 'string';
    if (!isString) {
        return;
    };

    const allowedTypes = ['work', 'home', 'personal'];
    if (allowedTypes.includes(type)) {
        return type;
    };
};

const parseIsFavourite = (isFavourite) => {
    const isString = typeof isFavourite === 'string';
    if (!isString) {
        return;
    };

    if (isFavourite === 'true') {
        return true;
    };
    if (isFavourite === 'false') {
        return false;
    };
};

export const parseFilterParams = (query) => {
    const { contactType, isFavourite } = query;

    const parsedType = parseContactType(contactType);
    const parsedIsFavourite = parseIsFavourite(isFavourite);
    
    return {
        contactType: parsedType,
        isFavourite: parsedIsFavourite,
    };
};