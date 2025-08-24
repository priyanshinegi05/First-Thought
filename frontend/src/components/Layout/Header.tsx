import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/slices/authSlice";
import { NavLink } from "react-router-dom";
import SavedPostsButton from "../../features/savedPosts/components/SavedPostsButton";
import NotificationButton from "../../features/notifications/components/NotificationButton";
import { Avatar, IconButton, Tooltip, useMediaQuery, useTheme, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Person as PersonIcon, Menu as MenuIcon, Home as HomeIcon, DriveFileRenameOutline as DriveFileRenameOutlineIcon } from "@mui/icons-material";
import { useState } from "react";
import defaultAvatar from "../../assets/images/default_avatar.webp";

const Header = () => {
    const user = useSelector(selectCurrentUser);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <Box
                sx={(theme) => ({
                    borderBottom: "1px solid #E1E1E1",
                    background: "linear-gradient(135deg, #f0f9f4 0%, #e8f5e8 100%)",
                    position: "sticky",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    padding: isMobile ? theme.spacing(0.5, 2) : theme.spacing(2, 4),
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: isMobile ? "50px" : "80px", // Even smaller height for mobile
                    width: "100%",
                    margin: 0,
                })}
            >
            {/* Left Side - Logo */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? 0.5 : 2,
                    cursor: "pointer",
                    "&:hover": {
                        opacity: 0.8,
                        transform: "scale(1.02)",
                        transition: "all 0.2s ease-in-out",
                    },
                    transition: "all 0.2s ease-in-out",
                }}
            >
                <Box
                    component="img"
                    src="/F.png"
                    alt="F"
                    sx={{
                        height: isMobile ? "25px" : "50px",
                        width: "auto",
                    }}
                />
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontFamily: "'Dancing Script', cursive",
                        fontWeight: 600,
                        fontSize: isMobile ? "1.1rem" : "2rem",
                        color: "#1A8917",
                        textDecoration: "none",
                        letterSpacing: "0.02em",
                    }}
                >
                    First Thought
                </Typography>
            </Box>
            

            
            {/* Right Side - Navigation */}
            {isMobile ? (
                // Mobile: Show icons and hamburger menu
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {/* Home Icon */}
                    <Tooltip title="Home">
                        <IconButton
                            component={NavLink}
                            to="/"
                            size="small"
                            sx={{
                                color: "#6B6B6B",
                                padding: isMobile ? "4px" : "8px",
                                '&:hover': {
                                    color: "#1A8917",
                                    backgroundColor: "#e8f5e8",
                                },
                            }}
                        >
                            <HomeIcon sx={{ fontSize: "20px" }} />
                        </IconButton>
                    </Tooltip>
                    
                    {/* Write Icon - Only show if user is logged in */}
                    {user && (
                        <Tooltip title="Write">
                            <IconButton
                                component={NavLink}
                                to="/posts/editor"
                                size="small"
                                sx={{
                                    color: "#6B6B6B",
                                    padding: isMobile ? "4px" : "8px",
                                    '&:hover': {
                                        color: "#1A8917",
                                        backgroundColor: "#e8f5e8",
                                    },
                                }}
                            >
                                <DriveFileRenameOutlineIcon sx={{ fontSize: "20px" }} />
                            </IconButton>
                        </Tooltip>
                    )}
                    
                    {/* Saved Posts Icon - Only show if user is logged in */}
                    {user && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <SavedPostsButton />
                        </Box>
                    )}
                    
                    {user && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <NotificationButton />
                        </Box>
                    )}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        size="small"
                        sx={{
                            color: "#6B6B6B",
                            padding: isMobile ? "4px" : "8px",
                            '&:hover': {
                                color: "#1A8917",
                                backgroundColor: "#e8f5e8",
                            },
                        }}
                    >
                        <MenuIcon sx={{ fontSize: "20px" }} />
                    </IconButton>
                </Box>
            ) : (
                // Desktop: Show full navigation
                <Box
                    sx={{
                        display: "flex",
                        gap: isMobile ? 2 : 4,
                        alignItems: "center",
                    }}
                >
                {user ? (
                    // Authenticated user navigation
                    <>
                        <Box
                            component={NavLink}
                            to="/"
                            sx={{
                                color: "#6B6B6B",
                                textDecoration: "none",
                                fontSize: isMobile ? "0.9rem" : "1rem",
                                fontWeight: 500,
                                padding: isMobile ? "6px 0" : "8px 0",
                                borderBottom: "2px solid transparent",
                                transition: "all 0.2s ease-in-out",
                                "&:hover": {
                                    color: "#1A8917",
                                },
                                "&.active": {
                                    color: "#1A8917",
                                    borderBottom: "2px solid #1A8917",
                                },
                            }}
                        >
                            Home
                        </Box>
                        <Box
                            component={NavLink}
                            to="/posts/editor"
                            sx={{
                                color: "#6B6B6B",
                                textDecoration: "none",
                                fontSize: isMobile ? "0.9rem" : "1rem",
                                fontWeight: 500,
                                padding: isMobile ? "6px 0" : "8px 0",
                                borderBottom: "2px solid transparent",
                                transition: "all 0.2s ease-in-out",
                                "&:hover": {
                                    color: "#1A8917",
                                },
                                "&.active": {
                                    color: "#1A8917",
                                    borderBottom: "2px solid #1A8917",
                                },
                            }}
                        >
                            Write
                        </Box>
                        <Box
                            component={NavLink}
                            to="/about"
                            sx={{
                                color: "#6B6B6B",
                                textDecoration: "none",
                                fontSize: isMobile ? "0.9rem" : "1rem",
                                fontWeight: 500,
                                padding: isMobile ? "6px 0" : "8px 0",
                                borderBottom: "2px solid transparent",
                                transition: "all 0.2s ease-in-out",
                                "&:hover": {
                                    color: "#1A8917",
                                },
                                "&.active": {
                                    color: "#1A8917",
                                    borderBottom: "2px solid #1A8917",
                                },
                            }}
                        >
                            About
                        </Box>
                        <SavedPostsButton />
                        <NotificationButton />
                        <Tooltip title="Profile">
                            <IconButton
                                component={NavLink}
                                to={`/users/${user?.id}`}
                                sx={{
                                    color: "#6B6B6B",
                                    '&:hover': {
                                        color: "#1A8917",
                                        backgroundColor: "#e8f5e8",
                                    },
                                }}
                            >
                                <Avatar
                                    src={typeof user?.avatar === 'string' ? user.avatar : defaultAvatar}
                                    sx={{
                                        width: isMobile ? 28 : 32,
                                        height: isMobile ? 28 : 32,
                                        fontSize: isMobile ? "0.75rem" : "0.875rem",
                                    }}
                                >
                                    {user?.fullName?.charAt(0) || <PersonIcon sx={{ fontSize: isMobile ? "16px" : "20px" }} />}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                    </>
                ) : (
                    // Non-authenticated user navigation
                    <>
                        <Box
                            component={NavLink}
                            to="/auth/login"
                            sx={{
                                color: "#6B6B6B",
                                textDecoration: "none",
                                fontSize: isMobile ? "0.9rem" : "1rem",
                                fontWeight: 500,
                                padding: isMobile ? "6px 0" : "8px 0",
                                borderBottom: "2px solid transparent",
                                transition: "all 0.2s ease-in-out",
                                "&:hover": {
                                    color: "#1A8917",
                                },
                                "&.active": {
                                    color: "#1A8917",
                                    borderBottom: "2px solid #1A8917",
                                },
                            }}
                        >
                            Login
                        </Box>
                        <Box
                            component={NavLink}
                            to="/auth/register"
                            sx={{
                                color: "#6B6B6B",
                                textDecoration: "none",
                                fontSize: isMobile ? "0.9rem" : "1rem",
                                fontWeight: 500,
                                padding: isMobile ? "6px 0" : "8px 0",
                                borderBottom: "2px solid transparent",
                                transition: "all 0.2s ease-in-out",
                                "&:hover": {
                                    color: "#1A8917",
                                },
                                "&.active": {
                                    color: "#1A8917",
                                    borderBottom: "2px solid #1A8917",
                                },
                            }}
                        >
                            Sign Up
                        </Box>
                    </>
                )}
            </Box>
            )}

            </Box>

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { 
                        boxSizing: 'border-box', 
                        width: isMobile ? 240 : 280,
                        background: 'linear-gradient(135deg, #f0f9f4 0%, #e8f5e8 100%)',
                    },
                }}
            >
                <Box sx={{ p: isMobile ? 1.5 : 2, borderBottom: '1px solid #E1E1E1' }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: "'Dancing Script', cursive",
                            fontWeight: 600,
                            fontSize: isMobile ? "1.1rem" : "1.25rem",
                            color: "#1A8917",
                        }}
                    >
                        Menu
                    </Typography>
                </Box>
                <List sx={{ pt: isMobile ? 0.5 : 1 }}>
                    {user ? (
                        <>
                            <ListItem 
                                component={NavLink} 
                                to={`/users/${user?.id}`}
                                onClick={handleDrawerToggle}
                                sx={{
                                    color: "#6B6B6B",
                                    textDecoration: "none",
                                    padding: isMobile ? "8px 16px" : "12px 24px",
                                    "&:hover": {
                                        backgroundColor: "#e8f5e8",
                                        color: "#1A8917",
                                    },
                                    "&.active": {
                                        backgroundColor: "#e8f5e8",
                                        color: "#1A8917",
                                        borderRight: "3px solid #1A8917",
                                    },
                                }}
                            >
                                <ListItemText 
                                    primary="Profile" 
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: isMobile ? "0.9rem" : "1rem",
                                        }
                                    }}
                                />
                            </ListItem>
                            <ListItem 
                                component={NavLink} 
                                to="/about" 
                                onClick={handleDrawerToggle}
                                sx={{
                                    color: "#6B6B6B",
                                    textDecoration: "none",
                                    padding: isMobile ? "8px 16px" : "12px 24px",
                                    "&:hover": {
                                        backgroundColor: "#e8f5e8",
                                        color: "#1A8917",
                                    },
                                    "&.active": {
                                        backgroundColor: "#e8f5e8",
                                        color: "#1A8917",
                                        borderRight: "3px solid #1A8917",
                                    },
                                }}
                            >
                                <ListItemText 
                                    primary="About" 
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: isMobile ? "0.9rem" : "1rem",
                                        }
                                    }}
                                />
                            </ListItem>
                        </>
                    ) : (
                        <>
                            <ListItem 
                                component={NavLink} 
                                to="/auth/login" 
                                onClick={handleDrawerToggle}
                                sx={{
                                    color: "#6B6B6B",
                                    textDecoration: "none",
                                    padding: isMobile ? "8px 16px" : "12px 24px",
                                    "&:hover": {
                                        backgroundColor: "#e8f5e8",
                                        color: "#1A8917",
                                    },
                                    "&.active": {
                                        backgroundColor: "#e8f5e8",
                                        color: "#1A8917",
                                        borderRight: "3px solid #1A8917",
                                    },
                                }}
                            >
                                <ListItemText 
                                    primary="Login" 
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: isMobile ? "0.9rem" : "1rem",
                                        }
                                    }}
                                />
                            </ListItem>
                            <ListItem 
                                component={NavLink} 
                                to="/auth/register" 
                                onClick={handleDrawerToggle}
                                sx={{
                                    color: "#6B6B6B",
                                    textDecoration: "none",
                                    padding: isMobile ? "8px 16px" : "12px 24px",
                                    "&:hover": {
                                        backgroundColor: "#e8f5e8",
                                        color: "#1A8917",
                                    },
                                    "&.active": {
                                        backgroundColor: "#e8f5e8",
                                        color: "#1A8917",
                                        borderRight: "3px solid #1A8917",
                                    },
                                }}
                            >
                                <ListItemText 
                                    primary="Sign Up" 
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontSize: isMobile ? "0.9rem" : "1rem",
                                        }
                                    }}
                                />
                            </ListItem>
                        </>
                    )}
                </List>
            </Drawer>
        </>
    );
};

export default Header;
