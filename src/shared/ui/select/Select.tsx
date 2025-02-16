import { FC, SelectHTMLAttributes } from 'react'
import styles from './Select.module.scss'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string
	options: { value: string; label: string }[]
}

export const Select: FC<SelectProps> = ({ label, options, ...props }) => (
	<div className={styles.selectField}>
		{label && <label className={styles.label}>{label}</label>}
		<select {...props} className={styles.select}>
			{options.map(option => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	</div>
)
