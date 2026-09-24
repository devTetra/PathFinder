import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getQuestions,
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
