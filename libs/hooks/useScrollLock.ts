// hooks/useScrollLock.ts
import { useEffect } from "react";

const useScrollLock = (isLocked: boolean): void => {
	useEffect(() => {
		if (isLocked) {
			document.body.classList.add("no-scroll");
		} else {
			document.body.classList.remove("no-scroll");
		}

		return () => {
			document.body.classList.remove("no-scroll");
		};
	}, [isLocked]);
};

export default useScrollLock;
