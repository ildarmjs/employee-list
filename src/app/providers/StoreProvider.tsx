import { FC } from 'react'
import { Provider } from 'react-redux'
import { store } from '../store'

interface storeProvidersProps {
	children: React.ReactNode
}

export const StoreProvider: FC<storeProvidersProps> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>
}
