
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
    Typography,
    Button,
    Alert,
    CircularProgress,
    Container,
    Paper
} from "@mui/material";
import { api } from "../../../app/api";

export default function Unsubscribe() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const email = searchParams.get('email');

    useEffect(() => {
        const unsubscribe = async () => {
            if (!email) {
                setError('Invalid unsubscribe link. Email parameter is missing.');
                setIsLoading(false);
                return;
            }

            try {
                const response = await api.post('/newsletter/unsubscribe', { email });
                if (response.data.success) {
                    setIsSuccess(true);
                } else {
                    setError(response.data.message || 'Failed to unsubscribe. Please try again.');
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Failed to unsubscribe. Please try again later.';
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };
        unsubscribe();
    }, [email]);

    const handleGoHome = () => {
        navigate('/');
    };

    if (isLoading) {
        return (
            <Container maxWidth="sm" sx={{ mt: 8 }}>
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                    <CircularProgress size={40} sx={{ mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                        Processing your request...
                    </Typography>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                {isSuccess ? (
                    <>
                        <Typography variant="h4" component="h1" sx={{ mb: 2, color: '#1A8917' }}>
                            Successfully Unsubscribed
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, color: '#6B6B6B' }}>
                            You have been successfully unsubscribed from our newsletter.
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 4, color: '#95a5a6' }}>
                            We're sorry to see you go. You can always resubscribe anytime by visiting our website.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleGoHome}
                            sx={{
                                backgroundColor: '#1A8917',
                                '&:hover': {
                                    backgroundColor: '#2E7D32',
                                }
                            }}
                        >
                            Return to Home
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography variant="h4" component="h1" sx={{ mb: 2, color: '#e74c3c' }}>
                            Unsubscribe Failed
                        </Typography>
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                        <Typography variant="body2" sx={{ mb: 4, color: '#95a5a6' }}>
                            If you're having trouble unsubscribing, please contact us directly.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleGoHome}
                            sx={{
                                backgroundColor: '#1A8917',
                                '&:hover': {
                                    backgroundColor: '#2E7D32',
                                }
                            }}
                        >
                            Return to Home
                        </Button>
                    </>
                )}
            </Paper>
        </Container>
    );
}
