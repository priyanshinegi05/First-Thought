export interface INotification {
    id: string;
    type: "like" | "comment";
    message: string;
    isRead: boolean;
    userId: string;
    postId?: string;
    fromUserId?: string;
    createdAt: string;
    post?: {
        id: string;
        title: string;
    };
    fromUser?: {
        id: string;
        username: string;
        fullName: string;
        avatar?: string;
    };
} 