import { useState } from "react";
import { 
    TextField, 
    Button, 
    Box, 
    Typography, 
    Alert,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { api } from "../../app/api";

interface NewsletterFormProps {
    isMobile?: boolean;
}

export const NewsletterForm = ({ isMobile }: NewsletterFormProps) => {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('md'));
    const isMobileView = isMobile || mobile;
    
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{
        type: 'success' | 'error';
        text: string;
    } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email.trim()) {
            setMessage({
                type: 'error',
                text: 'Please enter your email address'
            });
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage({
                type: 'error',
                text: 'Please enter a valid email address'
            });
            return;
        }

        setIsLoading(true);
        setMessage(null);

        try {
            const response = await api.post('/newsletter/subscribe', { email });
            
            if (response.data.success) {
                setMessage({
                    type: 'success',
                    text: response.data.message || 'Thank you for subscribing to our newsletter!'
                });
                setEmail("");
            } else {
                setMessage({
                    type: 'error',
                    text: response.data.message || 'Failed to subscribe. Please try again.'
                });
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to subscribe. Please try again later.';
            setMessage({
                type: 'error',
                text: errorMessage
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ 
                display: "flex", 
                flexDirection: isMobileView ? "column" : "row",
                gap: isMobileView ? 1 : 1,
                alignItems: isMobileView ? "stretch" : "flex-start"
            }}>
                <TextField
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    size={isMobileView ? "small" : "medium"}
                    sx={{
                        flex: 1,
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "#ffffff",
                            color: "#2c3e50",
                            fontSize: isMobileView ? "0.875rem" : "1rem",
                            "& fieldset": {
                                borderColor: "#d1d5db",
                            },
                            "&:hover fieldset": {
                                borderColor: "#1A8917",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#1A8917",
                            },
                            "& input": {
                                color: "#2c3e50",
                                "&::placeholder": {
                                    color: "#9ca3af",
                                    opacity: 1,
                                },
                            },
                        },
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    size={isMobileView ? "small" : "medium"}
                    sx={{
                        backgroundColor: "#1A8917",
                        color: "#ffffff",
                        fontSize: isMobileView ? "0.875rem" : "1rem",
                        fontWeight: 600,
                        textTransform: "none",
                        minWidth: isMobileView ? "auto" : "120px",
                        "&:hover": {
                            backgroundColor: "#2E7D32",
                        },
                        "&:disabled": {
                            backgroundColor: "rgba(26, 137, 23, 0.5)",
                            color: "rgba(255, 255, 255, 0.5)",
                        },
                    }}
                >
                    {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
            </Box>

            {message && (
                <Alert 
                    severity={message.type} 
                    sx={{ 
                        mt: 2,
                        fontSize: isMobileView ? "0.875rem" : "1rem",
                        "& .MuiAlert-message": {
                            fontSize: isMobileView ? "0.875rem" : "1rem",
                        }
                    }}
                >
                    {message.text}
                </Alert>
            )}
        </Box>
    );
}; 