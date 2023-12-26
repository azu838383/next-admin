import React from 'react'
import LoaderComp from './LoaderComp'
import ErrorComp from './ErrorComp'
import EmptyComp from './EmptyComp'
import type { KeyedMutator } from 'swr'
import Image from 'next/image'
import { IconFileDatabase } from '@tabler/icons-react'

const LoaderComponent = ({
	children,
	compLoading,
	compError,
	compEmpty,
	errorText,
	loadingText,
	withText,
	emptyText,
	mutateData,
	dataRecord
}: {
	children: React.ReactNode
	compLoading: boolean
	compError: any
	compEmpty?: boolean
	errorText?: string
	dataRecord?: boolean
	loadingText?: string
	withText?: boolean
	emptyText?: string
	mutateData?: KeyedMutator<any>
}): JSX.Element => {

	return (
		<>
			{compLoading ? (
				<div className="relative h-full">
					<LoaderComp
						loadingText={loadingText}
						withText={withText ?? true}
					/>
				</div>
			) : compError ? (
				<div className="relative h-full">
					<ErrorComp
						mutateData={mutateData}
						errorText={errorText}
					/>
				</div>
			) : compEmpty ? (
				<div className="relative h-full">
					<EmptyComp
						emptyText={emptyText}
					/>
				</div>
			) : (
				<div className="relative w-full">{children}</div>
			)}
		</>
	)
}

export default LoaderComponent
