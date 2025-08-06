import React, { useState } from "react";
import { IconButton, Tooltip, Snackbar, Alert } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import CheckIcon from "@mui/icons-material/Check";

interface ShareButtonProps {
    url: string;
    title?: string;
    size?: "small" | "medium" | "large";
}

const ShareButton: React.FC<ShareButtonProps> = ({ url, title, size = "medium" }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleShare = async () => {
        try {
            // Try to use the Web Share API first (for mobile devices)
            if (navigator.share) {
                await navigator.share({
                    title: title || "Check out this post",
                    url: url,
                });
            } else {
                // Fallback to clipboard copy
                await navigator.clipboard.writeText(url);
                setIsCopied(true);
                setShowSuccess(true);
                
                // Reset the copied state after 2 seconds
                setTimeout(() => {
                    setIsCopied(false);
                }, 2000);
            }
        } catch (error) {
            console.error("Error sharing:", error);
            // Fallback for older browsers
            try {
                const textArea = document.createElement("textarea");
                textArea.value = url;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
                
                setIsCopied(true);
                setShowSuccess(true);
                
                setTimeout(() => {
                    setIsCopied(false);
                }, 2000);
            } catch (fallbackError) {
                console.error("Fallback copy failed:", fallbackError);
            }
        }
    };

    const handleCloseSnackbar = () => {
        setShowSuccess(false);
    };

    return (
        <>
            <Tooltip title={isCopied ? "Link copied!" : "Share this post"}>
                <IconButton
                    onClick={handleShare}
                    size={size}
                    sx={{
                        color: isCopied ? "success.main" : "inherit",
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                            transform: "scale(1.1)",
                            color: isCopied ? "success.main" : "primary.main",
                        },
                    }}
                >
                    {isCopied ? <CheckIcon sx={{ fontSize: "1.2rem" }} /> : <ShareIcon sx={{ fontSize: "1.2rem" }} />}
                </IconButton>
            </Tooltip>
            
            <Snackbar
                open={showSuccess}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Link copied to clipboard!
                </Alert>
            </Snackbar>
        </>
    );
};

export default ShareButton; 