import { CollegeData } from '../types';

export const getOverallAcceptanceRate = (
	data: CollegeData
): (string & {}) | 'N/A' => {
	if (data.stats.applicationsByYear) {
		const currYear = new Date().getFullYear();
		const currMonth = new Date().getMonth();
		const [overallApplied, overallAccepted] = Object.entries(data.stats.applicationsByYear)
			.filter(([year]) => {
				// filter out invalid application years (current cycle)
				const appYear = parseInt(year);
				if (appYear < currYear) return true;
				// only use current year if its at least october
				if (appYear === currYear) return currMonth >= 9;
				return false;
			})
			.reduce<[number, number]>(
				(acc, [year, app]) => {
					console.log(year);
					acc[0] += app.totalApplied ?? 0;
					acc[1] += app.totalAccepted ?? 0;
					return acc;
				},
				[0, 0]
			);

		const overallAcceptanceRate = (overallAccepted / overallApplied) * 100;
		return isNaN(overallAcceptanceRate) ? 'N/A' : `${overallAcceptanceRate.toFixed(1)}%`;
	}
	return 'N/A';
};
