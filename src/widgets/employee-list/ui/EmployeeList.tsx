import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './EmployeeList.module.scss'
import { SortEmployee } from '../../../features/sort-employee'
import { Employee } from '../../../shared/types'
import { useEmployeeList } from '../lib/useEmployeeList'
import { FilterEmployees } from '../../../features/filter-employee'

export const EmployeeList: FC = () => {
	const { sortedEmployees, handleSort } = useEmployeeList()

	return (
		<div className={styles.container}>
			<SortEmployee onClick={handleSort} />
			<Link to='/employees/add' className={styles.employeeLinkAdd}>
				Добавить сотрудника
			</Link>
			<FilterEmployees />
			<ul className={styles.employeeList}>
				{sortedEmployees.map((employee: Employee) => (
					<Link
						key={employee.id}
						to={`/employees/${employee.id}`}
						className={styles.employeeLink}
					>
						<li className={styles.employeeItem}>
							<div className={styles.employeeName}>{employee.name}</div>
							<div className={styles.employeeRole}>
								{employee.role === 'driver'
									? 'Водитель'
									: employee.role === 'waiter'
									? 'Официант'
									: 'Повар'}
							</div>
							<div className={styles.employeePhone}>{employee.phone}</div>
						</li>
					</Link>
				))}
			</ul>
		</div>
	)
}
