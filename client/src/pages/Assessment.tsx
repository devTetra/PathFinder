import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { ArrowLeft, ArrowRight, Check, TriangleAlert } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ErrorState } from "../components/ErrorState";
import { QuestionSkeleton } from "../components/QuestionSkeleton";
import { Spinner } from "../components/Spinner";
import { useQuestions, useSubmitAssessment } from "../hooks/useServer";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import type { Answer } from "../types";

type AssessmentForm = {
  answers: Record<string, string>;
};

export const Assessment = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const submitAssessment = useSubmitAssessment();
  const navigate = useNavigate();
  useDocumentTitle("Career Assessment");

  const { data: questions = [], isLoading, isError, refetch } = useQuestions();

  const question = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const {
    register,
    trigger,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AssessmentForm>();

  const selectedAnswers = useWatch({
    control,
    name: `answers`,
  });
  const selectedOption = question ? selectedAnswers?.[question._id] : undefined;

  const handleNext = async () => {
    const isValid = await trigger(`answers.${question._id}`);
    if (!isValid) return;

    if (isLastQuestion) {
      handleSubmit(onSubmit)();
      return;
    }
    setDirection(1);
    setCurrentIndex((previous) => previous + 1);
  };

  const onSubmit: SubmitHandler<AssessmentForm> = async (data) => {
    const answers: Answer[] = Object.entries(data.answers).map(
      ([questionId, optionId]) => ({ questionId, optionId }),
    );
    const { resultId } = await submitAssessment.mutateAsync({ answers });
    navigate(`/results/${resultId}`);
  };

  return (
    <main className="from-primary-soft via-background to-accent-wash flex min-h-screen items-center justify-center bg-linear-135 px-4 py-10">
      <form className="bg-surface border-border shadow-text-primary/10 flex max-w-2xl flex-col gap-6 rounded-2xl border p-6 shadow-[0px_16px_48px] sm:p-8 lg:min-w-2xl">
        <Spinner isLoading={submitAssessment.isPending} />
        {isLoading ? (
          <QuestionSkeleton />
        ) : isError ? (
          <ErrorState
            title="Couldn't load the assessment"
            message="Something went wrong while loading the questions."
            onRetry={refetch}
          />
        ) : questions.length === 0 ? (
          <ErrorState
            title="No questions available"
            message="The assessment is currently unavailable. Please try again later."
            onRetry={refetch}
          />
        ) : (
          <>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={question._id}
                initial={{ opacity: 0, x: direction * 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -15 }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-text-secondary text-[13px] font-semibold">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <span className="text-primary text-[13px] font-semibold">
                    {Math.round(((currentIndex + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div
                  className="bg-border mb-7 h-1.5 overflow-hidden rounded-full"
                  aria-hidden="true"
                >
                  <div
                    className="bg-primary h-full rounded-lg transition-[width] duration-300"
                    style={{
                      width: `${((currentIndex + 1) / questions.length) * 100}%`,
                    }}
                  ></div>
                </div>
                <h1 className="mb-5.5 text-[19px] leading-6 font-bold">
                  {question.text}
                </h1>
                <div className="flex flex-col gap-2.5">
                  {question.options.map(({ id, text }) => (
                    <label
                      htmlFor={`${question._id}-${id}`}
                      key={id}
                      className="group bg-background hover:bg-primary-soft border-border has-checked:bg-primary-soft has-checked:border-primary hover:border-primary flex cursor-pointer items-center gap-3 rounded-lg border-[1.5px] p-3.5 text-left text-sm font-medium transition-colors duration-200 has-checked:font-semibold"
                    >
                      <input
                        type="radio"
                        id={`${question._id}-${id}`}
                        value={id}
                        className="sr-only"
                        {...register(`answers.${question._id}`, {
                          required: "Please select an option before continuing",
                        })}
                      />

                      <span className="border-input-border group-has-checked:bg-primary group-has-checked:border-primary flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px]">
                        <Check
                          aria-hidden="true"
                          size={13}
                          strokeWidth={4}
                          className="text-surface opacity-0 transition-opacity duration-200 group-has-checked:opacity-100"
                        />
                      </span>

                      <span>{text}</span>
                    </label>
                  ))}

                  {errors.answers?.[question._id] && (
                    <p
                      role="alert"
                      className="text-error mt-2 self-end text-xs font-medium"
                    >
                      {errors.answers?.[question._id]?.message}
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
            {submitAssessment.isError && (
              <div
                role="alert"
                className="border-error/20 bg-error-soft text-error flex items-start gap-2.5 rounded-lg border p-3"
              >
                <TriangleAlert
                  size={17}
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <p className="text-sm font-medium">
                  We couldn't submit your assessment. Please try again.
                </p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setDirection(-1);
                  setCurrentIndex((previous) => previous - 1);
                }}
                className="text-text-secondary hover:text-text-primary hover:bg-background disabled:text-text-muted flex cursor-pointer items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold outline-0 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                type="button"
                disabled={currentIndex === 0}
              >
                <ArrowLeft aria-hidden="true" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleNext}
                type="button"
                className="bg-primary hover:bg-primary-hover focus-visible:ring-primary disabled:bg-border disabled:text-text-muted disabled:hover:bg-border flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white outline-0 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:focus-visible:ring-0"
                disabled={!selectedOption || submitAssessment.isPending}
              >
                {isLastQuestion
                  ? submitAssessment.isError
                    ? "Try again"
                    : "Submit"
                  : "Next"}
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </>
        )}
      </form>
    </main>
  );
};
