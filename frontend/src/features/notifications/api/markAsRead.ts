import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../app/api";

const markAsRead = async (notificationId: string) => {
    const response = await api.patch(`/notifications/${notificationId}/read`);
    return response.data;
};

export const useMarkNotificationAsReadMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: markAsRead,
        onSuccess: () => {
            // Invalidate notifications and unread count
            queryClient.invalidateQueries(["notifications"]);
            queryClient.invalidateQueries(["unreadNotificationCount"]);
        },
    });
}; 