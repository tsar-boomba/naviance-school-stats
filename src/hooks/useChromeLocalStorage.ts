import { useEffect, useState } from 'preact/hooks';

type ChromeLocalStorageOptions<T> = {
	key: string;
	storage: 'local' | 'sync' | 'session' | 'managed';
	defaultValue?: T;
};

export const useChromeStorage = <T>({
	key,
	storage,
	defaultValue,
}: ChromeLocalStorageOptions<T>) => {
	const [value, setValue] = useState<T>(defaultValue as T);

	useEffect(() => {
		chrome.storage[storage].set({ [key]: value });
	}, [value]);

	useEffect(() => {
		chrome.storage[storage].get(key).then((value) => setValue(value[key]));
		
		chrome.storage[storage].onChanged.addListener((changed) => {
			if (changed[key]) {
				setValue(changed[key].newValue);
			}
		});
	}, []);

	return [value, setValue] as const;
};
