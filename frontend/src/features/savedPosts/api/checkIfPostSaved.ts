import { api } from "../../../app/api";
import { useQuery } from "@tanstack/react-query";

const checkIfPostSaved = async (postId: string): Promise<{ isSaved: boolean }> => {
    const response = await api.get(`/saved-posts/check/${postId}`);
    return response.data;
};

export const useCheckIfPostSavedQuery = (postId: string) => {
    return useQuery({
        queryKey: ["checkIfPostSaved", postId],
        queryFn: () => checkIfPostSaved(postId),
        enabled: !!postId,
    });
}; 