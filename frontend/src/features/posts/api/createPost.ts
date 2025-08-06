import { api } from "../../../app/api";
import { useMutation } from "@tanstack/react-query";

const createPost = async (data: FormData): Promise<IPost> => {
    console.log("Frontend: Sending post data");
    console.log("FormData entries:");
    for (let [key, value] of data.entries()) {
        console.log(key, value);
    }
    
    const response = await api.post("/posts", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const useCreatePostMutation = () => {
    return useMutation({
        mutationFn: (postData: FormData) => createPost(postData),
        onError: (error: any) => {
            console.error("Frontend: Create post error:", error);
            console.error("Error response:", error.response?.data);
        },
    });
};
