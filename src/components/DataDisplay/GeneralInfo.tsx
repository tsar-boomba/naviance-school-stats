import { Group, Stack, Text, Title } from '@mantine/core';
import { CollegeData } from '../../types';

type Props = {
	data: CollegeData;
};

export const GeneralInfo = ({ data }: Props) => {
	const acceptedNumber = parseInt(
		data.ugAdmissions?.field_he_applications_accepted ?? ''
	);
	const receivedNumber = parseInt(
		data.ugAdmissions?.field_he_applications_received ?? ''
	);
	const acceptanceRate = (acceptedNumber / receivedNumber) * 100;

	return (
		<Stack align='center'>
			<Title c='orange' order={1}>
				General Info
			</Title>
			<Group grow>
				<Stack align='center' spacing='0'>
					<Text fw={500} size={36}>
						{isNaN(acceptanceRate) ? 'N/A' : `${acceptanceRate.toFixed(1)}%`}
					</Text>
					<Title align='center' c='orange' m={0} order={2}>
						Acceptance Rate
					</Title>
				</Stack>
				<Stack align='center' spacing='0'>
					<Text fw={500} size={36}>
						{data.test?.['ACT Combined']?.average
							? data.test['ACT Combined'].average
							: 'N/A'}
					</Text>
					<Title c='orange' m={0} order={2}>
						Avg ACT
					</Title>
				</Stack>
				<Stack align='center' spacing='0'>
					<Text fw={500} size={36}>
						{data.test?.['SAT Combined']?.average
							? data.test['SAT Combined'].average
							: 'N/A'}
					</Text>
					<Title c='orange' m={0} order={2}>
						Avg SAT
					</Title>
				</Stack>
			</Group>
		</Stack>
	);
};
