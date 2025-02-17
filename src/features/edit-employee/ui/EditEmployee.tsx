import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../../app/store'
import { updateEmployee } from '../../../entities/employee'
import { Button } from '../../../shared/ui/button'
import { Checkbox } from '../../../shared/ui/checkbox'
import { Input } from '../../../shared/ui/input'
import { Select } from '../../../shared/ui/select'
import styles from './EditEmployee.module.scss'
import { useEmployeeForm } from '../../../shared/lib'

interface EditEmployeeProps {}

export const EditEmployee: FC<EditEmployeeProps> = () => {
	const { id } = useParams<{ id: string }>()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const employee = useSelector((state: RootState) =>
		state.employee.employees.find(e => e.id === Number(id))
	)

	const {
		formData,
		setFormData,
		errors,
		validateForm,
		handleChange,
		handleCheckboxChange
	} = useEmployeeForm(employee)

	useEffect(() => {
		if (employee) {
			setFormData(employee)
		}
	}, [employee, setFormData])

	if (!employee) return <div>Сотрудник не найден</div>

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (validateForm()) {
			dispatch(updateEmployee({ ...employee, ...formData }))
			navigate('/')
		}
	}

	return (
		<form onSubmit={handleSubmit} className={styles.editEmployeeForm}>
			<h2 className={styles.title}>Редактирование сотрудника</h2>
			<div className={styles.formGroup}>
				<Input
					name='name'
					value={formData.name}
					onChange={handleChange}
					label='Имя и Фамилия'
					className={styles.input}
					error={errors.name}
				/>
			</div>
			<div className={styles.formGroup}>
				<Input
					name='phone'
					value={formData.phone}
					onChange={handleChange}
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
					label='Дата рождения'
					className={styles.input}
					mask='00.00.0000'
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
				Сохранить
			</Button>
		</form>
	)
}
