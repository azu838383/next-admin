const disablePullToRefresh = (): void => {
	const container = document.querySelector("body");

	container?.addEventListener(
		"touchstart",
		(e) => {
			if (e.touches.length > 1) {
				return;
			}
			const startTopScroll = container.scrollTop;

			if (startTopScroll <= 0) {
				container.scrollTop = 1;
			}

			if (
				startTopScroll + container.offsetHeight >=
				container.scrollHeight
			) {
				container.scrollTop =
					container.scrollHeight - container.offsetHeight - 1;
			}
		},
		{ passive: false }
	);
};

export default disablePullToRefresh;
