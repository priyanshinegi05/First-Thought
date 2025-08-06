import { Typography, Box } from "@mui/material";
import { CustomContainer } from "../../../components/Layout/CustomContainer";
import { useSavedPostsQuery } from "../api/getSavedPosts";
import { Spinner } from "../../../components/Elements/Spinner";
import PostPreview from "../../posts/components/PostPreview";
import Grid from "@mui/material/Grid";
import Header from "../../../components/Layout/Header";

const SavedPosts = () => {
    const { data: savedPosts, isLoading, isSuccess } = useSavedPostsQuery();

    if (isLoading) {
        return <Spinner />;
    }

    if (!isSuccess) {
        return null;
    }

    return (
        <>
            <Header />
            <CustomContainer maxWidth="xl">
                <Box sx={{ mt: 2 }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 400,
                        mb: 3,
                        padding: theme => theme.spacing(0, 3),
                    }}
                >
                    Saved Posts
                </Typography>
                
                {savedPosts.length > 0 ? (
                    <Grid container spacing={2}>
                        {savedPosts.map((savedPost: ISavedPost) => (
                            <Grid item xs={12} md={6} lg={4} xl={3} key={savedPost.id}>
                                <PostPreview {...savedPost.post} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box
                        sx={{
                            textAlign: "center",
                            py: 8,
                            px: 3,
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: "text.secondary",
                                mb: 2,
                            }}
                        >
                            No saved posts yet
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "text.secondary",
                            }}
                        >
                            Start saving posts you love to see them here!
                        </Typography>
                    </Box>
                )}
            </Box>
            </CustomContainer>
        </>
    );
};

export default SavedPosts; 