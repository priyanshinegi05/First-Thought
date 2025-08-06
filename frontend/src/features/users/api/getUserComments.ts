import { useQuery } from "@tanstack/react-query";
import { api } from "../../../app/api";

const getUserComments = async (userId: string) => {
    const response = await api.get(`/users/${userId}/comments`);
    return response.data;
};

export const useGetUserCommentsQuery = (userId: string) => {
    return useQuery({
        queryKey: ['userComments', userId],
        queryFn: () => getUserComments(userId),
        enabled: !!userId,
    });
}; 