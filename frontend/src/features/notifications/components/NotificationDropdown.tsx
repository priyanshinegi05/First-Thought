import React from 'react';
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
    Badge,
} from '@mui/material';
import {
    Notifications as NotificationsIcon,
    Favorite as LikeIcon,
    Comment as CommentIcon,
    Close as CloseIcon,
    CheckCircle as ReadIcon,
} from '@mui/icons-material';
import { useNotificationsQuery } from '../api/getNotifications';
import { useMarkNotificationAsReadMutation } from '../api/markAsRead';
import { useMarkAllNotificationsAsReadMutation } from '../api/markAllAsRead';
// ...existing code...
import { formatDate } from '../../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import { INotification } from '../../../types/notification';

interface NotificationDropdownProps {
    anchorEl: HTMLElement | null;
    onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ anchorEl, onClose }) => {
    const { data: notifications, isLoading } = useNotificationsQuery();
    const markAsReadMutation = useMarkNotificationAsReadMutation();
    const markAllAsReadMutation = useMarkAllNotificationsAsReadMutation();
// ...existing code...
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    const handleMarkAsRead = async (notificationId: string) => {
        try {
            await markAsReadMutation.mutateAsync(notificationId);
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await markAllAsReadMutation.mutateAsync();
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    const handleNotificationClick = (notification: INotification) => {
        // Mark as read when clicked
        if (!notification.isRead) {
            handleMarkAsRead(notification.id);
        }
        
        // Navigate to the post if it exists
        if (notification.postId) {
            navigate(`/posts/${notification.postId}`);
        }
        
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'like':
                return <LikeIcon sx={{ color: '#e91e63' }} />;
            case 'comment':
                return <CommentIcon sx={{ color: '#2196f3' }} />;
            default:
                return <NotificationsIcon />;
        }
    };

    const getNotificationColor = (type: string) => {
        switch (type) {
            case 'like':
                return '#e91e63';
            case 'comment':
                return '#2196f3';
            default:
                return '#1A8917';
        }
    };

    const unreadCount = notifications?.filter(n => !n.isRead).length || 0;

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
                        Notifications
                    </Typography>
                    <IconButton size="small" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {notifications?.length || 0} notifications
                    </Typography>
                    {unreadCount > 0 && (
                        <Button
                            size="small"
                            onClick={handleMarkAllAsRead}
                            sx={{
                                color: '#1A8917',
                                fontSize: '0.75rem',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#e8f5e8',
                                },
                            }}
                        >
                            Mark all as read
                        </Button>
                    )}
                </Box>
            </Box>

            <Box sx={{ maxHeight: 500, overflow: 'auto' }}>
                {isLoading ? (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Loading notifications...
                        </Typography>
                    </Box>
                ) : notifications && notifications.length > 0 ? (
                    <List sx={{ p: 0 }}>
                        {notifications.map((notification, index) => (
                            <React.Fragment key={notification.id}>
                                <ListItem
                                    sx={{
                                        px: 2,
                                        py: 1.5,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease-in-out',
                                        backgroundColor: notification.isRead ? 'transparent' : '#f8f9fa',
                                        '&:hover': {
                                            backgroundColor: notification.isRead ? '#f0f7f0' : '#e8f5e8',
                                            transform: 'translateX(4px)',
                                        },
                                    }}
                                    onClick={() => handleNotificationClick(notification)}
                                >
                                    <ListItemAvatar>
                                        <Badge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            badgeContent={
                                                !notification.isRead ? (
                                                    <Box
                                                        sx={{
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: '50%',
                                                            backgroundColor: getNotificationColor(notification.type),
                                                        }}
                                                    />
                                                ) : null
                                            }
                                        >
                                            <Avatar
                                                src={notification.fromUser?.avatar}
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    backgroundColor: getNotificationColor(notification.type),
                                                }}
                                            >
                                                {getNotificationIcon(notification.type)}
                                            </Avatar>
                                        </Badge>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: notification.isRead ? 400 : 600,
                                                    color: '#2c3e50',
                                                    lineHeight: 1.3,
                                                    mb: 0.5,
                                                }}
                                            >
                                                {notification.message}
                                            </Typography>
                                        }
                                        secondary={
                                            <Box>
                                                <Typography
                                                    variant="caption"
                                                    sx={{ color: 'text.secondary' }}
                                                >
                                                    {formatDate(notification.createdAt)}
                                                </Typography>
                                                {notification.post && (
                                                    <Chip
                                                        label={notification.post.title}
                                                        size="small"
                                                        sx={{
                                                            ml: 1,
                                                            backgroundColor: '#e8f5e8',
                                                            color: '#1A8917',
                                                            fontSize: '0.7rem',
                                                            height: 20,
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        }
                                    />
                                    {!notification.isRead && (
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleMarkAsRead(notification.id);
                                            }}
                                            sx={{
                                                color: getNotificationColor(notification.type),
                                                '&:hover': {
                                                    backgroundColor: '#e8f5e8',
                                                },
                                            }}
                                        >
                                            <ReadIcon fontSize="small" />
                                        </IconButton>
                                    )}
                                </ListItem>
                                {index < notifications.length - 1 && (
                                    <Divider sx={{ mx: 2 }} />
                                )}
                            </React.Fragment>
                        ))}
                    </List>
                ) : (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        <NotificationsIcon
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
                            No notifications yet
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                mb: 2,
                            }}
                        >
                            You'll see notifications here when someone interacts with your posts!
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

export default NotificationDropdown; 