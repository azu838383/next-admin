import { useEffect, useState } from "react";

type useWindowDimension = [width: number, height: number];

const useWindowDimensions = (): useWindowDimension => {
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);

	const handleWindowResize = (): void => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
	};

	useEffect(() => {
		// component is mounted and window is available
		handleWindowResize();
		window.addEventListener("resize", handleWindowResize);
		// unsubscribe from the event on component unmount
		return (): void => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	return [width, height];
};

export default useWindowDimensions;
