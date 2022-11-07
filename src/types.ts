export type AcceptanceHistory = {
	id: string;
	name: string;
	shortName: string;
	coreMapping: {
		uuid: string;
	};
	hobsonsId: number;
	addressLine1: string;
	addressLine2: string;
	city: string;
	latitude: number;
	longitude: number;
	state: string;
	totalAccepted: number;
	totalAttending: number;
};

type ApplicationByYearYear = {
	totalApplied: number;
	/** Acceptances may not be out yet so this may not exist */
	totalAccepted?: number;
	/** Enrollment may not have happened yet so this may not exist */
	totalEnrolled?: number;
};

export type ApplicationByYear = {
	[year: string]: ApplicationByYearYear;
};

export type Percentiles = {
	['25']?: number;
	['75']?: number;
};

type AppStats = {
	act: {
		actComposite: Percentiles | null;
		actEnglish: Percentiles | null;
		actMath: Percentiles | null;
		actReading: Percentiles | null;
		actScience: Percentiles | null;
		actWriting: Percentiles | null;
	};
	gpa: Percentiles;
	gpaConverted: Percentiles;
	sat: {
		satMath: Percentiles | null;
		satReadingWriting: Percentiles | null;
		satTotal: Percentiles | null;
	};
	weightedGpa: Percentiles;
	weightedGPaConverted: Percentiles;
};

export type ApplicationStatistics = {
	accepted: AppStats;
	enrolled: AppStats;
};

type GPAInfo = {
	gpaAvg: number;
	gpaConvAvg: number;
	gpaConvSum: number;
	gpaCount: number;
	gpaSum: number;
};

export type ACT = {
	avg: number;
	count: number;
	sum: number;
} & GPAInfo;

export type GPA = {
	act: ACT | null;
	/** Idk my school dont show it */
	sat: object | null;
} & GPAInfo;

export type WeightedGPA = {
	act: ACT | null;
	/** Idk my school dont show it */
	sat: object | null;
} & GPAInfo;

export type ScattergramsAccepted = {
	actComposite: number;
	actCompositeStudent: number;
	currentStudent: boolean;
	gpa: number;
	highestComboSat: number;
	studentSAT1600Composite: number;
	typeName: 'EA' | 'RD';
};

export type Scattergrams = {
	gpa: GPA;
	weightedGpa: WeightedGPA;
};

export type Academics = {
	act: number | null;
	gpa: number | null;
	psat: number | null;
	rawCumulativeGpa: number | null;
	rawWeightedGpa: number | null;
	sat: number | null;
	weightedGpa: number | null;
};

export type ApplicationStatisticsResponse = {
	applicationStatistics: ApplicationStatistics | null;
	applicationsByYear: ApplicationByYear;
	scattergrams: Scattergrams | null;
	userInfo?: {
		academics: Academics;
		userId: number;
	};
};

type TestData = {
	average: string | null;
	low: string | null;
	high: string | null;
};

export type CollegeData = {
	stats: ApplicationStatisticsResponse;
	info: AcceptanceHistory;
	test: {
		['ACT Combined']?: TestData;
		['SAT Combined']?: TestData;
		['ACT Reading']?: TestData;
		['ACT Math']?: TestData;
		['ACT Science']?: TestData;
		['ACT English']?: TestData;
		['SAT Math']?: TestData;
		['SAT Critical Reading']?: TestData;
	} | null;
	ugAdmissions:
		| HobsonsFullProfile['undergraduate_admissions']['field_he_undergradadmission_ref']['admission_general']
		| null;
};

export type HobsonsFullProfile = {
	address: {
		field_city: string;
		field_postalcode: string;
		field_state_ref: {
			field_long_name: string;
			field_state_short_name: string;
		};
		field_url: string;
	};
	undergraduate_admissions: {
		field_he_undergradadmission_ref: {
			admission_factor_data: {};
			admission_general: {
				field_he_applicationfee: string;
				field_he_applications_accepted: string;
				field_he_applications_received: string;
			};
			test: {
				field_he_test_us: {
					field_he_average: string | null;
					field_he_low: string | null;
					field_he_high_score: string | null;
					field_he_testtype_id:
						| 'ACT English'
						| 'ACT Math'
						| 'ACT Science'
						| 'ACT Reading'
						| 'ACT Combined'
						| 'SAT Critical Reading'
						| 'SAT Math'
						| 'SAT Combined';
				}[];
			};
		};
	};
};

export type HobsonsRes = {
	fullProfile: HobsonsFullProfile;
	ipedscode: string;
	logo: null;
	name: string;
	scid: number;
	virtualTour?: string;
	webLink?: string;
	webTour?: string;
};
