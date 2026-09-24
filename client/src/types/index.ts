export type RIASEC = "R" | "I" | "A" | "S" | "E" | "C";
export type Question = {
  _id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
};

export type Answer = {
  questionId: string;
  optionId: string;
};

export type Result = {
  _id: string;
  resultId: string;
  scores: Record<RIASEC, number>;
  careerMatches: {
    career: {
      _id: string;
      name: string;
      slug: string;
      shortDescription: string;
      description: string;
      coreDimensions: RIASEC[];
      illustrationKey: string;
    };
    fit: number;
  }[];
};
