import { api } from "../../../app/api";

export interface ResendOTPRequest {
    email: string;
}

export interface ResendOTPResponse {
    message: string;
    email: string;
}

export const resendOTP = async (data: ResendOTPRequest): Promise<ResendOTPResponse> => {
    const response = await api.post("/otp/resend", data);
    return response.data;
}; 