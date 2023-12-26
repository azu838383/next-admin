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
		handleWindowResize();
		window.addEventListener("resize", handleWindowResize);
		return (): void => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	return [width, height];
};

export default useWindowDimensions;
