import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'

export const useEmployeeList = () => {
	const { employees, filter } = useSelector(
		(state: RootState) => state.employee
	)
	const [sortField, setSortField] = useState<'name' | 'birthday' | null>(null)

	const filteredEmployees = useMemo(() => {
		return employees.filter(employee => {
			if (filter.role && employee.role !== filter.role) return false
			if (filter.isArchive === true && !employee.isArchive) return false
			return true
		})
	}, [employees, filter])

	const sortedEmployees = useMemo(() => {
		if (!sortField) return filteredEmployees
		return [...filteredEmployees].sort((a, b) => {
			if (sortField === 'name') {
				return a.name.localeCompare(b.name)
			} else {
				const dateA = a.birthday.split('.').reverse().join('-')
				const dateB = b.birthday.split('.').reverse().join('-')
				return new Date(dateA).getTime() - new Date(dateB).getTime()
			}
		})
	}, [filteredEmployees, sortField])

	const handleSort = (field: 'name' | 'birthday') => {
		setSortField(field)
	}

	return { sortedEmployees, handleSort }
}
