import { useQuery } from "@tanstack/react-query";
import { api } from "../../../app/api";

const getUserSavedPosts = async (userId: string) => {
    const response = await api.get(`/users/${userId}/saved-posts`);
    return response.data;
};

export const useGetUserSavedPostsQuery = (userId: string) => {
    return useQuery({
        queryKey: ['userSavedPosts', userId],
        queryFn: () => getUserSavedPosts(userId),
        enabled: !!userId,
    });
}; 