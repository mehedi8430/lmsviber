import AlertBanner from "@/components/alert-banner";
import { getQuizSetById } from "@/queries/quizzes";
import { QuizSetAction } from "./_components/quiz-set-action";
import QuizListAndForm from "./_components/quizlist-quizform";

const EditQuizSet = async ({ params: { quizSetId } }) => {
  const quizSet = await getQuizSetById(quizSetId);

  const quizzes = quizSet.quizIds.map(quiz => {
    return {
      id: quiz._id.toString(),
      title: quiz.title,
      description: quiz.description,
      options: quiz.options.map(option => {
        return {
          label: option.text,
          isTrue: option.is_correct
        }
      })
    }
  })

  return (
    <>
      {
        !quizSet.active && (
          <AlertBanner
            label="This course is unpublished. It will not be visible in the course."
            variant="warning"
          />
        )
      }

      <div className="p-6">
        <div className="flex items-center justify-end">
          <QuizSetAction
            quizSetId={quizSetId}
            isActive={quizSet.active}
          />
        </div>

        {/* quiz list and add/edit quiz form */}
        <QuizListAndForm
          quizzes={quizzes}
          quizSetId={quizSetId}
          quizSet={quizSet}
        />
      </div>
    </>
  );
};

export default EditQuizSet;
