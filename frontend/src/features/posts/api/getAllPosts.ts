import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../app/api";

const getAllPosts = async (
    page: number,
    tags?: string[],
): Promise<{ page: number; totalPages: number; posts: IPost[] }> => {
    const params = new URLSearchParams({ page: page.toString() });
    if (tags && tags.length > 0) {
        tags.forEach(tag => params.append('tags', tag));
    }
    const response = await api.get(`/posts/?${params.toString()}`);
    return response.data;
};

export const useGetAllPostsQuery = (tags?: string[]) => {
    return useInfiniteQuery({
        queryKey: ["posts", "all", tags],
        queryFn: ({ pageParam = 1 }) => getAllPosts(pageParam, tags),
        getNextPageParam: (lastPage) =>
            lastPage.totalPages <= lastPage.page
                ? undefined
                : Number(lastPage.page) + 1,
    });
};
