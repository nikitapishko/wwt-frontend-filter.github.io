import { FilterItem } from '@/shared/api/types/Filter'

interface FilterResponse {
	filterItems: FilterItem[]
}

/**
 * Emulates an API request. The data is loaded lazily from the local JSON
 * so it can be swapped for a real `fetch` call without touching consumers.
 */
export const getFilters = async (): Promise<FilterItem[]> => {
	const data = (await import('@/shared/temp/filterData.json'))
		.default as unknown as FilterResponse
	return data.filterItems
}
