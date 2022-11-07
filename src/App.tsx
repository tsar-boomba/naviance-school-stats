import {
	MantineProvider,
	ColorScheme,
	ColorSchemeProvider,
	Stack,
} from '@mantine/core';
import { Page } from './Page';
import { useLocalStorage } from '@mantine/hooks';
import { Footer } from './components/Footer';

export function App() {
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: 'theme',
		getInitialValueInEffect: true,
		defaultValue: 'light',
	});
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider
				theme={{ colorScheme, primaryColor: 'orange' }}
				withGlobalStyles
				withNormalizeCSS
			>
				<Stack sx={{ minWidth: '700px', minHeight: '700px' }} align='flex'>
					<Page />
					<Footer />
				</Stack>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}
