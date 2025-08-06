import { api } from "../../../app/api";

export interface VerifyOTPRequest {
    email: string;
    otp: string;
    username: string;
    password: string;
    fullName: string;
}

export interface VerifyOTPResponse {
    message: string;
    user: {
        id: string;
        email: string;
        username: string;
        fullName: string;
        bio: string;
        avatar: string;
        topicsOfInterest: string;
        createdAt: string;
    };
    requiresProfileSetup: boolean;
}

export const verifyOTP = async (data: VerifyOTPRequest): Promise<VerifyOTPResponse> => {
    const response = await api.post("/otp/verify", data);
    return response.data;
}; 