import { IconButton, Tooltip } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useSavePostMutation } from "../api/savePost";
import { useUnsavePostMutation } from "../api/unsavePost";
import { useCheckIfPostSavedQuery } from "../api/checkIfPostSaved";

interface SaveButtonProps {
    postId: string;
    size?: "small" | "medium" | "large";
}

export const SaveButton = ({ postId, size = "medium" }: SaveButtonProps) => {
    console.log("SaveButton rendered with postId:", postId); // Debug log
    
    const { data: savedData, isLoading: isChecking } = useCheckIfPostSavedQuery(postId);
    const { mutate: savePost, isLoading: isSaving } = useSavePostMutation();
    const { mutate: unsavePost, isLoading: isUnsaving } = useUnsavePostMutation();

    const isSaved = savedData?.isSaved || false;
    const isLoading = isSaving || isUnsaving || isChecking;

    const handleToggleSave = () => {
        console.log("SaveButton clicked! postId:", postId, "isSaved:", isSaved); // Debug log
        if (isSaved) {
            unsavePost(postId);
        } else {
            savePost(postId);
        }
    };

    return (
        <Tooltip title={isSaved ? "Remove from saved" : "Save post"}>
            <span>
                <IconButton
                    onClick={handleToggleSave}
                    disabled={isLoading}
                    color={isSaved ? "primary" : "default"}
                    size={size}
                    sx={{
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                            transform: "scale(1.1)",
                        },
                        cursor: "pointer",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    {isSaved ? <BookmarkIcon sx={{ fontSize: "1.2rem" }} /> : <BookmarkBorderIcon sx={{ fontSize: "1.2rem" }} />}
                </IconButton>
            </span>
        </Tooltip>
    );
}; 