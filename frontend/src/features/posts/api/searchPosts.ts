import { useQuery } from "@tanstack/react-query";
import { api } from "../../../app/api";

const searchPosts = async (query: string) => {
    const response = await api.get(`/posts/search?q=${encodeURIComponent(query)}`);
    return response.data;
};

export const useSearchPostsQuery = (query: string) => {
    return useQuery({
        queryKey: ["searchPosts", query],
        queryFn: () => searchPosts(query),
        enabled: !!query && query.length > 0,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}; 