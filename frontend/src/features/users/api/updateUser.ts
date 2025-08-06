import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../app/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { setCredentials } from "../../auth/slices/authSlice";
import { convertToFormData } from "../../../utils/convertToFormData";

const updateUser = async (
    data: Partial<IUser> & { avatarPath: string },
    userId: string,
): Promise<IUser> => {
    const { avatarPath, ...userData } = data;
    const response = await api.patch(
        `/users/${userId}`,
        convertToFormData(userData),
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    );
    return response.data.data; // Access the data property from the response
};

export const useUpdateUserMutation = (userId: string) => {
    const dispatch = useDispatch<AppDispatch>();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userData: Partial<IUser> & { avatarPath: string }) =>
            updateUser(userData, userId),
        onMutate: async (updatedUser) => {
            const queryKeys = ["users", "user", updatedUser.id];
            await queryClient.cancelQueries(queryKeys);
            const previousUser = queryClient.getQueryData<IUser>(queryKeys);
            if (previousUser) {
                queryClient.setQueryData<IUser>(queryKeys, (oldUser) => {
                    const newUser = {
                        ...updatedUser,
                        id: oldUser?.id,
                        avatar: updatedUser.avatarPath,
                    };
                    return newUser as IUser;
                });
            }
            return { previousUser };
        },
        onError: (err, newUser, context) => {
            console.error('Update user error:', err);
            if (context?.previousUser) {
                queryClient.setQueryData<IUser>(
                    ["users", "user", newUser.id],
                    context.previousUser,
                );
            }
        },
        onSettled: (newUser) => {
            if (newUser?.id) {
                queryClient.invalidateQueries(["users", "user", newUser.id]);
            }
        },
        onSuccess: (data) => {
            console.log('Update user success:', data);
            // Ensure we have all required user fields before updating credentials
            if (data && data.id) {
                dispatch(setCredentials({ user: data }));
            } else {
                console.error('Invalid user data received:', data);
            }
        },
    });
};
