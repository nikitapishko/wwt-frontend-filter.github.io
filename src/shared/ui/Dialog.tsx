import { ReactNode, useEffect, useRef } from 'react'

interface DialogProps {
	open: boolean
	onClose: () => void
	labelledBy: string
	className?: string
	children: ReactNode
}

/**
 * Thin wrapper around the native <dialog> element: gives us focus trapping,
 * Esc handling and the top layer for free.
 */
export const Dialog = ({
	open,
	onClose,
	labelledBy,
	className = '',
	children
}: DialogProps) => {
	const ref = useRef<HTMLDialogElement>(null)

	useEffect(() => {
		const dialog = ref.current
		if (!dialog) {
			return
		}
		if (open && !dialog.open) {
			dialog.showModal?.()
		} else if (!open && dialog.open) {
			dialog.close?.()
		}
	}, [open])

	return (
		<dialog
			ref={ref}
			aria-labelledby={labelledBy}
			onCancel={event => {
				event.preventDefault()
				onClose()
			}}
			onClick={event => {
				if (event.target === ref.current) {
					onClose()
				}
			}}
			className={`m-auto rounded-2xl bg-white p-0 text-ink shadow-2xl backdrop:bg-black/40 open:animate-in open:fade-in open:zoom-in-95 ${className}`}
		>
			{open && children}
		</dialog>
	)
}
