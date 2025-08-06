import { api } from "../../../app/api";

export interface UpdateProfileRequest {
    bio?: string;
    avatar?: string;
    topicsOfInterest?: string[];
}

export interface UpdateProfileResponse {
    message: string;
    user: {
        id: string;
        email: string;
        username: string;
        fullName: string;
        bio: string;
        avatar: string;
        topicsOfInterest: string[];
        createdAt: string;
    };
}

export const updateProfile = async (
    userId: string, 
    data: UpdateProfileRequest
): Promise<UpdateProfileResponse> => {
    const response = await api.put(`/profile-setup/${userId}`, data);
    return response.data;
}; 