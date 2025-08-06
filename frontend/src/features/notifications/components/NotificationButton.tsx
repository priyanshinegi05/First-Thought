import React, { useState } from 'react';
import {
    IconButton,
    Badge,
    Tooltip,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {
    Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { useUnreadNotificationCountQuery } from '../api/getUnreadCount';
import NotificationDropdown from './NotificationDropdown';

const NotificationButton: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const { data: unreadCount } = useUnreadNotificationCountQuery();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const unreadCountValue = unreadCount?.count || 0;

    return (
        <>
            <Tooltip title="Notifications">
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
                        badgeContent={unreadCountValue}
                        color="error"
                        sx={{
                            '& .MuiBadge-badge': {
                                backgroundColor: '#f44336',
                                color: 'white',
                                fontSize: isMobile ? '0.6rem' : '0.7rem',
                                minWidth: isMobile ? 16 : 18,
                                height: isMobile ? 16 : 18,
                            },
                        }}
                    >
                        <NotificationsIcon sx={{ fontSize: "20px" }} />
                    </Badge>
                </IconButton>
            </Tooltip>
            
            <NotificationDropdown
                anchorEl={anchorEl}
                onClose={handleClose}
            />
        </>
    );
};

export default NotificationButton; 