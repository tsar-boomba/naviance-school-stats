import {
	AcceptanceHistory,
	ApplicationStatisticsResponse,
	CollegeData,
	HobsonsRes,
} from './types';

export type GetDataReturn = {
	collegeInfos: Record<string, CollegeData | null>;
	userInfo: ApplicationStatisticsResponse['userInfo'];
	errs: AcceptanceHistory[];
};

/** Executed in da page */
export const getData = async (): Promise<GetDataReturn> => {
	// cant use any vars from outside this func
	const apiUrl = `https://blue-ridge-api.naviance.com`;
	const authToken = localStorage.getItem('deepLinkingAuthorizedToken');
	if (!authToken) throw new Error('No auth token in local storage!!!');
	const headers = {
		authorization: authToken,
	};
	const acceptanceHistoryRes = await fetch(
		`${apiUrl}/college/acceptance-history?page=1&limit=1000`,
		{ headers }
	);
	const acceptanceHistory: {
		data: AcceptanceHistory[];
	} = await acceptanceHistoryRes.json();

	// null if no data for that school
	const collegeInfos: Record<string, CollegeData | null> = {};
	let userInfo: ApplicationStatisticsResponse['userInfo'];
	// colleges that failed to get data for
	const errs: AcceptanceHistory[] = [];
	for (const college of acceptanceHistory.data) {
		// get that data for each college
		try {
			const [infoRes, hobsonsRes] = await Promise.all([
				fetch(
					`${apiUrl}/application-statistics/uuid/${college.coreMapping.uuid}`,
					{
						headers,
					}
				),
				fetch(`${apiUrl}/collegeprofile/${college.hobsonsId}`, { headers }),
			]);
			const stats: ApplicationStatisticsResponse = await infoRes.json();
			const hobsons: HobsonsRes = await hobsonsRes.json();

			// only get this once and dont include in returned stats
			userInfo ??= stats.userInfo;
			delete stats.userInfo;

			collegeInfos[college.shortName] = stats.applicationStatistics
				? {
						stats,
						info: college,
						test:
							// map the sus structure to a more elegant one
							hobsons?.fullProfile?.undergraduate_admissions?.field_he_undergradadmission_ref?.test?.field_he_test_us.reduce<
								NonNullable<CollegeData['test']>
							>((o, test) => {
								o[test.field_he_testtype_id] = {
									average: test.field_he_average,
									low: test.field_he_low,
									high: test.field_he_high_score,
								};
								return o;
							}, {} as NonNullable<CollegeData['test']>) ?? null,
						ugAdmissions:
							hobsons?.fullProfile?.undergraduate_admissions
								?.field_he_undergradadmission_ref?.admission_general ?? null,
				  }
				: null;
		} catch (e) {
			errs.push(college);
		}
	}

	console.log('Data collection completed.');
	return { collegeInfos, userInfo: userInfo!, errs };
};
