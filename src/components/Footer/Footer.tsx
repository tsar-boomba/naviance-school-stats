import { ActionIcon, Button, Group, Paper, Select, Text } from '@mantine/core';
import { IconWorldWww, IconBrandGithub } from '@tabler/icons';
import { StateUpdater } from 'preact/hooks';
import { CollegeData } from '../../types';

export const Footer = () => {
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
			<Text size={18} fw={900}>
				Created by Isaiah Gamble
			</Text>
			<Group position='center' align='center' sx={{ flexGrow: 1 }}>
				<Button
					component='a'
					variant='default'
					href='https://igamble.dev'
					target='_blank'
					rel='noreferrer noopener'
					leftIcon={<IconWorldWww size={18} />}
				>
					Website
				</Button>
				<Button
					component='a'
					variant='default'
					href='https://github.com/tsar-boomba/naviance-school-stats'
					target='_blank'
					rel='noreferrer noopener'
					leftIcon={<IconBrandGithub size={18} />}
				>
					GitHub
				</Button>
			</Group>
		</Paper>
	);
};
