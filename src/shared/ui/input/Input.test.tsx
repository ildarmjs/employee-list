import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Компонент Input', () => {
	it('корректно отображается с меткой', () => {
		render(<Input label='Test Label' />)
		expect(screen.getByText('Test Label')).toBeDefined()
	})

	it('правильно обрабатывает onChange', async () => {
		const handleChange = vi.fn()
		render(<Input onChange={handleChange} />)
		const input = screen.getByRole('textbox')
		await userEvent.type(input, 'test')
		expect(handleChange).toHaveBeenCalled()
	})

	it('отображает сообщение об ошибке, когда оно предоставлено', () => {
		render(<Input error='Error message' />)
		expect(screen.getByText('Error message')).toBeDefined()
	})

	it('корректно применяет маску', async () => {
		render(<Input mask='+7 (000) 000-0000' />)
		const input = screen.getByRole('textbox')
		await userEvent.type(input, '9123456789')
		await waitFor(() => {
			expect(input).toHaveValue('+7 (912) 345-6789')
		})
	})

	it('вызывает onAccept, когда маска заполнена', async () => {
		const handleAccept = vi.fn()
		render(<Input mask='+7 (000) 000-0000' onAccept={handleAccept} />)
		const input = screen.getByRole('textbox')
		await userEvent.type(input, '9123456789')
		await waitFor(() => {
			expect(handleAccept).toHaveBeenCalledWith('+7 (912) 345-6789')
		})
	})

	it('правильно обрабатывает маску для даты рождения', async () => {
		render(<Input mask='00.00.0000' name='birthday' />)
		const input = screen.getByRole('textbox')
		await userEvent.type(input, '01022000')
		await waitFor(() => {
			expect(input).toHaveValue('01.02.2000')
		})
	})
})
