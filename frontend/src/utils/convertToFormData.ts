export const convertToFormData = (data: Partial<IPost> | Partial<IUser>) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
        if (value) {
            if (Array.isArray(value)) {
                // Handle arrays by converting to JSON string
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value as string);
            }
        }
    }
    return formData;
};
