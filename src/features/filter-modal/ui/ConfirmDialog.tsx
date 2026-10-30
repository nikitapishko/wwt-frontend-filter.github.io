import { useId } from 'react'
import { useTranslation } from 'react-i18next'

import { CloseIcon } from '@/shared/ui/CloseIcon'
import { Dialog } from '@/shared/ui/Dialog'

interface ConfirmDialogProps {
	open: boolean
	onConfirm: () => void
	onCancel: () => void
	onClose: () => void
}

export const ConfirmDialog = ({
	open,
	onConfirm,
	onCancel,
	onClose
}: ConfirmDialogProps) => {
	const { t } = useTranslation('filter')
	const titleId = useId()

	return (
		<Dialog
			open={open}
			onClose={onClose}
			labelledBy={titleId}
			className="w-[calc(100%-2rem)] max-w-[1280px]"
		>
			<div className="relative flex flex-col items-center gap-16 px-6 py-10 md:gap-24">
				<button
					type="button"
					onClick={onClose}
					aria-label={t('close')}
					className="absolute right-6 top-10 text-ink hover:opacity-70"
				>
					<CloseIcon />
				</button>
				<h2
					id={titleId}
					className="text-center text-3xl font-medium md:text-[40px]"
				>
					{t('confirm.title')}
				</h2>
				<div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
					<button
						type="button"
						onClick={onCancel}
						className="min-w-[280px] rounded-2xl border border-ink/60 px-10 py-5 text-base font-semibold hover:bg-gray-50"
					>
						{t('confirm.useOld')}
					</button>
					<button
						type="button"
						onClick={onConfirm}
						className="min-w-[280px] rounded-2xl bg-brand px-10 py-5 text-base font-semibold text-white hover:bg-brand-hover"
					>
						{t('confirm.applyNew')}
					</button>
				</div>
			</div>
		</Dialog>
	)
}
