import { useEffect, useRef } from 'react';

const useThrottledScroll = (callback, throttleTime = 100) => {
	const lastScrollTime = useRef(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentTime = new Date().getTime();

			if (currentTime - lastScrollTime.current >= throttleTime) {
				callback();
				lastScrollTime.current = currentTime;
			}
		};

		// Add the throttled callback to the scroll event
		window.addEventListener('scroll', handleScroll);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [callback, throttleTime]);

	return callback; // Expose the callback for external use (optional)
};

export default useThrottledScroll;
