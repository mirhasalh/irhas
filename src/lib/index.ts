// place files you want to import through the `$lib` alias in this folder.
/**
 * Paginates an array of data.
 *
 * @param {any[]} data
 * @param {{ page?: number, limit: number }} args
 * @returns {any[]}
 */
export function paginate(data: any[], { page = 1, limit }: { page?: number; limit: number } = {}): any[] {
    if (limit) {
        return data.slice((page - 1) * limit, page * limit);
    }

    return data;
}
