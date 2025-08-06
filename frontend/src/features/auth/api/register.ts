import { useMutation } from "@tanstack/react-query";
import { api } from "../../../app/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { setCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const register = async (credentials: FormData): Promise<{ user: IUser }> => {
    const response = await api.post("/auth/register", credentials, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const useRegisterMutation = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (credentials: FormData) => register(credentials),
        onSuccess: (data) => {
            console.log("Registration successful:", data);
            dispatch(setCredentials({ user: data.user }));
            navigate("/");
        },
        onError: (error: any) => {
            console.error("Registration failed:", error);
            // Show user-friendly error message
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            alert(errorMessage); // You can replace this with a proper toast notification
        },
    });
};
