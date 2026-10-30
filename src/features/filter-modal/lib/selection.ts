import { FilterItem, FilterType } from '@/shared/api/types/Filter'
import { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

/** Map of filter id -> selected option ids */
export type Selection = Record<string, string[]>

export const toSelection = (filter: SearchRequestFilter): Selection =>
	Object.fromEntries(filter.map(item => [item.id, [...item.optionsIds]]))

/**
 * Converts the draft selection to the API output format.
 * Keeps the order of filters/options as provided by the API and
 * drops filters without selected options.
 */
export const toSearchRequest = (
	items: FilterItem[],
	selection: Selection
): SearchRequestFilter =>
	items.flatMap(item => {
		const selected = new Set(selection[item.id] ?? [])
		const optionsIds = item.options
			.map(option => option.id)
			.filter(id => selected.has(id))
		return optionsIds.length
			? [{ id: item.id, type: FilterType.OPTION, optionsIds }]
			: []
	})

export const toggleOption = (
	selection: Selection,
	filterId: string,
	optionId: string
): Selection => {
	const current = selection[filterId] ?? []
	const next = current.includes(optionId)
		? current.filter(id => id !== optionId)
		: [...current, optionId]
	return { ...selection, [filterId]: next }
}

export const isSameFilter = (
	first: SearchRequestFilter,
	second: SearchRequestFilter
) => JSON.stringify(first) === JSON.stringify(second)
