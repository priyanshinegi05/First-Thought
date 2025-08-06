import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Comment } from "./Comment";
import Stack from "@mui/material/Stack";
import { usePostCommentsQuery } from "../api/getPostComments";
import { sortCommentsByDate } from "../../../utils/sortByDate";
import CommentForm from "./CommentForm";
import { useMediaQuery, useTheme } from "@mui/material";

export const CommentSection = (props: { postId: string }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { data: postComments, isSuccess, isLoading, error } = usePostCommentsQuery(
        props.postId,
    );

    if (isLoading) {
        return (
            <Box 
                mt={isMobile ? 3 : 5} 
                sx={{ 
                    borderTop: "1px solid #e0e0e0",
                    pt: isMobile ? 2 : 3,
                    minHeight: "200px",
                }}
            >
                <Typography 
                    variant="h5" 
                    fontWeight={600} 
                    mb={isMobile ? 2 : 3} 
                    color="primary"
                    sx={{
                        fontSize: isMobile ? "1.25rem" : "1.5rem",
                    }}
                >
                    Loading comments...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box 
                mt={isMobile ? 3 : 5} 
                sx={{ 
                    borderTop: "1px solid #e0e0e0",
                    pt: isMobile ? 2 : 3,
                    minHeight: "200px",
                }}
            >
                <Typography 
                    variant="h5" 
                    fontWeight={600} 
                    mb={isMobile ? 2 : 3} 
                    color="error"
                    sx={{
                        fontSize: isMobile ? "1.25rem" : "1.5rem",
                    }}
                >
                    Error loading comments
                </Typography>
            </Box>
        );
    }

    if (!isSuccess || !postComments) {
        return (
            <Box 
                mt={isMobile ? 3 : 5} 
                sx={{ 
                    borderTop: "1px solid #e0e0e0",
                    pt: isMobile ? 2 : 3,
                    minHeight: "200px",
                }}
            >
                <Typography 
                    variant="h5" 
                    fontWeight={600} 
                    mb={isMobile ? 2 : 3} 
                    color="primary"
                    sx={{
                        fontSize: isMobile ? "1.25rem" : "1.5rem",
                    }}
                >
                    No comments available
                </Typography>
                <CommentForm postId={props.postId} />
            </Box>
        );
    }

    return (
        <Box 
            mt={isMobile ? 3 : 5} 
            sx={{ 
                borderTop: "1px solid #e0e0e0",
                pt: isMobile ? 2 : 3,
                minHeight: "200px",
            }}
        >
            <Typography 
                variant="h5" 
                fontWeight={600} 
                mb={isMobile ? 2 : 3} 
                color="primary"
                sx={{
                    fontSize: isMobile ? "1.25rem" : "1.5rem",
                }}
            >
                {postComments.length} comments
            </Typography>
            <CommentForm postId={props.postId} />
            <Stack spacing={isMobile ? 2 : 3} pt={isMobile ? 2 : 3} mb={2}>
                {sortCommentsByDate(postComments).map((comment: IComment) => (
                    <Comment key={comment.id} {...comment} />
                ))}
            </Stack>
        </Box>
    );
};
