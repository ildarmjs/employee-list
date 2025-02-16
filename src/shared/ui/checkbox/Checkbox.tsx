import { FC, InputHTMLAttributes } from 'react'
import styles from './Checkbox.module.scss'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string
}

export const Checkbox: FC<CheckboxProps> = ({ label, ...props }) => (
	<div className={styles.checkboxField}>
		<label className={styles.label}>
			<input type='checkbox' {...props} className={styles.checkbox} />
			{label}
		</label>
	</div>
)
