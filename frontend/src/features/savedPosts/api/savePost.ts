import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../app/api";

const savePost = async (postId: string) => {
    const response = await api.post("/saved-posts/", { postId });
    return response.data;
};

export const useSavePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (postId: string) => savePost(postId),
        onSuccess: (_, postId) => {
            // Invalidate saved posts query to refresh the list
            queryClient.invalidateQueries(["savedPosts"]);
            // Invalidate the specific post's saved status
            queryClient.invalidateQueries(["checkIfPostSaved", postId]);
        },
    });
}; 