export type RiasecDimension = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
export interface CareerDimension {
	min: number;
	max: number;
	weight: number;
}

export type CareerDimensions = Record<RiasecDimension, CareerDimension>;

export interface ScoreContribution {
	dimension: RiasecDimension;
	points: number;
}

export interface QuestionOption {
	id: 'A' | 'B' | 'C' | 'D' | 'E';
	text: string;
	scores: ScoreContribution[];
}

export type RiasecScores = Record<RiasecDimension, number>;
