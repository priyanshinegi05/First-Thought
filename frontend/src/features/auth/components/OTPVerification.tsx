import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    CircularProgress,
    Paper,
} from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';
import { verifyOTP } from '../api/verifyOTP';
import { resendOTP } from '../api/resendOTP';

interface OTPVerificationProps {
    email: string;
    username: string;
    password: string;
    fullName: string;
    onVerificationSuccess: (userData: any) => void;
    onBack: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
    email,
    username,
    password,
    fullName,
    onVerificationSuccess,
    onBack,
}) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleVerifyOTP = async () => {
        if (!otp || otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await verifyOTP({
                email,
                otp,
                username,
                password,
                fullName,
            });

            setSuccess('Email verified successfully!');
            setTimeout(() => {
                onVerificationSuccess(response.user);
            }, 1000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to verify OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setResendLoading(true);
        setError('');

        try {
            await resendOTP({ email });
            setSuccess('OTP resent successfully! Check your email.');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to resend OTP');
        } finally {
            setResendLoading(false);
        }
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        setOtp(value);
        setError('');
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 4,
                maxWidth: 400,
                width: '100%',
                mx: 'auto',
                mt: 4,
            }}
        >
            <Box sx={{ textAlign: 'center', mb: 3 }}>
                <EmailIcon sx={{ fontSize: 48, color: '#1A8917', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom>
                    Verify Your Email
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    We've sent a 6-digit verification code to
                </Typography>
                <Typography variant="body1" fontWeight="bold" color="#1A8917">
                    {email}
                </Typography>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {success}
                </Alert>
            )}

            <TextField
                fullWidth
                label="Enter 6-digit OTP"
                value={otp}
                onChange={handleOtpChange}
                placeholder="123456"
                inputProps={{
                    maxLength: 6,
                    style: { textAlign: 'center', fontSize: '24px', letterSpacing: '8px' }
                }}
                sx={{ mb: 3 }}
            />

            <Button
                fullWidth
                variant="contained"
                onClick={handleVerifyOTP}
                disabled={loading || otp.length !== 6}
                sx={{
                    mb: 2,
                    backgroundColor: '#1A8917',
                    '&:hover': {
                        backgroundColor: '#156d12',
                    },
                }}
            >
                {loading ? <CircularProgress size={24} /> : 'Verify & Create Account'}
            </Button>

            <Button
                fullWidth
                variant="outlined"
                onClick={handleResendOTP}
                disabled={resendLoading}
                sx={{ mb: 2 }}
            >
                {resendLoading ? <CircularProgress size={24} /> : 'Resend OTP'}
            </Button>

            <Button
                fullWidth
                variant="text"
                onClick={onBack}
                sx={{ color: '#6B6B6B' }}
            >
                Back to Signup
            </Button>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                    Didn't receive the code? Check your spam folder or try resending.
                </Typography>
            </Box>
        </Paper>
    );
};

export default OTPVerification; 