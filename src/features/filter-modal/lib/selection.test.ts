import { FilterItem, FilterType } from '@/shared/api/types/Filter'

import { toSearchRequest, toSelection, toggleOption } from './selection'

const items: FilterItem[] = [
	{
		id: 'MEAL',
		name: 'MEAL',
		type: FilterType.OPTION,
		options: [
			{ id: 'a1', name: 'a1' },
			{ id: 'a2', name: 'a2' }
		]
	},
	{
		id: 'BED',
		name: 'BED',
		type: FilterType.OPTION,
		options: [{ id: 'b1', name: 'b1' }]
	}
]

describe('selection', () => {
	it('toggles an option on and off', () => {
		const on = toggleOption({}, 'MEAL', 'a1')
		expect(on).toEqual({ MEAL: ['a1'] })
		expect(toggleOption(on, 'MEAL', 'a1')).toEqual({ MEAL: [] })
	})

	it('builds SearchRequestFilter in API order and skips empty filters', () => {
		expect(toSearchRequest(items, { MEAL: ['a2', 'a1'], BED: [] })).toEqual([
			{ id: 'MEAL', type: FilterType.OPTION, optionsIds: ['a1', 'a2'] }
		])
	})

	it('round-trips saved filter into a draft selection', () => {
		const saved = toSearchRequest(items, { MEAL: ['a1'], BED: ['b1'] })
		expect(toSearchRequest(items, toSelection(saved))).toEqual(saved)
	})
})
