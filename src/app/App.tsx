import { FC } from 'react'
import { RouterProvider, StoreProvider } from './providers'
import { Route, Routes } from 'react-router-dom'
import { EmployeeListPage } from '../pages/employee-list-page'
import { EmployeeEditPage } from '../pages/employee-edit-page/ui/EmployeeEditPage'
import { EmployeeAddPage } from '../pages/employee-add/ui/EmployeeAddPage'

interface AppProps {}

export const App: FC<AppProps> = ({}) => {
	return (
		<StoreProvider>
			<RouterProvider>
				<Routes>
					<Route path='/' element={<EmployeeListPage />} />
					<Route path='/employees/:id' element={<EmployeeEditPage />} />
					<Route path='/employees/add' element={<EmployeeAddPage />} />
				</Routes>
			</RouterProvider>
		</StoreProvider>
	)
}
