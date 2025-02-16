import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addEmployee } from '../../../entities/employee'
import { Button } from '../../../shared/ui/button'
import { Checkbox } from '../../../shared/ui/checkbox'
import { Input } from '../../../shared/ui/input'
import { Select } from '../../../shared/ui/select'
import styles from './AddEmployee.module.scss'
import { useEmployeeForm } from '../../../shared/lib'

interface AddEmployeeProps {}

export const AddEmployee: FC<AddEmployeeProps> = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const {
		formData,
		errors,
		validateForm,
		handleChange,
		handleCheckboxChange,
		handleAccept
	} = useEmployeeForm()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (validateForm()) {
			dispatch(addEmployee(formData))
			navigate('/')
		}
	}

	return (
		<form onSubmit={handleSubmit} className={styles.addEmployeeForm}>
			<h2 className={styles.title}>Добавление нового сотрудника</h2>
			<div className={styles.formGroup}>
				<Input
					name='name'
					value={formData.name}
					onChange={handleChange}
					label='Имя'
					className={styles.input}
					error={errors.name}
				/>
			</div>
			<div className={styles.formGroup}>
				<Input
					name='phone'
					value={formData.phone}
					onChange={handleChange}
					onAccept={(value: string) => handleAccept('phone', value)}
					label='Телефон'
					mask='+7 (000) 000-0000'
					className={styles.input}
					error={errors.phone}
				/>
			</div>
			<div className={styles.formGroup}>
				<Input
					name='birthday'
					value={formData.birthday}
					onChange={handleChange}
					onAccept={(value: string) => handleAccept('birthday', value)}
					label='Дата рождения'
					mask='00.00.0000'
					// mask='dd.mm.yyyy'
					className={styles.input}
					error={errors.birthday}
				/>
			</div>
			<div className={styles.formGroup}>
				<Select
					name='role'
					value={formData.role}
					onChange={handleChange}
					label='Должность'
					options={[
						{ value: 'driver', label: 'Водитель' },
						{ value: 'waiter', label: 'Официант' },
						{ value: 'cook', label: 'Повар' }
					]}
					className={styles.select}
				/>
			</div>
			<div className={styles.formGroupCheckbox}>
				<Checkbox
					name='isArchive'
					checked={formData.isArchive}
					onChange={handleCheckboxChange}
					label='В архиве'
					className={styles.checkbox}
				/>
			</div>
			<Button type='submit' className={styles.submitButton}>
				Добавить сотрудника
			</Button>
		</form>
	)
}
