import { useEffect, useState } from 'preact/hooks';

/** Executes `func` once in the current tab, returned result will be updated when done */
export const useExecuteScript = <T>(func: () => Awaited<T>) => {
	const [result, setResult] = useState<T | undefined>();
	const [err, setErr] = useState(false);
	useEffect(() => {
		(async () => {
			const tab = (await chrome.tabs.query({ active: true, currentWindow: true }))[0];
			if (!tab || !tab.id) return setErr(true);
			const result = await chrome.scripting.executeScript({
				target: { tabId: tab.id },
				func,
			});
			if (!result[0]) return setErr(true);
			return result[0].result;
		})().then((result) => setResult(result));
	}, []);

	return { result, err };
};
