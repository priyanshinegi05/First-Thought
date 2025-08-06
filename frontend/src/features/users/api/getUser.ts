import { api } from "../../../app/api";
import { useQuery } from "@tanstack/react-query";

const getUser = async (userId: string): Promise<IUser> => {
    const response = await api.get(`/users/${userId}`);
    return response.data.data; // Access the data property from the response
};

export const useGetUserQuery = (userId: string) => {
    return useQuery({
        queryKey: ["users", "user", userId],
        queryFn: () => getUser(userId),
    });
};
