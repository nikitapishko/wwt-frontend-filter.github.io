import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilterStore } from '@/entities/filter'
import { FilterModal } from '@/features/filter-modal'

export const App = () => {
	const { t } = useTranslation('filter')
	const [open, setOpen] = useState(false)
	const filter = useFilterStore(state => state.filter)

	return (
		<main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col items-center gap-8 px-4 py-16">
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h1 className="text-center text-4xl text-gray-600 md:text-6xl">
				WinWinTravel frontend test task
			</h1>

			<button
				type="button"
				onClick={() => setOpen(true)}
				className="rounded-2xl bg-brand px-10 py-4 text-base font-semibold text-white hover:bg-brand-hover"
			>
				{t('openButton')}
			</button>

			<section className="w-full">
				<h2 className="mb-2 text-lg font-medium text-gray-700">
					{t('selectedTitle')}
				</h2>
				<pre
					data-testid="selected-filter"
					className="overflow-auto rounded-xl bg-gray-100 p-4 text-sm"
				>
					{JSON.stringify(filter, null, 2)}
				</pre>
			</section>

			<FilterModal
				open={open}
				onClose={() => setOpen(false)}
			/>
		</main>
	)
}
