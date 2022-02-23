import { useState, useEffect } from 'react';

// takes getting function (in this function state isLast must be changed), refs for calculating scroll params, isLast state
// returns setCurrentPage if we need it or can be called as usePagination(params) without assigning to

const usePagination = (
	getItems: (page: number, size?: number, ...params: any) => Promise<any>,
	scrollRef: React.RefObject<HTMLElement>,
	isLast: boolean
) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [paginationLoading, setPaginationLoading] = useState<boolean>(false);

	const getNewJobs = (page: number) => {
		getItems(page);
		setPaginationLoading(false);
	};

	const scrollHandler = (e: any) => {
		if (
			!isLast &&
			e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) === 0
		) {
			setPaginationLoading(true);
		}
	};

	useEffect(() => {
		if (paginationLoading) {
			setCurrentPage((prev) => prev + 1);
			getNewJobs(currentPage + 1);
		}
	}, [paginationLoading]);

	useEffect(() => {
		scrollRef.current.addEventListener('scroll', scrollHandler);
		return function () {
			scrollRef.current.removeEventListener('scroll', scrollHandler);
		};
	}, [isLast]);

	return setCurrentPage;
};

export default usePagination;
