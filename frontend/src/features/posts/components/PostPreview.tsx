import Box from "@mui/material/Box";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate } from "../../../utils/formatDate";
import {
    useCheckLikeQuery,
    useLikePostMutation,
    useDislikePostMutation,
} from "../../likes";
import { useDeletePostMutation } from "../api/deletePost";
import { Theme, useMediaQuery, Chip } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/slices/authSlice";
import { ConfirmationModal, ShareButton } from "../../../components/Elements";
import { SaveButton } from "../../savedPosts/components/SaveButton";
import { useState } from "react";

const PostPreview = (props: IPost) => {
    const navigate = useNavigate();
    const { mutate: likePost } = useLikePostMutation();
    const { mutate: dislikePost } = useDislikePostMutation();
    const { mutate: deletePost, isLoading: isDeleting } = useDeletePostMutation();
    const user = useSelector(selectCurrentUser);
    const { data: isPostLiked } = useCheckLikeQuery(user?.id || "", props.id);
    const isSmallScreen = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("md"),
    );
    const isMobile = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("sm"),
    );
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleLikePost = async () => {
        const data = {
            postId: props.id,
            userId: user?.id,
            authorId: props.authorId,
        };

        if (isPostLiked) {
            dislikePost(data);
        } else {
            likePost(data);
        }
    };

    const handleDeletePost = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowConfirmation(true);
    };

    const handleConfirmDelete = () => {
        deletePost(props.id);
        setShowConfirmation(false);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
    };

    return (
        <Box
            sx={{
                display: "flex",
                marginBottom: isMobile ? "12px" : isSmallScreen ? "20px" : "16px",
                flexDirection: "column",
                padding: isMobile ? "8px" : "12px",
                borderRadius: isMobile ? "6px" : "8px",
                backgroundColor: isMobile ? "#fafafa" : "transparent",
            }}
        >
            <Box
                component={NavLink}
                to={`/posts/${props.id}`}
                sx={{
                    display: "block",
                    transition: "opacity 0.2s ease-in-out",
                    cursor: "pointer",
                    textDecoration: "none",
                    mb: isMobile ? 1.5 : 2.5,
                    "&:hover": {
                        opacity: 0.9,
                    },
                }}
            >
                {props.postImg && (
                    <Box
                        component="img"
                        sx={(theme) => ({
                            objectFit: "cover",
                            borderRadius: "5%",
                            width: "100%",
                            [theme.breakpoints.up("md")]: {
                                height: "200px",
                            },
                            [theme.breakpoints.down("sm")]: {
                                height: "100px",
                            },
                            height: "160px",
                        })}
                        src={props.postImg as string}
                        alt="Blog image"
                    />
                )}
            </Box>
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        color: "highlight.main",
                        mb: isMobile ? 0.5 : { xs: 1, md: 1.5 },
                        alignItems: "center",
                        fontSize: isMobile ? "0.7rem" : "0.8rem",
                    }}
                >
                    {/* Author Avatar */}
                    <Box
                        component={NavLink}
                        to={`/users/${props.author.id}`}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            textDecoration: "none",
                            color: "inherit",
                            mr: 1,
                        }}
                    >
                        <Box
                            component="img"
                            src={typeof props.author.avatar === 'string' ? props.author.avatar : "/default_avatar.webp"}
                            alt={`${props.author.fullName}'s avatar`}
                            sx={{
                                width: isMobile ? "20px" : "28px",
                                height: isMobile ? "20px" : "28px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                border: "1px solid #e0e0e0",
                            }}
                        />
                    </Box>
                    <Box
                        to={`/users/${props.author.id}`}
                        component={NavLink}
                        sx={{
                            color: "inherit",
                            textUnderlineOffset: "2px",
                            textDecoration: "none",
                            transition: "text-decoration 0.2s ease-in-out",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                            flexShrink: 0,
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 600,
                                fontSize: isMobile ? "0.7rem" : "0.8rem",
                            }}
                        >
                            {props.author.fullName}
                        </Typography>
                    </Box>
                    <Box sx={{ px: 0.5 }}>•</Box>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 600,
                            fontSize: isMobile ? "0.7rem" : "0.8rem",
                        }}
                    >
                        {formatDate(props.createdAt)}
                    </Typography>
                </Box>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="start"
                >
                    <Box
                        component={NavLink}
                        to={`/posts/${props.id}`}
                        sx={(theme) => ({
                            display: "inline-block",
                            fontWeight: 600,
                            fontSize: isMobile ? "0.9rem" : "1.1rem",
                            lineHeight: isMobile ? 1.2 : 1.3,
                            marginBottom: isMobile ? theme.spacing(0.5) : theme.spacing(1),
                            color: "inherit",
                            textDecoration: "none",
                            transition: "text-decoration 0.2s ease-in-out",
                            objectFit: "cover",

                            "&:hover": {
                                textDecoration: "underline",
                            },
                        })}
                    >
                        {props.title}
                    </Box>
                    <Box
                        component={Link}
                        to={`/posts/${props.id}`}
                        sx={{
                            color: "inherit",
                            pl: 0.5,
                            transition: "scale .2s ease-in-out",
                            "&:hover": {
                                scale: "110%",
                            },
                        }}
                    >
                        <ArrowOutwardIcon
                            fontSize="small"
                            sx={{ fontSize: isMobile ? "1rem" : "1.2rem" }}
                        />
                    </Box>
                </Stack>
                <Typography
                    variant="body1"
                    sx={{
                        marginBottom: isMobile ? 0.5 : { xs: 1, md: 1.5 },
                        color: "secondary.main",
                        fontSize: isMobile ? "0.75rem" : "0.85rem",
                        lineHeight: isMobile ? 1.3 : 1.4,
                    }}
                >
                    {props.preview}
                </Typography>
                
                {/* Tags Display */}
                {(() => {
                    // Parse tags if it's a JSON string, otherwise use as is
                    let parsedTags: string[] = [];
                    if (props.tags) {
                        if (typeof props.tags === 'string') {
                            try {
                                parsedTags = JSON.parse(props.tags);
                            } catch (error) {
                                console.error('Error parsing tags:', error);
                                parsedTags = [];
                            }
                        } else if (Array.isArray(props.tags)) {
                            parsedTags = props.tags;
                        }
                    }
                    
                    return parsedTags && parsedTags.length > 0 ? (
                        <Box sx={{ mb: isMobile ? 1 : 1.5 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                }}
                            >
                                {parsedTags.map((tag: string, index: number) => (
                                    <Chip
                                        key={index}
                                        label={tag}
                                        size="small"
                                        sx={{
                                            fontSize: isMobile ? "0.5rem" : "0.6rem",
                                            height: isMobile ? "18px" : "20px",
                                            backgroundColor: "primary.main",
                                            color: "white",
                                            "& .MuiChip-label": {
                                                px: isMobile ? 0.3 : 0.5,
                                            },
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    ) : null;
                })()}
                <Stack
                    direction="row"
                    spacing={{ xs: 0, md: 1 }}
                    alignItems="flex-start"
                    flexDirection={isSmallScreen ? "column" : "row"}
                    mt="auto"
                >
                    <Box>
                        <Button
                            variant="text"
                            startIcon={
                                isPostLiked ? (
                                    <FavoriteOutlinedIcon color="info" sx={{ fontSize: isMobile ? "1rem" : "1.2rem" }} />
                                ) : (
                                    <FavoriteBorderOutlinedIcon sx={{ fontSize: isMobile ? "1rem" : "1.2rem" }} />
                                )
                            }
                            size={isSmallScreen ? "small" : "medium"}
                            onClick={handleLikePost}
                            sx={{
                                fontSize: isMobile ? "0.65rem" : "0.75rem",
                                minWidth: "auto",
                                px: isMobile ? 0.5 : 1,
                            }}
                        >
                            {props.likesNumber}
                        </Button>
                        <Button
                            variant="text"
                            startIcon={<ChatBubbleOutlineIcon sx={{ fontSize: isMobile ? "1rem" : "1.2rem" }} />}
                            size={isSmallScreen ? "small" : "medium"}
                            onClick={() => navigate(`/posts/${props.id}`)}
                            sx={{
                                fontSize: isMobile ? "0.65rem" : "0.75rem",
                                minWidth: "auto",
                                px: isMobile ? 0.5 : 1,
                            }}
                        >
                            {props.comments.length}
                        </Button>
                        {/* Share button */}
                        <ShareButton
                            url={`${window.location.origin}/posts/${props.id}`}
                            title={props.title}
                            size="small"
                        />
                        {/* Save button */}
                        <SaveButton postId={props.id} size="small" />
                        {/* Delete button for post owner */}
                        {user?.id === props.authorId && (
                            <IconButton
                                color="error"
                                disabled={isDeleting}
                                onClick={handleDeletePost}
                                size={isSmallScreen ? "small" : "medium"}
                                sx={{
                                    transition: "all 0.2s ease-in-out",
                                    "&:hover": {
                                        transform: "scale(1.1)",
                                    },
                                }}
                            >
                                <DeleteIcon sx={{ fontSize: isMobile ? "1rem" : "1.2rem" }} />
                            </IconButton>
                        )}
                    </Box>
                </Stack>
            </Box>
            <ConfirmationModal
                open={showConfirmation}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isLoading={isDeleting}
                title="Delete Post"
                message="Are you sure you want to delete this post? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
            />
        </Box>
    );
};

export default PostPreview;
