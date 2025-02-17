import { FC } from 'react'
import styles from './SortEmployee.module.scss'
import { Button } from '../../../shared/ui/button'
interface SortEmployeeProps {
	onClick: (val: 'name' | 'birthday') => void
}

export const SortEmployee: FC<SortEmployeeProps> = ({ onClick }) => {
	return (
		<div className={styles.sortButtons}>
			<Button className={styles.sortButton} onClick={() => onClick('name')}>
				Сортировать по имени
			</Button>
			<Button className={styles.sortButton} onClick={() => onClick('birthday')}>
				Сортировать по дате рождения
			</Button>
		</div>
	)
}
