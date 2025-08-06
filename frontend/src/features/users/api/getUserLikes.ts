import { useQuery } from "@tanstack/react-query";
import { api } from "../../../app/api";

const getUserLikes = async (userId: string) => {
    const response = await api.get(`/users/${userId}/likes`);
    return response.data;
};

export const useGetUserLikesQuery = (userId: string) => {
    return useQuery({
        queryKey: ['userLikes', userId],
        queryFn: () => getUserLikes(userId),
        enabled: !!userId,
    });
}; 