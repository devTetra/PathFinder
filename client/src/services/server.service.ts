import { api } from "../lib/axios";
import type { Answer, Career, Question, Result } from "../types";

interface apiResponses<T> {
  success: boolean;
  data: T[];
  message: string;
}

interface apiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const getQuestions = async (): Promise<Question[]> => {
  const response = await api.get<apiResponses<Question>>("/questions/");
  return response.data.data;
};

export const getResult = async (resultId: string): Promise<Result> => {
  const response = await api.get<apiResponse<Result>>(`/results/${resultId}`);
  return response.data.data;
};

export const submitAssessment = async (data: {
  answers: Answer[];
}): Promise<Result> => {
  const response = await api.post<apiResponse<Result>>(
    "/assessment/submit",
    data,
  );
  return response.data.data;
};

export const getCareers = async (): Promise<Career[]> => {
  const response = await api.get<apiResponses<Career>>("/careers/");
  return response.data.data;
};

export const getCareer = async (slug: string): Promise<Career> => {
  const response = await api.get<apiResponse<Career>>(`/careers/${slug}`);
  return response.data.data;
};

export const getRelatedCareers = async (slugs: string[]): Promise<Career[]> => {
  const response = await api.post<apiResponses<Career>>(
    "/careers/related",
    slugs,
  );
  return response.data.data;
};
