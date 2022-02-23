import { useCallback, useRef } from 'react';

const useDebounce = (callback: () => void, delay: number) => {
	const timer = useRef(null);

	const debounceCallback = useCallback(() => {
		if (timer.current) {
			clearTimeout(timer.current);
		}

		timer.current = setTimeout(() => {
			callback();
		}, delay);
	}, [callback, delay]);

	return debounceCallback;
};

export default useDebounce;
