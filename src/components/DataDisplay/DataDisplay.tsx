import { Affix, Paper, Select, Stack, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { useState } from 'preact/hooks';
import { CollegeData } from '../../types';
import { Header } from '../Header';
import { GeneralInfo } from './GeneralInfo';
import { SchoolStats } from './SchoolStats';

interface Props {
	data: Record<string, CollegeData | null>;
}

export const DataDisplay = ({ data }: Props) => {
	const [scroll] = useWindowScroll();
	const [selectedSchool, setSelectedSchool] = useState<CollegeData | null>(
		null
	);
	const selectData = Object.entries(data)
		.filter(([_, v]) => v !== null)
		.map(([key, value]) => ({
			value: key,
			label: key,
			data: value,
		}));

	return (
		<Stack>
			<Header
				data={data}
				selectedSchool={selectedSchool}
				setSelectedSchool={setSelectedSchool}
			/>
			{selectedSchool && (
				<Stack p='xl'>
					<Affix position={{ top: 32, left: 32 }}>
						<Transition transition='pop-top-left' mounted={scroll.y > 90}>
							{(transitionStyles) => (
								<Paper style={transitionStyles} p='md' withBorder shadow='md'>
									{selectedSchool.info.shortName}
								</Paper>
							)}
						</Transition>
					</Affix>

					<GeneralInfo data={selectedSchool} />
					<SchoolStats data={selectedSchool} />
					{/* <pre>{JSON.stringify(selectedSchool, null, 4)}</pre> */}
				</Stack>
			)}
		</Stack>
	);
};
