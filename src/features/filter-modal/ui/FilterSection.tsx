import { FilterItem } from '@/shared/api/types/Filter'

interface FilterSectionProps {
	item: FilterItem
	selected: string[]
	onToggle: (optionId: string) => void
}

export const FilterSection = ({
	item,
	selected,
	onToggle
}: FilterSectionProps) => (
	<section className="border-b border-line py-8 first:pt-0">
		<fieldset>
			<legend className="mb-6 text-2xl font-medium text-ink">
				{item.name}
			</legend>
			{item.description && (
				<p className="-mt-4 mb-6 text-sm text-gray-500">{item.description}</p>
			)}
			<ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
				{item.options.map(option => {
					const inputId = `${item.id}-${option.id}`
					return (
						<li key={option.id}>
							<label
								htmlFor={inputId}
								title={option.description}
								className="flex cursor-pointer items-center gap-3 text-base"
							>
								<input
									id={inputId}
									type="checkbox"
									checked={selected.includes(option.id)}
									onChange={() => onToggle(option.id)}
									className="wwt-checkbox"
								/>
								<span>{option.name}</span>
							</label>
						</li>
					)
				})}
			</ul>
		</fieldset>
	</section>
)
