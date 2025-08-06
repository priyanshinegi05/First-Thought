import { Box, Typography, Paper, Avatar, Chip, useMediaQuery, useTheme } from "@mui/material";
import { useGetUserSavedPostsQuery } from "../api/getUserSavedPosts";
import { Spinner } from "../../../components/Elements/Spinner";
import defaultAvatar from "../../../assets/images/default_avatar.webp";
import { formatDate } from "../../../utils/formatDate";
import { Link } from "react-router-dom";

interface UserSavedPostsListProps {
    userId: string;
}

export const UserSavedPostsList = ({ userId }: UserSavedPostsListProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { data: response, isLoading, error } = useGetUserSavedPostsQuery(userId);
    const savedPosts = response?.data || [];

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <Typography variant="body1" color="error">
                Failed to load saved posts
            </Typography>
        );
    }

    if (!savedPosts || savedPosts.length === 0) {
        return (
            <Typography variant="body1" color="text.secondary">
                No saved posts yet
            </Typography>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {savedPosts.map((savedPost: any) => (
                <Paper key={savedPost.id} elevation={1} sx={{ p: isMobile ? 2 : 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Avatar
                            src={savedPost.post?.author?.avatar || defaultAvatar}
                            alt={savedPost.post?.author?.fullName}
                            sx={{ width: 40, height: 40 }}
                        />
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {savedPost.post?.author?.fullName}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Saved on {formatDate(savedPost.createdAt)}
                                </Typography>
                            </Box>
                            
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                {savedPost.post?.title}
                            </Typography>
                            
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {savedPost.post?.content?.substring(0, 150)}...
                            </Typography>
                            
                            <Link 
                                to={`/posts/${savedPost.postId}`}
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