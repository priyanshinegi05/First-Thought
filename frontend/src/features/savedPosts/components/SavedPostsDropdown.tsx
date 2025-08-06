import React, { useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Popover,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Chip,
    Divider,
    Button,
    Paper,
    Badge,
} from '@mui/material';
import {
    BookmarkBorder as BookmarkIcon,
    Bookmark as BookmarkFilledIcon,
    Close as CloseIcon,
    OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import { useSavedPostsQuery } from '../api/getSavedPosts';
import { useUnsavePostMutation } from '../api/unsavePost';
import { useQueryClient } from '@tanstack/react-query';
import { formatDate } from '../../../utils/formatDate';
import { useNavigate } from 'react-router-dom';

interface SavedPostsDropdownProps {
    anchorEl: HTMLElement | null;
    onClose: () => void;
}

const SavedPostsDropdown: React.FC<SavedPostsDropdownProps> = ({ anchorEl, onClose }) => {
    const { data: savedPosts, isLoading } = useSavedPostsQuery();
    const unsavePostMutation = useUnsavePostMutation();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    const handleUnsavePost = async (postId: string) => {
        try {
            await unsavePostMutation.mutateAsync(postId);
            // The mutation will handle query invalidation automatically
        } catch (error) {
            console.error('Error unsaving post:', error);
        }
    };

    const handleClose = () => {
        onClose();
    };

    const handlePostClick = (postId: string) => {
        navigate(`/posts/${postId}`);
        onClose();
    };

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            disableScrollLock
            PaperProps={{
                sx: {
                    width: 400,
                    maxHeight: 600,
                    mt: 1,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    borderRadius: 2,
                },
            }}
        >
            <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1A8917' }}>
                        Saved Posts
                    </Typography>
                    <IconButton size="small" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                    {savedPosts?.length || 0} saved posts
                </Typography>
            </Box>

            <Box sx={{ maxHeight: 500, overflow: 'auto' }}>
                {isLoading ? (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Loading saved posts...
                        </Typography>
                    </Box>
                ) : savedPosts && savedPosts.length > 0 ? (
                    <List sx={{ p: 0 }}>
                        {savedPosts.map((savedPost, index) => (
                            <React.Fragment key={savedPost.id}>
                                <ListItem
                                    sx={{
                                        px: 2,
                                        py: 1.5,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            backgroundColor: '#f0f7f0',
                                            transform: 'translateX(4px)',
                                        },
                                    }}
                                    onClick={() => handlePostClick(savedPost.postId)}
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            src={savedPost.post.postImg}
                                            alt={savedPost.post.title}
                                            sx={{ width: 48, height: 48 }}
                                        >
                                            {savedPost.post.title.charAt(0)}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: '#2c3e50',
                                                    lineHeight: 1.3,
                                                    mb: 0.5,
                                                }}
                                            >
                                                {savedPost.post.title}
                                            </Typography>
                                        }
                                        secondary={
                                            <Box>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'text.secondary',
                                                        mb: 0.5,
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    {savedPost.post.preview}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{ color: 'text.secondary' }}
                                                    >
                                                        {formatDate(savedPost.savedAt)}
                                                    </Typography>
                                                    <Chip
                                                        label="Saved"
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: '#e8f5e8',
                                                            color: '#1A8917',
                                                            fontSize: '0.7rem',
                                                            height: 20,
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                        }
                                    />
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handlePostClick(savedPost.postId);
                                            }}
                                            sx={{
                                                color: '#1A8917',
                                                '&:hover': {
                                                    backgroundColor: '#e8f5e8',
                                                },
                                            }}
                                        >
                                            <OpenInNewIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUnsavePost(savedPost.postId);
                                            }}
                                            sx={{
                                                color: '#1A8917',
                                                '&:hover': {
                                                    backgroundColor: '#e8f5e8',
                                                },
                                            }}
                                        >
                                            <BookmarkFilledIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </ListItem>
                                {index < savedPosts.length - 1 && (
                                    <Divider sx={{ mx: 2 }} />
                                )}
                            </React.Fragment>
                        ))}
                    </List>
                ) : (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        <BookmarkIcon
                            sx={{
                                fontSize: 48,
                                color: 'text.secondary',
                                mb: 2,
                                opacity: 0.5,
                            }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'text.secondary',
                                mb: 1,
                                fontWeight: 500,
                            }}
                        >
                            No saved posts yet
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                mb: 2,
                            }}
                        >
                            Start saving posts you love to see them here!
                        </Typography>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={handleClose}
                            sx={{
                                borderColor: '#1A8917',
                                color: '#1A8917',
                                '&:hover': {
                                    borderColor: '#1A8917',
                                    backgroundColor: '#e8f5e8',
                                },
                            }}
                        >
                            Browse Posts
                        </Button>
                    </Box>
                )}
            </Box>
        </Popover>
    );
};

export default SavedPostsDropdown; 