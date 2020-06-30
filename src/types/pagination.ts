/**
 * Pagination interface for request
 */
export interface Pagination {
    page: number,
    size: number,
}

/**
 * Pagination interface for status of the pagination
 */
export interface PaginationStatus {
    page_size: number,
    total_pages: number,
    total_entries: number,
    current_size: number,
    current_page: number,
}
