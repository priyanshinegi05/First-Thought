import { useQuery } from "@tanstack/react-query";
import { api } from "../../../app/api";

interface UnreadCountResponse {
    count: number;
}

const getUnreadCount = async (): Promise<UnreadCountResponse> => {
    const response = await api.get("/notifications/unread-count");
    return response.data;
};

export const useUnreadNotificationCountQuery = () => {
    return useQuery({
        queryKey: ["unreadNotificationCount"],
        queryFn: getUnreadCount,
        refetchInterval: 30000, // Refetch every 30 seconds
    });
}; 