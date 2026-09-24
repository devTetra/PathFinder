import { api } from "../lib/axios";
import type { Answer, Question, Result } from "../types";

interface apiResponse<T> {
  success: boolean;
  data: T[];
  message: string;
}

interface resultResponse {
  success: boolean;
  data: Result;
  message: string;
}

export const getQuestions = async (): Promise<Question[]> => {
  const response = await api.get<apiResponse<Question>>("/questions/");
  return response.data.data;
};

export const getResult = async (resultId: string): Promise<Result> => {
  const response = await api.get<resultResponse>(`/results/${resultId}`);
  return response.data.data;
};

export const submitAssessment = async (data: {
  answers: Answer[];
}): Promise<Result> => {
  const response = await api.post<resultResponse>("/assessment/submit", data);

  return response.data.data;
};
