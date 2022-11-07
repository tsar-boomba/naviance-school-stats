import { Percentiles } from "../types";

export const getPercentileAvg = (percentile: Percentiles | null | undefined): number | string => {
	if (percentile?.[25] && percentile?.[75]) {
		return ((percentile[25] + percentile[75]) / 2).toFixed(1);
	}
	return 'N/A';
};
