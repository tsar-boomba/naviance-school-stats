import { Group, Stack, Text, Title } from '@mantine/core';
import { CollegeData } from '../../types';
import { getOverallAcceptanceRate } from '../../utils/getOverallAcceptanceRate';
import { getPercentileAvg } from '../../utils/getPercentilesAvg';

type Props = {
	data: CollegeData;
};

export const SchoolStats = ({ data }: Props) => {
	const yearlyAcceptanceRates = Object.entries(
		data.stats?.applicationsByYear ?? {}
	)
		.filter(([year]) => {
			// filter out invalid application years (current cycle)
			const currYear = new Date().getFullYear();
			const currMonth = new Date().getMonth();
			const appYear = parseInt(year);
			if (appYear < currYear) return true;
			// only use current year if its at least october
			if (appYear === currYear) return currMonth >= 9;
			return false;
		})
		.map(([year, apps]) => {
			const acceptanceRate =
				((apps.totalAccepted ?? 0) / (apps.totalApplied ?? 0)) * 100;
			return (
				<Stack align='center' spacing='0'>
					<Text fw={500} size={36}>
						{isNaN(acceptanceRate) ? 'N/A' : `${acceptanceRate.toFixed(1)}%`}
					</Text>
					<Title c='orange' m={0} order={3}>
						{year}
					</Title>
				</Stack>
			);
		});
	const areYearlyAcceptances = yearlyAcceptanceRates.length > 0;

	return (
		<Stack align='center' spacing={0}>
			<Title c='orange' order={1}>
				Your School's Stats
			</Title>
			<Title c='orange' order={2}>
				Acceptance History
			</Title>
			<Group grow>
				<Stack align='center' spacing='0'>
					<Text fw={500} size={36}>
						{getOverallAcceptanceRate(data)}
					</Text>
					<Title align='center' c='orange' m={0} order={3}>
						Acceptance Rate
					</Title>
				</Stack>
				<Stack align='center' spacing='0'>
					<Text fw={500} size={36}>
						{getPercentileAvg(data.stats.applicationStatistics?.accepted?.gpa)}
					</Text>
					<Title c='orange' m={0} order={3}>
						Avg GPA
					</Title>
				</Stack>
				<Stack align='center' spacing='0'>
					<Text fw={500} size={36}>
						{getPercentileAvg(
							data.stats.applicationStatistics?.accepted?.weightedGpa
						)}
					</Text>
					<Title c='orange' align='center' m={0} order={3}>
						Avg Weighted GPA
					</Title>
				</Stack>
				<Stack align='center' spacing='0'>
					<Text fw={500} size={36}>
						{getPercentileAvg(
							data.stats.applicationStatistics?.accepted?.act?.actComposite
						)}
					</Text>
					<Title c='orange' m={0} order={3}>
						Avg ACT
					</Title>
				</Stack>
				<Stack align='center' spacing='0'>
					<Text fw={500} size={36}>
						{getPercentileAvg(
							data.stats.applicationStatistics?.accepted?.sat?.satTotal
						)}
					</Text>
					<Title c='orange' m={0} order={3}>
						Avg SAT
					</Title>
				</Stack>
			</Group>
			{areYearlyAcceptances && (
				<Title c='orange' order={2}>
					Yearly Acceptance Rate
				</Title>
			)}
			{areYearlyAcceptances && <Group group>{yearlyAcceptanceRates}</Group>}
		</Stack>
	);
};
