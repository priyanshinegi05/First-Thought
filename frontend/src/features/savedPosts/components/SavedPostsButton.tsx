import React, { useState } from 'react';
import {
    IconButton,
    Badge,
    Tooltip,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {
    BookmarkBorder as BookmarkIcon,
} from '@mui/icons-material';
import { useSavedPostsQuery } from '../api/getSavedPosts';
import SavedPostsDropdown from './SavedPostsDropdown';

const SavedPostsButton: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const { data: savedPosts } = useSavedPostsQuery();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const savedPostsCount = savedPosts?.length || 0;

    return (
        <>
            <Tooltip title="Saved Posts">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{
                        color: '#6B6B6B',
                        padding: isMobile ? "4px" : "8px",
                        '&:hover': {
                            color: '#1A8917',
                            backgroundColor: '#e8f5e8',
                        },
                    }}
                >
                    <Badge
                        badgeContent={savedPostsCount}
                        color="primary"
                        sx={{
                            '& .MuiBadge-badge': {
                                backgroundColor: '#1A8917',
                                color: 'white',
                                fontSize: isMobile ? '0.6rem' : '0.7rem',
                                minWidth: isMobile ? 16 : 18,
                                height: isMobile ? 16 : 18,
                            },
                        }}
                    >
                        <BookmarkIcon sx={{ fontSize: "20px" }} />
                    </Badge>
                </IconButton>
            </Tooltip>
            
            <SavedPostsDropdown
                anchorEl={anchorEl}
                onClose={handleClose}
            />
        </>
    );
};

export default SavedPostsButton; 