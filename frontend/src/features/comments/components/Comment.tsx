import { Typography, IconButton, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate } from "../../../utils/formatDate";
import defaultAvatar from "../../../assets/images/default_avatar.webp";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/slices/authSlice";
import { useDeleteCommentMutation } from "../api/deleteComment";
import { ConfirmationModal } from "../../../components/Elements";
import { useState } from "react";

export const Comment = (props: IComment) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const user = useSelector(selectCurrentUser);
    const { mutate: deleteComment, isLoading: isDeleting } = useDeleteCommentMutation();
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeleteComment = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowConfirmation(true);
    };

    const handleConfirmDelete = () => {
        deleteComment(props.id);
        setShowConfirmation(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    const isCommentAuthor = user?.id === props.authorId;

    return (
        <>
            <Box
                sx={{
                    p: isMobile ? 1.5 : 2,
                    borderRadius: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                    border: "1px solid rgba(0, 0, 0, 0.05)",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                    },
                }}
            >
                <Stack direction="row" spacing={isMobile ? 1.5 : 2}>
                    <Box
                        component="img"
                        src={(props.author.avatar as string) || defaultAvatar}
                        alt=""
                        sx={{
                            width: isMobile ? "40px" : "50px",
                            height: isMobile ? "40px" : "50px",
                            borderRadius: "50%",
                            marginRight: isMobile ? "8px" : "12px",
                        }}
                    />
                    <Box sx={{ flex: 1 }}>
                        <Stack 
                            direction="row" 
                            spacing={isMobile ? 0.5 : 1} 
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Stack direction="row" spacing={isMobile ? 0.5 : 1} alignItems="center">
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: isMobile ? "0.8rem" : "0.875rem",
                                    }}
                                >
                                    <Link
                                        to={`/users/${props.author.id}`}
                                        style={{ color: "inherit", textDecoration: "none" }}
                                    >
                                        {props.author.username}
                                    </Link>
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 500,
                                        opacity: 0.8,
                                        fontSize: isMobile ? "0.7rem" : "0.875rem",
                                    }}
                                >
                                    {formatDate(props.updatedAt)}
                                </Typography>
                            </Stack>
                            
                            {/* Delete button for comment author */}
                            {isCommentAuthor && (
                                <Tooltip title="Delete comment">
                                    <IconButton
                                        size={isMobile ? "small" : "small"}
                                        color="error"
                                        disabled={isDeleting}
                                        onClick={handleDeleteComment}
                                        sx={{
                                            opacity: 0.7,
                                            transition: "opacity 0.2s ease-in-out",
                                            padding: isMobile ? "4px" : "8px",
                                            "&:hover": {
                                                opacity: 1,
                                                transform: "scale(1.1)",
                                            },
                                        }}
                                    >
                                        <DeleteIcon fontSize={isMobile ? "small" : "small"} />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Stack>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: isMobile ? "0.85rem" : "1rem",
                                lineHeight: isMobile ? 1.4 : 1.5,
                                mt: isMobile ? 0.5 : 1,
                            }}
                        >
                            {props.content}
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            <ConfirmationModal
                open={showConfirmation}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isDeleting}
                title="Delete Comment"
                message="Are you sure you want to delete this comment? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
            />
        </>
    );
};
