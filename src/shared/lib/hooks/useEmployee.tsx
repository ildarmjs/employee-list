import { useState } from 'react'
import { Employee } from '../../types'

export const useEmployeeForm = (initialData?: Partial<Employee>) => {
	const [formData, setFormData] = useState<Omit<Employee, 'id'>>({
		name: initialData?.name || '',
		phone: initialData?.phone || '',
		birthday: initialData?.birthday || '',
		role: initialData?.role || 'driver',
		isArchive: initialData?.isArchive || false
	})
	const [errors, setErrors] = useState<{ [key: string]: string }>({})

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {}

		if (!formData.name.trim()) {
			newErrors.name = 'Имя обязательно для заполнения'
		}

		if (!formData.phone.trim()) {
			newErrors.phone = 'Телефон обязателен для заполнения'
		} else if (!/^\+7 \(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) {
			newErrors.phone = 'Неверный формат телефона'
		}

		if (!formData.birthday.trim()) {
			newErrors.birthday = 'Дата рождения обязательна для заполнения'
		} else {
			const [day, month, year] = formData.birthday.split('.')
			const date = new Date(+year, +month - 1, +day)
			if (isNaN(date.getTime()) || date > new Date()) {
				newErrors.birthday = 'Неверная дата рождения'
			}
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
		setErrors(prev => ({ ...prev, [name]: '' }))
	}

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target
		setFormData(prev => ({ ...prev, [name]: checked }))
	}
	const handleAccept = (name: string, value: string) => {
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	return {
		formData,
		setFormData,
		errors,
		validateForm,
		handleChange,
		handleCheckboxChange,
		handleAccept
	}
}
