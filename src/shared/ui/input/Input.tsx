import { FC, InputHTMLAttributes, useCallback } from 'react'
import { IMaskInput } from 'react-imask'
import styles from './Input.module.scss'
import classNames from 'classnames'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	mask?: string
	onAccept?: (value: string) => void
	defaultValue?: string
	value?: string
	error?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = ({
	label,
	mask,
	onAccept,
	onChange,
	...props
}) => {
	const handleAccept = useCallback(
		(value: string) => {
			if (onAccept) {
				onAccept(value)
			}
			if (onChange) {
				const event = {
					target: {
						name: props.name,
						value: value
					}
				} as React.ChangeEvent<HTMLInputElement>
				onChange(event)
			}
		},
		[onAccept, onChange, props.name]
	)

	return (
		<div className={styles.inputField}>
			{label && <label className={styles.label}>{label}</label>}
			{mask ? (
				<IMaskInput
					{...props}
					mask={mask}
					onAccept={handleAccept}
					className={classNames(styles.input, {
						[styles.inputError]: props.error
					})}
					pattern={props.name === 'birthday' ? 'd.m`.`Y' : ''}
					lazy={false}
					overwrite={true}
					autofix={'pad'}
				/>
			) : (
				<input
					{...props}
					onChange={onChange}
					className={classNames(styles.input, {
						[styles.inputError]: props.error
					})}
				/>
			)}
			{props.error && <span className={styles.error}>{props.error}</span>}
		</div>
	)
}
