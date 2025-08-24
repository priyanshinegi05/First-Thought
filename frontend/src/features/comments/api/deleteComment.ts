import { api } from "../../../app/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const deleteComment = async (commentId: string): Promise<{ message: string }> => {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
};

export const useDeleteCommentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: (_) => {
            // Invalidate comments queries to refresh the list
            queryClient.invalidateQueries({ queryKey: ["comments"] });
        },
        onError: (error: any) => {
            console.error("Delete comment error:", error);
            const errorMessage = error.response?.data?.message || "Failed to delete comment. Please try again.";
            alert(errorMessage);
        },
    });
}; 