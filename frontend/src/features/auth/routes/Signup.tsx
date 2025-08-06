import { SignupForm } from "../components/SignupForm";
import OTPVerification from "../components/OTPVerification";
import ProfileSetup from "../components/ProfileSetup";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";

type SignupStep = 'form' | 'otp' | 'profile';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentStep, setCurrentStep] = useState<SignupStep>('form');
    const [signupData, setSignupData] = useState<{
        email: string;
        username: string;
        password: string;
        fullName: string;
    } | null>(null);
    const [userData, setUserData] = useState<any>(null);

    const handleOTPSent = (email: string, username: string, password: string, fullName: string) => {
        setSignupData({ email, username, password, fullName });
        setCurrentStep('otp');
    };

    const handleOTPVerified = (user: any) => {
        // Set the user in Redux store to authenticate them
        dispatch(setCredentials({ user }));
        setUserData(user);
        setCurrentStep('profile');
    };

    const handleProfileSetupComplete = () => {
        // Redirect to home page after successful signup
        navigate('/');
    };

    const handleBackToForm = () => {
        setCurrentStep('form');
        setSignupData(null);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 'form':
                return (
                    <>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: "bold",
                                color: "#000",
                                marginBottom: "32px",
                                textAlign: "center"
                            }}
                        >
                            Join First Thought!
                        </Typography>
                        
                        <SignupForm onOTPSent={handleOTPSent} />
                        
                        <Box
                            sx={{
                                marginTop: "24px",
                                textAlign: "center",
                                color: "#6c757d",
                                fontSize: "14px"
                            }}
                        >
                            Already have an account?{" "}
                            <Box
                                component={Link}
                                to="/auth/login"
                                sx={{
                                    color: "#000",
                                    textDecoration: "underline",
                                    fontWeight: "500",
                                    "&:hover": {
                                        color: "#333"
                                    }
                                }}
                            >
                                Sign in
                            </Box>
                        </Box>
                    </>
                );
            
            case 'otp':
                return (
                    <OTPVerification
                        email={signupData!.email}
                        username={signupData!.username}
                        password={signupData!.password}
                        fullName={signupData!.fullName}
                        onVerificationSuccess={handleOTPVerified}
                        onBack={handleBackToForm}
                    />
                );
            
            case 'profile':
                return (
                    <ProfileSetup
                        user={userData}
                        onSetupComplete={handleProfileSetupComplete}
                    />
                );
            
            default:
                return null;
        }
    };

    return (
        <AuthLayout>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    maxWidth: currentStep === 'profile' ? "600px" : "400px"
                }}
            >
                {renderStep()}
            </Box>
        </AuthLayout>
    );
};

export default Signup;
