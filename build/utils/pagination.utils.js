"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = void 0;
const getPagination = (totalData, perPage, currentPage) => {
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
exports.getPagination = getPagination;
