import { api } from "../../../app/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const deletePost = async (postId: string): Promise<{ message: string }> => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
};

export const useDeletePostMutation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (postId: string) => deletePost(postId),
        onSuccess: () => {
            // Invalidate and refetch posts queries
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["userPosts"] });
        },
        onError: (error: any) => {
            console.error("Delete post error:", error);
            const errorMessage = error.response?.data?.message || "Failed to delete post. Please try again.";
            alert(errorMessage);
        },
    });
}; 