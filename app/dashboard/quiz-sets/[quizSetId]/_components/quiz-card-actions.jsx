"use client";

import { deleteQuiz } from "@/app/actions/quiz";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const QuizCardActions = ({ quiz, quizSetId, onEdit }) => {
    const [action, setAction] = useState(null);
    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            switch (action) {
                case "edit-quiz": {
                    onEdit();
                    break;
                }
                case "delete-quiz": {
                    await deleteQuiz(quiz.id, quizSetId)
                    toast.success(`The quiz has been deleted`);
                    router.refresh();
                    break;
                }
                default: {
                    throw new Error("Invalid action");
                }
            }
        } catch (e) {
            toast.error(e.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setAction("edit-quiz")}
            >
                <Pencil className="w-3 mr-1" /> Edit
            </Button>
            <Button
                size="sm"
                className="text-destructive"
                variant="ghost"
                onClick={() => setAction("delete-quiz")}
            >
                <Trash className="w-3 mr-1" /> Delete
            </Button>
        </form>
    );
};
