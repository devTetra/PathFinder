import { RiasecScores } from '../types/index.js';

export const RIASEC = ['R', 'I', 'A', 'S', 'E', 'C'] as const;
export const maxDimensions: RiasecScores = { R: 81, I: 85, A: 85, S: 88, E: 85, C: 81 } as const;
export const RIASEC_TOLERANCE = 25 as const;
export const RESULT_TTL = 2592000 as const;
