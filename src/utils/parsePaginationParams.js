const parseNumber = (number, defaultValue) => {
  const isString = typeof number === 'string';
  if (!isString) {
    return defaultValue;
  }

  const parsedValue = parseInt(number, 10);
  if (Number.isNaN(parsedValue)) {
    return defaultValue;
  }

  return parsedValue;
};

export const parsePaginationParams = (query = {}) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};