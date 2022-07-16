export interface Page<T> {
    pages: number;
    total: number;
    hasNext: boolean;
    hasPrevious: boolean;
    currentPage: boolean;
    results: Array<T>;
}