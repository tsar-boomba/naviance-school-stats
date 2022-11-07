import { ActionIcon, Group, Paper, Select, Text } from '@mantine/core';
import { IconSearch, IconBrandGithub } from '@tabler/icons';
import { StateUpdater } from 'preact/hooks';
import { CollegeData } from '../../types';
import { ThemeSwitch } from './ThemeSwitch';

type Props = {
	data: Record<string, CollegeData | null>;
	selectedSchool: CollegeData | null;
	setSelectedSchool: StateUpdater<CollegeData | null>;
};

export const Header = ({ data, selectedSchool, setSelectedSchool }: Props) => {
	const selectData = Object.entries(data)
		.filter(([_, v]) => v !== null)
		.map(([key, value]) => ({
			value: key,
			label: key,
			data: value,
		}));

	return (
		<Paper
			p='md'
			radius={0}
			shadow='md'
			component='header'
			bg='orange'
			sx={(theme) => ({
				display: 'flex',
				alignItems: 'center',
				color: theme.colorScheme === 'dark' ? 'white' : undefined,
			})}
		>
			<Text size={24} fw={900}>
				Naviance++
			</Text>
			<Select
				data={selectData}
				value={selectedSchool?.info?.shortName ?? null}
				onChange={(v: string) => setSelectedSchool(data[v] ?? null)}
				sx={{ flexGrow: 1 }}
				mx='md'
				position='bottom'
				variant='filled'
				icon={<IconSearch size={18} />}
				searchable
				nothingFound='No colleges found'
				placeholder='Pick a college'
				clearable
			/>
			<Group position='center' align='center'>
				<ThemeSwitch />
				<ActionIcon
					component='a'
					href='https://github.com/tsar-boomba/naviance-school-stats'
					target='_blank'
					rel='noreferrer noopener'
					size='lg'
					sx={(theme) => ({
						backgroundColor:
							theme.colorScheme === 'dark'
								? theme.colors.dark[6]
								: theme.colors.gray[0],
						color:
							theme.colorScheme === 'dark'
								? theme.colors.yellow[4]
								: theme.colors.blue[6],
					})}
				>
					<IconBrandGithub size={18} />
				</ActionIcon>
			</Group>
		</Paper>
	);
};
