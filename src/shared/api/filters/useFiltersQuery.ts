import { useQuery } from '@tanstack/react-query'

import { getFilters } from './getFilters'

export const filtersQueryKey = ['filters'] as const

export const useFiltersQuery = () =>
	useQuery({
		queryKey: filtersQueryKey,
		queryFn: getFilters,
		staleTime: Infinity
	})
