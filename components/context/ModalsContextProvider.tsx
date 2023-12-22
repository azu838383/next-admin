import React, { createContext, useContext, useState } from "react";

type ModalStates = Record<string, boolean>;

interface ModalContextType {
	modalStates: ModalStates;
	showModal: (modalId: string) => void;
	hideModal: (modalId: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
	const ctx = useContext(ModalContext);
	if (!ctx) {
		throw new Error("useModal must be used within a ModalProvider");
	}
	return ctx;
};

export function ModalProvider({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	const [modalStates, setModalStates] = useState<ModalStates>({});

	const showModal = (modalId: string): void => {
		setModalStates((prevModalStates) => ({
			...prevModalStates,
			[modalId]: true,
		}));
	};

	const hideModal = (modalId: string): void => {
		setModalStates((prevModalStates) => ({
			...prevModalStates,
			[modalId]: false,
		}));
	};

	return (
		<ModalContext.Provider value={{ modalStates, showModal, hideModal }}>
			{children}
		</ModalContext.Provider>
	);
}
