import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../app/api";

const unsavePost = async (postId: string) => {
    const response = await api.delete(`/saved-posts/${postId}`);
    return response.data;
};

export const useUnsavePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (postId: string) => unsavePost(postId),
        onSuccess: (_, postId) => {
            // Invalidate saved posts query to refresh the list
            queryClient.invalidateQueries(["savedPosts"]);
            // Invalidate the specific post's saved status
            queryClient.invalidateQueries(["checkIfPostSaved", postId]);
        },
    });
}; 