import { api } from "../../../app/api";
import { useQuery } from "@tanstack/react-query";

const getSavedPosts = async (): Promise<ISavedPost[]> => {
    const response = await api.get("/saved-posts/");
    return response.data;
};

export const useSavedPostsQuery = () => {
    return useQuery({
        queryKey: ["savedPosts"],
        queryFn: getSavedPosts,
    });
}; 