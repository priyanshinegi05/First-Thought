import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/slices/authSlice";
import { CustomContainer } from "../../../components/Layout/CustomContainer";
import { useGetSinglePostQuery } from "../api/getSinglePost";
import { CommentSection } from "../../comments/components/CommentSection";
import RenderedPost from "../components/RenderedPost";
import { Spinner } from "../../../components/Elements/Spinner";
import { useState } from "react";
import EditorTabs from "../components/EditorTabs";
import Box from "@mui/material/Box";
import Header from "../../../components/Layout/Header";
import { useMediaQuery, useTheme } from "@mui/material";

const Post = () => {
    const { postId } = useParams();
    const user = useSelector(selectCurrentUser);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const { data: post, isSuccess, isLoading } = useGetSinglePostQuery(postId);
    if (!isSuccess) {
        return null;
    }
    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <Header />
            <CustomContainer maxWidth="xl">
                {isEdit ? (
                <EditorTabs postId={post.id} isEdit={isEdit} />
            ) : (
                <Box sx={{ pb: isMobile ? 2 : 4, mt: isMobile ? 1 : 2 }}>
                    <RenderedPost
                        id={post.id}
                        title={post.title}
                        content={post.content}
                        preview={post.preview}
                        author={post.author}
                        authorId={post.author.id}
                        createdAt={post.createdAt}
                        isEditAllowed={post.author.id === user?.id}
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        postImg={post.postImg}
                        likesNumber={post.likesNumber}
                    />
                    <Box sx={{ mt: isMobile ? 3 : 6, mb: isMobile ? 2 : 4 }}>
                        <CommentSection postId={postId || ""} />
                    </Box>
                </Box>
            )}
            </CustomContainer>
        </>
    );
};

export default Post;
