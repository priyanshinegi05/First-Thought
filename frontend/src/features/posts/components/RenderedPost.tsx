import ReactMarkdown from "react-markdown";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Dispatch, SetStateAction, useState } from "react";
import remarkGfm from "remark-gfm";
import { useDeletePostMutation } from "../api/deletePost";
import { useNavigate } from "react-router-dom";
import { ConfirmationModal, ShareButton } from "../../../components/Elements";
import { SaveButton } from "../../savedPosts/components/SaveButton";
import { useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/slices/authSlice";
import {
    useCheckLikeQuery,
    useLikePostMutation,
    useDislikePostMutation,
} from "../../likes";

interface IRenderedPostProps extends Partial<IPost> {
    isEdit?: boolean;
    setIsEdit?: Dispatch<SetStateAction<boolean>>;
    isEditAllowed?: boolean;
}

const RenderedPost = (props: IRenderedPostProps) => {
    console.log("RenderedPost props:", props); // Debug log
    const { mutate: deletePost, isLoading: isDeleting } = useDeletePostMutation();
    const { mutate: likePost } = useLikePostMutation();
    const { mutate: dislikePost } = useDislikePostMutation();
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const user = useSelector(selectCurrentUser);
    const { data: isPostLiked } = useCheckLikeQuery(user?.id || "", props.id || "");

    const handleDeletePost = () => {
        setShowConfirmation(true);
    };

    const handleConfirmDelete = () => {
        deletePost(props.id!);
        navigate("/");
        setShowConfirmation(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    const handleLikePost = async () => {
        const data = {
            postId: props.id!,
            userId: user?.id,
            authorId: props.authorId!,
        };

        if (isPostLiked) {
            dislikePost(data);
        } else {
            likePost(data);
        }
    };

    return (
        <Box sx={{ mt: isMobile ? 1 : 2, mb: isMobile ? 2 : 4 }}>
            {props.postImg && (
                <Box
                    sx={{
                        mb: isMobile ? 2 : 3,
                        borderRadius: isMobile ? 1 : 2,
                        overflow: "hidden",
                        border: "1px solid #e0e0e0",
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "#f5f5f5",
                    }}
                >
                    <Box
                        component="img"
                        src={props.postImg as string}
                        alt="Post image"
                        sx={{
                            maxWidth: "100%",
                            maxHeight: isMobile ? "250px" : "400px",
                            objectFit: "contain",
                            display: "block",
                        }}
                    />
                </Box>
            )}
            <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                py={isMobile ? 2 : 3}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontWeight: isMobile ? "600" : "700",
                        fontSize: isMobile ? "1.8rem" : "3rem",
                        lineHeight: isMobile ? 1.3 : 1.2,
                        letterSpacing: isMobile ? "normal" : "-0.02em",
                    }}
                >
                    {props.title}
                </Typography>
                <Stack direction="row" spacing={isMobile ? 0.5 : 1} alignItems="center">
                    {/* Share button for all users */}
                    <ShareButton
                        url={`${window.location.origin}/posts/${props.id}`}
                        title={props.title}
                        size={isMobile ? "small" : "medium"}
                    />
                    {/* Save button for all users */}
                    {props.id && <SaveButton postId={props.id} size={isMobile ? "small" : "medium"} />}
                </Stack>
            </Stack>
            
            {/* Author Information */}
            {props.author && (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: isMobile ? 2 : 3,
                        pb: isMobile ? 1.5 : 2,
                        borderBottom: "1px solid #e0e0e0",
                    }}
                >
                    <Box
                        component="img"
                        src={typeof props.author.avatar === 'string' ? props.author.avatar : "/default_avatar.webp"}
                        alt={`${props.author.fullName}'s avatar`}
                        sx={{
                            width: isMobile ? "32px" : "40px",
                            height: isMobile ? "32px" : "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "1px solid #e0e0e0",
                            mr: isMobile ? 1.5 : 2,
                        }}
                    />
                    <Box>
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 600,
                                color: "text.primary",
                                fontSize: isMobile ? "0.9rem" : "inherit",
                            }}
                        >
                            {props.author.fullName}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: "text.secondary",
                                fontSize: isMobile ? "0.75rem" : "0.875rem",
                            }}
                        >
                            {props.createdAt && new Date(props.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </Typography>
                    </Box>
                </Box>
            )}
            
            <Typography
                variant="body1"
                sx={{
                    fontWeight: "500",
                    fontStyle: "italic",
                    pb: isMobile ? 2 : 3,
                    fontSize: isMobile ? "0.9rem" : "inherit",
                    lineHeight: isMobile ? 1.4 : "inherit",
                }}
            >
                {props.preview}
            </Typography>
            <Box
                sx={{
                    fontSize: isMobile ? "0.9rem" : "1.15em",
                    py: isMobile ? 0.3 : 0.5,
                    lineHeight: isMobile ? 1.5 : "inherit",
                    fontFamily: "'Charter', 'Georgia', 'Times New Roman', serif",
                }}
                dangerouslySetInnerHTML={{ __html: props.content || "" }}
            />
            
            {/* Like Section - End of Post */}
            <Box sx={{ 
                mt: isMobile ? 3 : 4, 
                mb: isMobile ? 2 : 3,
                pt: isMobile ? 2 : 3,
                borderTop: "1px solid #e0e0e0",
                display: "flex",
                alignItems: "center",
                gap: isMobile ? 1 : 2,
            }}>
                <Button
                    variant="text"
                    startIcon={
                        isPostLiked ? (
                            <FavoriteOutlinedIcon color="info" sx={{ fontSize: isMobile ? "1rem" : "1.2rem" }} />
                        ) : (
                            <FavoriteBorderOutlinedIcon sx={{ fontSize: isMobile ? "1rem" : "1.2rem" }} />
                        )
                    }
                    size={isMobile ? "small" : "medium"}
                    onClick={handleLikePost}
                    sx={{
                        fontSize: isMobile ? "0.65rem" : "0.75rem",
                        minWidth: "auto",
                        px: isMobile ? 0.5 : 1,
                    }}
                >
                    {props.likesNumber || 0}
                </Button>
                
                {/* Edit and Delete buttons for post owner */}
                {props?.isEditAllowed && !props?.isEdit && (
                    <>
                        <IconButton
                            onClick={() =>
                                props.setIsEdit
                                    ? props.setIsEdit((prevState) => !prevState)
                                    : null
                            }
                            size={isMobile ? "small" : "medium"}
                            sx={{
                                transition: "all 0.2s ease-in-out",
                                padding: isMobile ? "4px" : "8px",
                                color: "#6B6B6B",
                                "&:hover": {
                                    transform: "scale(1.1)",
                                    color: "#1A8917",
                                },
                            }}
                        >
                            <EditIcon sx={{ fontSize: isMobile ? "1rem" : "1.2rem" }} />
                        </IconButton>
                        <IconButton
                            disabled={isDeleting}
                            onClick={handleDeletePost}
                            size={isMobile ? "small" : "medium"}
                            sx={{
                                transition: "all 0.2s ease-in-out",
                                padding: isMobile ? "4px" : "8px",
                                color: "#6B6B6B",
                                "&:hover": {
                                    transform: "scale(1.1)",
                                    color: "#f44336",
                                },
                            }}
                        >
                            <DeleteIcon sx={{ fontSize: isMobile ? "1rem" : "1.2rem" }} />
                        </IconButton>
                    </>
                )}
            </Box>
            
            <ConfirmationModal
                open={showConfirmation}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isDeleting}
                title="Delete Post"
                message="Are you sure you want to delete this post? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
            />
        </Box>
    );
};

export default RenderedPost;
