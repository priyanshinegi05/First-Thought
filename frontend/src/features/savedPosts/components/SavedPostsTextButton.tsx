import React, { useState } from 'react';
import {
    Box,
    Badge,
    Tooltip,
} from '@mui/material';
import { useSavedPostsQuery } from '../api/getSavedPosts';
import SavedPostsDropdown from './SavedPostsDropdown';

const SavedPostsTextButton: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const { data: savedPosts } = useSavedPostsQuery();

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
                <Box
                    onClick={handleClick}
                    sx={{
                        color: "#6B6B6B",
                        textDecoration: "none",
                        fontSize: "1rem",
                        fontWeight: 500,
                        padding: "8px 0",
                        borderBottom: "2px solid transparent",
                        transition: "all 0.2s ease-in-out",
                        cursor: "pointer",
                        position: "relative",
                        "&:hover": {
                            color: "#1A8917",
                        },
                    }}
                >
                    Saved
                    {savedPostsCount > 0 && (
                        <Badge
                            badgeContent={savedPostsCount}
                            color="primary"
                            sx={{
                                position: "absolute",
                                top: -8,
                                right: -20,
                                '& .MuiBadge-badge': {
                                    backgroundColor: '#1A8917',
                                    color: 'white',
                                    fontSize: '0.7rem',
                                    minWidth: 18,
                                    height: 18,
                                },
                            }}
                        />
                    )}
                </Box>
            </Tooltip>
            
            <SavedPostsDropdown
                anchorEl={anchorEl}
                onClose={handleClose}
            />
        </>
    );
};

export default SavedPostsTextButton; 