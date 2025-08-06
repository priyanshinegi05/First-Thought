import { useCreatePostMutation } from "../api/createPost";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Typography from "@mui/material/Typography";
import { Spinner } from "../../../components/Elements";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useMediaQuery, Theme, TextField, Chip, Autocomplete } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { convertToFormData } from "../../../utils/convertToFormData";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/slices/authSlice";
import { useUpdatePostMutation } from "../api/updatePost";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "./RichTextEditor";

function stripHtml(html: string) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
}

interface IPostFormProps extends Partial<IPost> {
    setTitle: Dispatch<SetStateAction<string>>;
    setPreview: Dispatch<SetStateAction<string>>;
    setContent: Dispatch<SetStateAction<string>>;
    setPostImg: Dispatch<SetStateAction<string | File>>;
    isEdit?: boolean;
    setIsEdit?: Dispatch<SetStateAction<boolean>>;
}

import { availableTopics } from "../../../utils/topics";

export const postValidationSchema = yup.object({
    title: yup
        .string()
        .required("Title is required")
        .max(100, "Title must be less than 100 characters"),
    preview: yup
        .string()
        .required("Preview is required")
        .max(120, "Preview must be less than 120 characters"),
    content: yup
        .string()
        .test('hasText', 'Content is required', (value) => {
            if (!value) return false;
            return stripHtml(value).trim().length > 0;
        }),
    postImg: yup
        .mixed()
        .test("postImgLength", "Post image is required", (value) => {
            if (value instanceof FileList) {
                return value.length > 0;
            }
            return true;
        }),
});
export type PostForm = yup.InferType<typeof postValidationSchema>;

export const PostForm = (props: IPostFormProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>(props.tags || []);
    
    const {
        handleSubmit,
        register,
        formState: { errors, isDirty },
        watch,
        setValue,
    } = useForm<PostForm>({
        resolver: yupResolver<PostForm>(postValidationSchema),
        defaultValues: {
            title: props.title || "",
            preview: props.preview || "",
            content: props.content || "",
            postImg: props.postImg,
        },
    });
    const isSmallScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("sm"),
    );
    const {
        mutate: createPost,
        isLoading: isPostCreating,
        isSuccess: isCreatingSuccess,
    } = useCreatePostMutation();
    const {
        mutate: updatePost,
        isLoading: isPostUpdating,
        isSuccess: isUpdatingSuccess,
    } = useUpdatePostMutation(props.id || "");
    const user = useSelector(selectCurrentUser);
    const navigate = useNavigate();

    const handleFormSubmit = (formData: PostForm) => {
        console.log("Form submitted with data:", formData);
        console.log("Selected tags:", selectedTags);
        
        const postData = {
            ...formData,
            postImg: (formData.postImg as FileList)[0],
            tags: selectedTags,
        };

        console.log("Post data to be sent:", postData);

        if (!isDirty && props.setIsEdit) {
            props.setIsEdit(false);
        }

        props.isEdit
            ? updatePost(convertToFormData(postData))
            : createPost(
                convertToFormData({ ...postData, authorId: user?.id }),
            );
    };

    useEffect(() => {
        const postImg = watch("postImg");
        if (postImg instanceof FileList && postImg.length > 0) {
            const file = postImg[0];
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            props.setPostImg(file);
        }
        
        // Cleanup function to revoke object URL
        return () => {
            if (selectedImage) {
                URL.revokeObjectURL(selectedImage);
            }
        };
    }, [watch("postImg")]);

    useEffect(() => {
        props.setTitle(props.title || "");
        props.setContent(props.content || "");
        props.setPostImg(props.postImg || "");
        props.setPreview(props.preview || "");
    }, []);

    useEffect(() => {
        if (isCreatingSuccess || isUpdatingSuccess) {
            navigate("/");
        }
    }, [isCreatingSuccess, isUpdatingSuccess]);

    console.log("Form errors:", errors);
    console.log("Form is dirty:", isDirty);
    console.log("Selected tags length:", selectedTags.length);
    
    if (isPostCreating || isPostUpdating) {
        return <Spinner />;
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(handleFormSubmit)}
            sx={{
                mt: 2,
            }}
            noValidate
        >
            <TextField
                {...register("title")}
                size={isSmallScreen ? "small" : "medium"}
                type="text"
                fullWidth
                required
                margin="normal"
                placeholder="Title..."
                variant="standard"
                sx={{
                    ".MuiInputBase-input": {
                        fontWeight: 600,
                        fontSize: "1.4em",
                    },
                }}
                onChange={(e) => props.setTitle(e.target.value)}
            />
            <Typography
                color="error"
                variant="body1"
                sx={{ fontWeight: 500, pb: 1 }}
            >
                {errors.title?.message}
            </Typography>
            <TextField
                {...register("preview")}
                size={isSmallScreen ? "small" : "medium"}
                type="text"
                fullWidth
                required
                margin="normal"
                placeholder="Preview..."
                multiline
                rows={2}
                variant="standard"
                onChange={(e) => props.setPreview(e.target.value)}
            />
            <Typography
                color="error"
                variant="body1"
                sx={{ fontWeight: 500, pb: 1 }}
            >
                {errors.preview?.message}
            </Typography>
            
            {/* Rich Text Editor for Content */}
            <Box sx={{ mt: 2, mb: 2 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: "text.secondary",
                        marginBottom: 1,
                    }}
                >
                    Content
                </Typography>
                <RichTextEditor
                    value={props.content || ""}
                    onChange={(newContent) => {
                        props.setContent(newContent);
                        setValue("content", newContent, { shouldValidate: true });
                    }}
                    placeholder="Start writing your content..."
                />
            </Box>
            
            <Typography
                color="error"
                variant="body1"
                sx={{ fontWeight: 500, pb: 1 }}
            >
                {errors.content?.message}
            </Typography>
            
            {/* Tags Selection Section */}
            <Box sx={{ mt: 3, mb: 2 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        color: "text.secondary",
                        marginBottom: 1,
                    }}
                >
                    Select Tags (at least one required)
                </Typography>
                <Autocomplete
                    multiple
                    freeSolo
                    options={availableTopics}
                    value={selectedTags}
                    onChange={(event: any, newValue: string[]) => {
                        setSelectedTags(newValue);
                    }}
                    renderInput={(params: any) => (
                        <TextField
                            {...params}
                            placeholder="Type to search tags or add custom ones..."
                            variant="outlined"
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'background.paper',
                                    '& fieldset': {
                                        borderColor: 'divider',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                },
                            }}
                        />
                    )}
                    renderTags={(value: string[], getTagProps: any) =>
                        value.map((option: string, index: number) => (
                            <Chip
                                {...getTagProps({ index })}
                                key={option}
                                label={option}
                                size="small"
                                color="primary"
                                variant="filled"
                                sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    '& .MuiChip-deleteIcon': {
                                        color: 'white',
                                        '&:hover': {
                                            color: 'error.light',
                                        },
                                    },
                                }}
                            />
                        ))
                    }
                    renderOption={(props: any, option: string) => (
                        <Box component="li" {...props}>
                            <Typography variant="body2">
                                {option}
                            </Typography>
                        </Box>
                    )}
                    PaperComponent={({ children }) => (
                        <Box
                            sx={{
                                mt: 1,
                                boxShadow: 8,
                                borderRadius: 1,
                                backgroundColor: 'background.paper',
                                '& .MuiAutocomplete-listbox': {
                                    maxHeight: 200,
                                    backgroundColor: 'background.paper',
                                },
                            }}
                        >
                            {children}
                        </Box>
                    )}
                />
                <Typography
                    variant="caption"
                    sx={{
                        color: "text.secondary",
                        fontStyle: "italic",
                        mt: 1,
                        display: "block"
                    }}
                >
                    Type to search existing tags or add custom ones. Press Enter to add custom tags.
                </Typography>
                {selectedTags.length === 0 && (
                    <Typography
                        color="error"
                        variant="body2"
                        sx={{ fontWeight: 500, mt: 1 }}
                    >
                        Please select at least one tag
                    </Typography>
                )}
            </Box>
            
            {/* Image Preview Section */}
            {(selectedImage || props.postImg) && (
                <Box
                    sx={{
                        mt: 2,
                        mb: 2,
                        borderRadius: 2,
                        overflow: "hidden",
                        border: "1px solid #e0e0e0",
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "#f5f5f5",
                    }}
                >
                    <Box
                        component="img"
                        src={selectedImage || (typeof props.postImg === 'string' ? props.postImg : (props.postImg instanceof File ? URL.createObjectURL(props.postImg) : ''))}
                        alt="Post preview"
                        sx={{
                            maxWidth: "100%",
                            maxHeight: "400px",
                            objectFit: "contain",
                            display: "block",
                        }}
                    />
                </Box>
            )}
            
            <Stack direction="row" spacing={2} alignItems="center">
                <Button
                    variant="text"
                    component="label"
                    endIcon={<AttachFileIcon />}
                    size={isSmallScreen ? "small" : "large"}
                >
                    Add Cover
                    <input
                        {...register("postImg")}
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        required
                    />
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    endIcon={<SendSharpIcon />}
                    size={isSmallScreen ? "small" : "large"}
                    disabled={selectedTags.length === 0}
                >
                    Publish
                </Button>
            </Stack>
            <Typography
                color="error"
                variant="body1"
                sx={{ fontWeight: 500, pb: 1 }}
            >
                {errors.postImg?.message}
            </Typography>
        </Box>
    );
};
