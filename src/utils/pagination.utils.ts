export const getPagination = (
  totalData: number,
  perPage: number,
  currentPage: number
) => {
    // 3
    // 3
  const totalPages = Math.ceil(totalData / perPage);
  const nextPage = totalPages > currentPage ? currentPage + 1 : null;
  const prevPage = currentPage > 1 ? currentPage - 1 : null;

  return {
    totalData,
    totalPages,
    nextPage,
    prevPage,
    hasNextPage: totalPages > currentPage,
    hasPrevPage: currentPage > 1,
  };
};
