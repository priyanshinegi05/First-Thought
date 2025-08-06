import { useQuery } from "@tanstack/react-query";
import { api } from "../../../app/api";
import { INotification } from "../../../types/notification";

const getNotifications = async (): Promise<INotification[]> => {
    const response = await api.get("/notifications/");
    return response.data;
};

export const useNotificationsQuery = () => {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: getNotifications,
    });
}; 