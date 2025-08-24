import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { selectCurrentUser } from "../../auth/slices/authSlice";
import { CustomContainer } from "../../../components/Layout/CustomContainer";
import Header from "../../../components/Layout/Header";
import { useLogoutQuery } from "../../auth";
import { useState } from "react";
import { EditUserForm } from "../components/EditUserForm";
import defaultAvatar from "../../../assets/images/default_avatar.webp";
import { useGetUserQuery } from "../api/getUser";
import { Spinner } from "../../../components/Elements/Spinner";
import AuthorPostList from "../../posts/components/AuthorPostList";
import { UserCommentsList } from "../components/UserCommentsList";
import { UserLikesList } from "../components/UserLikesList";
import { UserSavedPostsList } from "../components/UserSavedPostsList";
import { useMediaQuery, useTheme, Chip, Alert } from "@mui/material";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EmailIcon from "@mui/icons-material/Email";
import { NewsletterModal } from "../../../components/Elements";
import { api } from "../../../app/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`profile-tabpanel-${index}`}
            aria-labelledby={`profile-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
        </div>
    );
}

const Profile = () => {
    const { userId } = useParams();
    const user = useSelector(selectCurrentUser);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [tabValue, setTabValue] = useState(0);
    const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
    const theme = useTheme();
    const queryClient = useQueryClient();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
    const { refetch: logout } = useLogoutQuery();
    
    const {
        data: userProfile,
        isLoading: isLoadingUser,
        isSuccess: isUserLoaded,
    } = useGetUserQuery(userId || "");

    // Check if user is subscribed to newsletter
    const { data: newsletterStatus } = useQuery({
        queryKey: ['newsletterStatus', userProfile?.email],
        queryFn: async () => {
            if (!userProfile?.email) return null;
            try {
                const response = await api.get(`/newsletter/check-status?email=${encodeURIComponent(userProfile.email)}`);
                return response.data;
            } catch (error) {
                return { isSubscribed: false };
            }
        },
        enabled: !!userProfile?.email,
    });

    // Newsletter subscription mutation
    const subscribeMutation = useMutation({
        mutationFn: async (email: string) => {
            const response = await api.post('/newsletter/subscribe', { email });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['newsletterStatus'] });
        },
    });

    // Newsletter unsubscription mutation
    const unsubscribeMutation = useMutation({
        mutationFn: async (email: string) => {
            const response = await api.post('/newsletter/unsubscribe', { email });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['newsletterStatus'] });
        },
    });

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleNewsletterToggle = async () => {
        if (!userProfile?.email) return;
        
        if (newsletterStatus?.isSubscribed) {
            await unsubscribeMutation.mutateAsync(userProfile.email);
        } else {
            await subscribeMutation.mutateAsync(userProfile.email);
        }
    };

    if (isLoadingUser) {
        return <Spinner />;
    }

    if (!isUserLoaded) {
        return null;
    }

    return (
        <>
            <Header />
            <CustomContainer
                sx={{
                    display: { sm: "flex" },
                    pt: 3,
                    mb: 4,
                }}
            >
                <Paper
                    sx={(theme) => ({
                        flex: { xs: "0 1 45%", md: "0 0 30%" },
                        marginRight: { xs: 0, sm: theme.spacing(4) },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: isMobile ? theme.spacing(1.5) : theme.spacing(2),
                        height: "fit-content",
                        marginBottom: { xs: theme.spacing(2), sm: 0 },
                    })}
                    elevation={2}
                >
                    {!isEditMode && (
                        <Avatar
                            sx={(theme) => ({
                                [theme.breakpoints.up("lg")]: {
                                    width: "220px",
                                    height: "220px",
                                },
                                [theme.breakpoints.up("sm")]: {
                                    width: "140px",
                                    height: "140px",
                                },
                                borderRadius: "50%",
                                width: isMobile ? "80px" : "120px",
                                height: isMobile ? "80px" : "120px",
                                marginBottom: isMobile ? theme.spacing(1.5) : theme.spacing(2),
                            })}
                            src={
                                userProfile?.avatar
                                    ? (userProfile.avatar as string)
                                    : defaultAvatar
                            }
                            alt="Profile image"
                        />
                    )}
                    <Box
                        sx={{
                            width: "100%",
                        }}
                    >
                        {isEditMode ? (
                            <EditUserForm
                                setIsEditMode={setIsEditMode}
                                user={userProfile}
                            />
                        ) : (
                            <Box>
                                                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: isMobile ? "1.2rem" : "1.6rem",
                                    fontWeight: 600,
                                    textAlign: "center",
                                }}
                            >
                                {userProfile?.fullName}
                            </Typography>
                            <Typography
                                variant="h3"
                                sx={{
                                    marginBottom: isMobile ? theme.spacing(1) : theme.spacing(2),
                                    fontWeight: 500,
                                    fontSize: isMobile ? "0.8rem" : "0.9rem",
                                    color: "secondary.main",
                                    textAlign: "center",
                                }}
                            >
                                @{userProfile?.username}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 500,
                                    width: "100%",
                                    fontSize: isMobile ? "0.85rem" : "1rem",
                                    marginBottom: isMobile ? theme.spacing(1.5) : theme.spacing(2),
                                    textAlign: "center",
                                }}
                            >
                                {userProfile?.bio}
                            </Typography>
                                
                                {/* Topics of Interest Section */}
                                {(() => {
                                    // Parse topicsOfInterest if it's a string, or use as array
                                    const topics = typeof userProfile?.topicsOfInterest === 'string' 
                                        ? JSON.parse(userProfile.topicsOfInterest) 
                                        : userProfile?.topicsOfInterest;
                                    
                                    return topics && Array.isArray(topics) && topics.length > 0 ? (
                                        <Box sx={{ marginBottom: isMobile ? theme.spacing(2) : theme.spacing(3) }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize: isMobile ? "0.75rem" : "0.9rem",
                                                    color: "text.secondary",
                                                    marginBottom: isMobile ? theme.spacing(0.5) : theme.spacing(1),
                                                    textAlign: "center",
                                                }}
                                            >
                                                Areas of Interest
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    gap: isMobile ? 0.5 : 1,
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {topics.map((topic: string, index: number) => (
                                                    <Chip
                                                        key={index}
                                                        label={topic}
                                                        size={isMobile ? "small" : "small"}
                                                        sx={{
                                                            backgroundColor: theme.palette.primary.main,
                                                            color: "white",
                                                            fontSize: isMobile ? "0.65rem" : "0.8rem",
                                                            height: isMobile ? "20px" : "24px",
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        </Box>
                                    ) : null;
                                })()}

                                                                {/* Newsletter Subscription Section */}
                                {user?.id === userId && (
                                    <Box sx={{ marginBottom: isMobile ? theme.spacing(2) : theme.spacing(3) }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: isMobile ? "0.75rem" : "0.9rem",
                                                color: "text.secondary",
                                                marginBottom: isMobile ? theme.spacing(0.5) : theme.spacing(1),
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                                justifyContent: "center",
                                            }}
                                        >
                                            <EmailIcon fontSize={isMobile ? "small" : "small"} />
                                            Newsletter
                                        </Typography>
                                        
                                        {newsletterStatus?.isSubscribed ? (
                                            <Alert 
                                                severity="success" 
                                                sx={{ 
                                                    fontSize: isMobile ? "0.65rem" : "0.8rem",
                                                    "& .MuiAlert-message": { fontSize: isMobile ? "0.65rem" : "0.8rem" },
                                                    py: isMobile ? 0.5 : 1,
                                                }}
                                            >
                                                You're subscribed to our newsletter
                                            </Alert>
                                        ) : (
                                            <Alert 
                                                severity="info" 
                                                sx={{ 
                                                    fontSize: isMobile ? "0.65rem" : "0.8rem",
                                                    "& .MuiAlert-message": { fontSize: isMobile ? "0.65rem" : "0.8rem" },
                                                    py: isMobile ? 0.5 : 1,
                                                }}
                                            >
                                                Not subscribed to newsletter
                                            </Alert>
                                        )}
                                        
                                        <Stack direction="row" spacing={isMobile ? 0.5 : 1} sx={{ mt: isMobile ? 0.5 : 1, justifyContent: "center" }}>
                                            <Button
                                                size={isMobile ? "small" : "small"}
                                                variant="outlined"
                                                onClick={() => setNewsletterModalOpen(true)}
                                                sx={{ fontSize: isMobile ? "0.6rem" : "0.75rem" }}
                                            >
                                                Subscribe
                                            </Button>
                                            {newsletterStatus?.isSubscribed && (
                                                <Button
                                                    size={isMobile ? "small" : "small"}
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={handleNewsletterToggle}
                                                    disabled={unsubscribeMutation.isLoading}
                                                    sx={{ fontSize: isMobile ? "0.6rem" : "0.75rem" }}
                                                >
                                                    {unsubscribeMutation.isLoading ? "Unsubscribing..." : "Unsubscribe"}
                                                </Button>
                                            )}
                                        </Stack>
                                    </Box>
                                )}
                            </Box>
                        )}
                        {user?.id === userId && !isEditMode && (
                            <Stack spacing={isMobile ? 0.5 : 1} direction="row">
                                <Button
                                    size={isMobile ? "small" : "medium"}
                                    color="info"
                                    variant="text"
                                    sx={{
                                        fontWeight: 500,
                                        borderRadius: "10px",
                                        textTransform: "initial",
                                        width: "50%",
                                        fontSize: isMobile ? "0.7rem" : "0.875rem",
                                    }}
                                    type="submit"
                                    onClick={() =>
                                        setIsEditMode(
                                            (prevEditMode) => !prevEditMode,
                                        )
                                    }
                                >
                                    {isEditMode ? "Save" : "Edit"}
                                </Button>
                                <Button
                                    size={isMobile ? "small" : "medium"}
                                    color="error"
                                    variant="text"
                                    sx={{
                                        fontWeight: 500,
                                        borderRadius: "10px",
                                        textTransform: "initial",
                                        width: "50%",
                                        fontSize: isMobile ? "0.7rem" : "0.875rem",
                                    }}
                                    onClick={() => logout()}
                                >
                                    Logout
                                </Button>
                            </Stack>
                        )}
                    </Box>
                </Paper>
                
                <Box
                    sx={{
                        flexGrow: 1,
                    }}
                >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs 
                            value={tabValue} 
                            onChange={handleTabChange} 
                            aria-label="profile tabs"
                            variant="scrollable"
                            scrollButtons="auto"
                            sx={{
                                '& .MuiTab-root': {
                                    fontSize: isMobile ? '0.7rem' : '0.875rem',
                                    minHeight: isMobile ? '40px' : '48px',
                                    padding: isMobile ? '6px 8px' : '12px 16px',
                                },
                                '& .MuiTab-iconWrapper': {
                                    fontSize: isMobile ? '16px' : '20px',
                                }
                            }}
                        >
                            <Tab 
                                icon={<RssFeedIcon />} 
                                label="Posts" 
                                iconPosition="start"
                            />
                            <Tab 
                                icon={<CommentIcon />} 
                                label="Comments" 
                                iconPosition="start"
                            />
                            <Tab 
                                icon={<FavoriteIcon />} 
                                label="Likes" 
                                iconPosition="start"
                            />
                            <Tab 
                                icon={<BookmarkIcon />} 
                                label="Saved" 
                                iconPosition="start"
                            />
                        </Tabs>
                    </Box>

                    <TabPanel value={tabValue} index={0}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: isMobile ? 2 : 3,
                            }}
                        >
                            <RssFeedIcon
                                fontSize={isMobile ? "small" : isLargeScreen ? "large" : "medium"}
                            />
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: "600",
                                    fontSize: isMobile ? "1.1rem" : "1.5rem",
                                    ml: isMobile ? 1 : 2,
                                }}
                            >
                                Posts by {userProfile?.fullName}
                            </Typography>
                        </Box>
                        <AuthorPostList userProfileId={userProfile?.id || ""} />
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: isMobile ? 2 : 3,
                            }}
                        >
                            <CommentIcon
                                fontSize={isMobile ? "small" : isLargeScreen ? "large" : "medium"}
                            />
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: "600",
                                    fontSize: isMobile ? "1.1rem" : "1.5rem",
                                    ml: isMobile ? 1 : 2,
                                }}
                            >
                                Comments by {userProfile?.fullName}
                            </Typography>
                        </Box>
                        <UserCommentsList userId={userProfile?.id || ""} />
                    </TabPanel>

                    <TabPanel value={tabValue} index={2}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: isMobile ? 2 : 3,
                            }}
                        >
                            <FavoriteIcon
                                fontSize={isMobile ? "small" : isLargeScreen ? "large" : "medium"}
                            />
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: "600",
                                    fontSize: isMobile ? "1.1rem" : "1.5rem",
                                    ml: isMobile ? 1 : 2,
                                }}
                            >
                                Posts liked by {userProfile?.fullName}
                            </Typography>
                        </Box>
                        <UserLikesList userId={userProfile?.id || ""} />
                    </TabPanel>

                    <TabPanel value={tabValue} index={3}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: isMobile ? 2 : 3,
                            }}
                        >
                            <BookmarkIcon
                                fontSize={isMobile ? "small" : isLargeScreen ? "large" : "medium"}
                            />
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: "600",
                                    fontSize: isMobile ? "1.1rem" : "1.5rem",
                                    ml: isMobile ? 1 : 2,
                                }}
                            >
                                Posts saved by {userProfile?.fullName}
                            </Typography>
                        </Box>
                        <UserSavedPostsList userId={userProfile?.id || ""} />
                    </TabPanel>
                </Box>
            </CustomContainer>

            {/* Newsletter Modal */}
            <NewsletterModal
                open={newsletterModalOpen}
                onClose={() => setNewsletterModalOpen(false)}
            />
        </>
    );
};

export default Profile;
