import { api } from "../../../app/api";

export interface SendOTPRequest {
    email: string;
}

export interface SendOTPResponse {
    message: string;
    email: string;
}

export const sendOTP = async (data: SendOTPRequest): Promise<SendOTPResponse> => {
    const response = await api.post("/otp/send", data);
    return response.data;
}; 