import { Button, Group, Loader, Stack, Text } from '@mantine/core';
import { StateUpdater, useEffect, useState } from 'preact/hooks';
import { DataDisplay } from './components/DataDisplay';
import { getData, GetDataReturn } from './getData';
import { useChromeStorage } from './hooks/useChromeLocalStorage';
import { useExecuteScript } from './hooks/useExecuteScript';
import { ApplicationStatisticsResponse, CollegeData } from './types';

const runGetData = async (
	setGettingData: StateUpdater<boolean>,
	setDataErr: StateUpdater<string | undefined>
) => {
	const tab = (
		await chrome.tabs.query({ active: true, currentWindow: true })
	)[0];
	if (!tab || !tab.id) {
		setGettingData(false);
		return setDataErr("Couldn't get tab id.");
	}

	const result = await chrome.scripting.executeScript({
		target: { tabId: tab.id },
		func: getData,
	});
	if (!result[0]?.result) {
		setGettingData(false);
		return setDataErr('Error ocurred while getting data.');
	}

	const data: GetDataReturn = result[0].result;

	return data;
};

export const Page = () => {
	const [data, setData] = useChromeStorage<
		Record<string, CollegeData | null> | undefined
	>({ key: 'data', storage: 'local', defaultValue: undefined });
	const [userInfo, setUserInfo] = useChromeStorage<
		ApplicationStatisticsResponse['userInfo'] | undefined
	>({ key: 'userInfo', storage: 'local', defaultValue: undefined });
	const [dataErr, setDataErr] = useState<string | undefined>(undefined);
	const [gettingData, setGettingData] = useState(false);
	const { result: canRun, err: canRunErr } = useExecuteScript(
		() =>
			location.href.startsWith('https://student.naviance.com') &&
			localStorage.getItem('deepLinkingAuthorizedToken')
	);

	useEffect(() => {
		if (canRun === undefined || canRunErr || !gettingData) return;
		runGetData(setGettingData, setDataErr).then((data) => {
			if (data?.collegeInfos) {
				setData(data?.collegeInfos);
				setUserInfo(data?.userInfo);
			} else {
				setDataErr('No data returned 😔.');
			}

			setGettingData(false);
		});
	}, [gettingData]);

	if (!data && canRun === undefined && !canRunErr) {
		return (
			<Group position='center' gap='md'>
				<Loader size='xl' />
				<Text align='center' size='lg'>
					Checking if you can run this extension... (on naviance & logged in)
				</Text>
			</Group>
		);
	}

	if (canRunErr) {
		return (
			<Group position='center' gap='md'>
				<Text align='center' size='lg'>
					An error ocurred while checking if you can run this extension, please
					try again or report this on the GitHub repository. 😭
				</Text>
			</Group>
		);
	}

	const canGetData = canRun && !canRunErr;

	return (
		<Stack sx={{ flexGrow: 1 }}>
			{gettingData && (
				<Group position='center' gap='md'>
					<Loader size='xl' />
					<Text fw={500} align='center' size='lg'>
						Getting applications data, do not leave this tab or close this pop up.
					</Text>
				</Group>
			)}
			{!canGetData && !data && (
				<Text align='center' size='lg'>
					You must be on Naviance & logged in to get data for this application. ✊😤
				</Text>
			)}
			{data && !gettingData && <DataDisplay data={data} />}
			<Button
				onClick={() => setGettingData(true)}
				mx='xl'
				mb='xl'
				disabled={!canGetData || gettingData}
				loading={gettingData}
			>
				{data ? 'Update Data' : 'Start Data Collection'}
			</Button>
		</Stack>
	);
};
