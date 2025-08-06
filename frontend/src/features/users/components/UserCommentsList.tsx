import { Box, Typography, Paper, Avatar, Chip, useMediaQuery, useTheme } from "@mui/material";
import { useGetUserCommentsQuery } from "../api/getUserComments";
import { Spinner } from "../../../components/Elements/Spinner";
import defaultAvatar from "../../../assets/images/default_avatar.webp";
import { formatDate } from "../../../utils/formatDate";
import { Link } from "react-router-dom";

interface UserCommentsListProps {
    userId: string;
}

export const UserCommentsList = ({ userId }: UserCommentsListProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { data: response, isLoading, error } = useGetUserCommentsQuery(userId);
    const comments = response?.data || [];

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <Typography variant="body1" color="error">
                Failed to load comments
            </Typography>
        );
    }

    if (!comments || comments.length === 0) {
        return (
            <Typography variant="body1" color="text.secondary">
                No comments yet
            </Typography>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {comments.map((comment: any) => (
                <Paper key={comment.id} elevation={1} sx={{ p: isMobile ? 2 : 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Avatar
                            src={comment.author?.avatar || defaultAvatar}
                            alt={comment.author?.fullName}
                            sx={{ width: 40, height: 40 }}
                        />
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {comment.author?.fullName}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {formatDate(comment.createdAt)}
                                </Typography>
                            </Box>
                            
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                {comment.content}
                            </Typography>
                            
                            <Link 
                                to={`/posts/${comment.postId}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <Chip
                                    label="View Post"
                                    size="small"
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: theme.palette.primary.dark,
                                        }
                                    }}
                                />
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            ))}
        </Box>
    );
}; 