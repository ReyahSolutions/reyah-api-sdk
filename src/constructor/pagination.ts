import { PaginationStatus } from '../types/pagination';

/**
 * Pagination status response
 */
export default function newPaginationStatus(obj?: any): PaginationStatus {
    if (typeof obj !== 'object') {
        return {
            current_page: 0,
            current_size: 0,
            page_size: 0,
            total_entries: 0,
            total_pages: 0,
        };
    }
    return {
        current_page: parseInt(obj.current_page, 10),
        current_size: parseInt(obj.current_size, 10),
        page_size: parseInt(obj.page_size, 10),
        total_entries: parseInt(obj.total_entries, 10),
        total_pages: parseInt(obj.total_pages, 10),
    };
}
