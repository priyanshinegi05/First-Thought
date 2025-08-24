// ...existing code...
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    IconButton,
    useMediaQuery,
    useTheme,
    Fade
} from "@mui/material";
import { Close as CloseIcon, Email as EmailIcon } from "@mui/icons-material";
import { NewsletterForm } from "./NewsletterForm";

interface NewsletterModalProps {
    open: boolean;
    onClose: () => void;
}

export const NewsletterModal = ({ open, onClose }: NewsletterModalProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            fullScreen={isMobile}
            PaperProps={{
                sx: {
                    borderRadius: isMobile ? 0 : 2,
                    background: '#ffffff',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                }
            }}
            TransitionComponent={Fade}
            transitionDuration={200}
        >
            {/* Header */}
            <DialogTitle
                sx={{
                    background: '#1A8917',
                    color: 'white',
                    textAlign: 'center',
                    position: 'relative',
                    pb: 2,
                    pt: 3
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                    <EmailIcon sx={{ fontSize: 24, mr: 1 }} />
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                        Newsletter
                    </Typography>
                </Box>
                
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Stay updated with our latest posts
                </Typography>
            </DialogTitle>

            {/* Content */}
            <DialogContent sx={{ p: isMobile ? 3 : 4, textAlign: 'center' }}>
                <Typography
                    variant="h6"
                    sx={{
                        color: '#2c3e50',
                        fontWeight: 600,
                        mb: 2
                    }}
                >
                    Subscribe to our newsletter
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: '#6B6B6B',
                        lineHeight: 1.6,
                        mb: 3
                    }}
                >
                    Get notified about new stories, writing tips, and community updates delivered to your inbox.
                </Typography>

                {/* Newsletter Form with proper styling */}
                <Box sx={{ 
                    background: '#f8f9fa', 
                    borderRadius: 1, 
                    p: 3,
                    border: '1px solid #e9ecef'
                }}>
                    <NewsletterForm isMobile={isMobile} />
                </Box>

                <Typography
                    variant="caption"
                    sx={{
                        color: '#95a5a6',
                        display: 'block',
                        mt: 2
                    }}
                >
                    We respect your privacy. Unsubscribe at any time.
                </Typography>
            </DialogContent>

            {/* Actions */}
            <DialogActions sx={{ p: 3, pt: 0, justifyContent: 'center' }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        borderColor: '#1A8917',
                        color: '#1A8917',
                        '&:hover': {
                            borderColor: '#2E7D32',
                            backgroundColor: 'rgba(26, 137, 23, 0.05)',
                        }
                    }}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}; 