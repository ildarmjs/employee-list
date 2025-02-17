import React, { ErrorInfo } from 'react'
import styles from './ErrorBoundary.module.scss'

interface ErrorBoundaryProps {
	children: React.ReactNode
}

interface ErrorBoundaryState {
	hasError: boolean
}

export class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
		console.log('error', error)

		return { hasError: true }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Ошибка поймана в ErrorBoundary:', error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return <div className={styles.errorBoundary}>Что-то пошло не так.</div>
		}

		return this.props.children
	}
}
