"use client";

import AlertBanner from "@/components/alert-banner";
import { cn } from "@/lib/utils";
import { Circle, CircleCheck } from "lucide-react";
import { useState } from "react";
import { AddQuizForm } from "./add-quiz-form";
import { QuizCardActions } from "./quiz-card-actions";
import { TitleForm } from "./title-form";

const QuizListAndForm = ({ quizzes, quizSetId, quizSet }) => {
  const [editableQuiz, setEditableQuiz] = useState(null);

  const handleEditQuiz = (quiz) => {
    setEditableQuiz({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description || "",
      optionA: quiz.options[0] || { label: "", isTrue: false },
      optionB: quiz.options[1] || { label: "", isTrue: false },
      optionC: quiz.options[2] || { label: "", isTrue: false },
      optionD: quiz.options[3] || { label: "", isTrue: false },
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2  gap-6 mt-16">
      {/* Quiz List */}
      <div className="max-lg:order-2">
        <h2 className="text-xl mb-6">Quiz List</h2>
        {
          quizzes.length === 0 && (<AlertBanner
            label="No Quiz are in the set, add some using the form above."
            variant="warning"
            className="rounded mb-6"
          />)
        }

        <div className="space-y-6">
          {
            quizzes.map((quiz, index) => {
              return (
                <div
                  key={quiz.id}
                  className=" bg-gray-50 shadow-md p-4 lg:p-6 rounded-md border"
                >
                  <div className="flex gap-1">
                    <h1>{index + 1}.</h1>
                    <h2 className="mb-3">{quiz.title}</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {
                      quiz.options.map((option, index) => {
                        return (
                          <div
                            className={cn(
                              "py-1.5 rounded-sm  text-sm flex items-center gap-1 text-gray-600"
                            )}
                            key={index}
                          >
                            {option.isTrue ? (
                              <CircleCheck className="size-4 text-emerald-500 " />
                            ) : (
                              <Circle className="size-4" />
                            )}

                            <p>{option.label}</p>
                          </div>
                        );
                      })
                    }
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-6">
                    <QuizCardActions
                      quiz={quiz}
                      quizSetId={quizSetId}
                      onEdit={() => handleEditQuiz(quiz)}
                    />
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>

      {/* quiz set title and add quiz form */}
      <div>
        <div className="flex items-center gap-x-2">
          <h2 className="text-xl">Customize your quiz set</h2>
        </div>
        <div className="max-w-[800px]">
          <TitleForm
            initialData={{
              title: quizSet.title,
            }}
            quizSetId={quizSet.id}
          />
        </div>

        <div className="max-w-[800px]">
          {/* add/edit quiz form */}
          <AddQuizForm
            quizSetId={quizSetId}
            initialData={editableQuiz}
            mode={editableQuiz ? "edit" : "add"}
          />
        </div>
      </div>
    </div>
  )
}

export default QuizListAndForm;