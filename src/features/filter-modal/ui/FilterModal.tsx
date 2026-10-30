import { useEffect, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilterStore } from '@/entities/filter'
import { useFiltersQuery } from '@/shared/api/filters'
import { CloseIcon } from '@/shared/ui/CloseIcon'
import { Dialog } from '@/shared/ui/Dialog'

import {
	Selection,
	isSameFilter,
	toSearchRequest,
	toSelection,
	toggleOption
} from '../lib/selection'
import { ConfirmDialog } from './ConfirmDialog'
import { FilterSection } from './FilterSection'

interface FilterModalProps {
	open: boolean
	onClose: () => void
}

export const FilterModal = ({ open, onClose }: FilterModalProps) => {
	const { t } = useTranslation('filter')
	const titleId = useId()
	const { data, isPending, isError, refetch } = useFiltersQuery()
	const saved = useFilterStore(state => state.filter)
	const setFilter = useFilterStore(state => state.setFilter)

	const [draft, setDraft] = useState<Selection>({})
	const [confirmOpen, setConfirmOpen] = useState(false)

	// Pre-fill the draft with the saved filter every time the modal opens
	useEffect(() => {
		if (open) {
			setDraft(toSelection(saved))
		}
	}, [open])

	const items = data ?? []
	const next = toSearchRequest(items, draft)

	const handleApply = () => {
		if (isSameFilter(next, saved)) {
			onClose()
			return
		}
		setConfirmOpen(true)
	}

	const handleConfirm = () => {
		setFilter(next)
		setConfirmOpen(false)
		onClose()
	}

	const handleUseOld = () => {
		setConfirmOpen(false)
		onClose()
	}

	return (
		<>
			<Dialog
				open={open && !confirmOpen}
				onClose={onClose}
				labelledBy={titleId}
				className="h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[1280px]"
			>
				<div className="flex h-full flex-col">
					<header className="relative border-b border-line px-6 py-8 md:px-8">
						<h2
							id={titleId}
							className="text-center text-3xl font-medium md:text-[40px]"
						>
							{t('title')}
						</h2>
						<button
							type="button"
							onClick={onClose}
							aria-label={t('close')}
							className="absolute right-6 top-1/2 -translate-y-1/2 hover:opacity-70"
						>
							<CloseIcon />
						</button>
					</header>

					<div className="flex-1 overflow-y-auto px-6 py-8 md:px-8">
						{isPending && <p className="text-gray-500">{t('loading')}</p>}
						{isError && (
							<div className="flex flex-col items-start gap-4">
								<p className="text-red-600">{t('error')}</p>
								<button
									type="button"
									onClick={() => refetch()}
									className="rounded-xl border border-ink/60 px-4 py-2"
								>
									{t('retry')}
								</button>
							</div>
						)}
						{items.map(item => (
							<FilterSection
								key={item.id}
								item={item}
								selected={draft[item.id] ?? []}
								onToggle={optionId =>
									setDraft(prev => toggleOption(prev, item.id, optionId))
								}
							/>
						))}
					</div>

					<footer className="relative flex flex-col items-center gap-4 border-t border-line px-6 py-8 md:flex-row md:justify-center md:px-8">
						<button
							type="button"
							onClick={handleApply}
							disabled={isPending || isError}
							className="min-w-[184px] rounded-2xl bg-brand px-10 py-5 text-base font-semibold text-white hover:bg-brand-hover disabled:opacity-50"
						>
							{t('apply')}
						</button>
						<button
							type="button"
							onClick={() => setDraft({})}
							className="text-base font-medium text-link underline underline-offset-4 hover:opacity-80 md:absolute md:right-8"
						>
							{t('clearAll')}
						</button>
					</footer>
				</div>
			</Dialog>

			<ConfirmDialog
				open={open && confirmOpen}
				onConfirm={handleConfirm}
				onCancel={handleUseOld}
				onClose={() => setConfirmOpen(false)}
			/>
		</>
	)
}
