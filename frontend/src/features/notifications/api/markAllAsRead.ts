import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../app/api";

const markAllAsRead = async () => {
    const response = await api.patch("/notifications/mark-all-read");
    return response.data;
};

export const useMarkAllNotificationsAsReadMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: markAllAsRead,
        onSuccess: () => {
            // Invalidate notifications and unread count
            queryClient.invalidateQueries(["notifications"]);
            queryClient.invalidateQueries(["unreadNotificationCount"]);
        },
    });
}; 