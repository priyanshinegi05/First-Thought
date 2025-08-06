import { useGetAllPostsQuery } from "../api/getAllPosts";
import { Spinner } from "../../../components/Elements/Spinner";
import PostPreview from "./PostPreview";
import Grid from "@mui/material/Grid";
import { Fragment } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";

interface PostFeedProps {
    selectedTopics?: string[];
}

const PostFeed = ({ selectedTopics = [] }: PostFeedProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const allPostsQuery = useGetAllPostsQuery(selectedTopics.length > 0 ? selectedTopics : undefined);
    
    if (allPostsQuery.isLoading) {
        return <Spinner />;
    }

    if (!allPostsQuery.isSuccess) {
        return null;
    }

    return (
        <>
            <Grid container spacing={isMobile ? 0.5 : 2.5}>
                {allPostsQuery.data?.pages.map((page) => {
                    return (
                        <Fragment key={page.page}>
                            {page.posts.length > 0 &&
                                page.posts.map((post: IPost) => {
                                    return (
                                        <Grid
                                            item
                                            key={post.id}
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            xl={3}
                                        >
                                            <PostPreview
                                                key={post.id}
                                                {...post}
                                            />
                                        </Grid>
                                    );
                                })}
                        </Fragment>
                    );
                })}
            </Grid>
            {allPostsQuery.hasNextPage && allPostsQuery.isFetched && (
                <Button
                    onClick={() => allPostsQuery.fetchNextPage()}
                    variant="outlined"
                    color="secondary"
                    size={isMobile ? "small" : "large"}
                    aria-label="Load more"
                    sx={{
                        display: "block",
                        margin: "0 auto",
                        textTransform: "capitalize",
                        fontSize: isMobile ? "0.8em" : "1em",
                        mt: isMobile ? 1.5 : 3,
                        px: isMobile ? 2 : 4,
                    }}
                >
                    View More
                </Button>
            )}

            {allPostsQuery.isFetching && !allPostsQuery.isFetchingNextPage && (
                <Spinner />
            )}
        </>
    );
};

export default PostFeed;
