import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Employee } from '../../../shared/types'
import styles from './EmployeeCard.module.scss'

interface EmployeeCardProps {
	employee: Employee
}

export const EmployeeCard: FC<EmployeeCardProps> = ({ employee }) => {
	if (employee.id === 3 || employee.id === 1) {
		throw new Error('Искусственная ошибка в EpisodeCard')
	}
	return (
		<Link to={`/employees/${employee.id}`} className={styles.employeeLink}>
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
	)
}
