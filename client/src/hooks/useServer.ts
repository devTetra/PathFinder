import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCareer,
  getCareers,
  getQuestions,
  getRelatedCareers,
  getResult,
  submitAssessment,
} from "../services/server.service";
import type { Answer } from "../types";

export const useQuestions = () => {
  return useQuery({ queryKey: ["questions"], queryFn: getQuestions });
};

export const useResult = (resultId: string) => {
  return useQuery({
    queryKey: ["results", resultId],
    queryFn: () => getResult(resultId),
    enabled: Boolean(resultId),
  });
};

export const useSubmitAssessment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { answers: Answer[] }) => submitAssessment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessment"] });
    },
  });
};

export const useCareers = () => {
  return useQuery({ queryKey: ["careers"], queryFn: getCareers });
};

export const useCareer = (slug: string) => {
  return useQuery({
    queryKey: ["careers", slug],
    queryFn: () => getCareer(slug),
    enabled: Boolean(slug),
  });
};

export const useRelatedCareers = (slugs: string[]) => {
  return useQuery({
    queryKey: ["realted-careers", slugs],
    queryFn: () => getRelatedCareers(slugs),
    enabled: slugs.length > 0,
  });
};
