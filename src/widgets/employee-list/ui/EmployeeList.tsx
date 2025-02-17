import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './EmployeeList.module.scss'
import { SortEmployee } from '../../../features/sort-employee'
import { Employee } from '../../../shared/types'
import { useEmployeeList } from '../lib/useEmployeeList'
import { FilterEmployees } from '../../../features/filter-employee'
import { ErrorBoundary } from '../../../shared/ui/error-boundary'
import { EmployeeCard } from '../../../entities/employee'

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
					<ErrorBoundary>
						<EmployeeCard employee={employee} key={employee.id} />
					</ErrorBoundary>
				))}
			</ul>
		</div>
	)
}
