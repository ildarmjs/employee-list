import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../../../entities/employee'
import { RootState } from '../../../app/store'
import styles from './FilterEmployees.module.scss'

interface FilterEmployeesProps {}

const FilterEmployees: FC<FilterEmployeesProps> = () => {
	const dispatch = useDispatch()
	const filter = useSelector((state: RootState) => state.employee.filter)

	const handleFilterChange = (
		e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
	) => {
		const target = e.target as HTMLSelectElement | HTMLInputElement
		const value =
			target.type === 'checkbox'
				? (target as HTMLInputElement).checked
				: target.value

		dispatch(
			setFilter({
				...filter,
				[target.name]: value
			})
		)
	}

	return (
		<div className={styles.filterEmployees}>
			<select
				className={styles.select}
				name='role'
				value={filter.role || ''}
				onChange={handleFilterChange}
			>
				<option value=''>Все должности</option>
				<option value='driver'>Водитель</option>
				<option value='waiter'>Официант</option>
				<option value='cook'>Повар</option>
			</select>
			<label className={styles.checkboxLabel}>
				<input
					className={styles.checkbox}
					type='checkbox'
					name='isArchive'
					checked={filter.isArchive || false}
					onChange={handleFilterChange}
				/>
				В архиве
			</label>
		</div>
	)
}

export default FilterEmployees
