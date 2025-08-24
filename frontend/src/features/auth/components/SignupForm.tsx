import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// ...existing code...
import { Spinner } from "../../../components/Elements/Spinner";
import { sendOTP } from "../api/sendOTP";
import { useState } from "react";

const signupFormSchema = yup.object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    password2: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password")], "Passwords do not match"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
});
type ISignupForm = yup.InferType<typeof signupFormSchema>;

type Props = {
    onOTPSent: (email: string, username: string, password: string, fullName: string) => void;
};

export const SignupForm = (props: Props) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<ISignupForm>({
        resolver: yupResolver<ISignupForm>(signupFormSchema),
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSendOTP = async (signupData: ISignupForm) => {
        setLoading(true);
        setError("");

        try {
            await sendOTP({ email: signupData.email });
            const fullName = `${signupData.firstName.trim()} ${signupData.lastName.trim()}`;
            props.onOTPSent(signupData.email, signupData.username, signupData.password, fullName);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(handleSendOTP)}
            sx={{ width: "100%" }}
        >
            {error && (
                <Typography
                    color="error"
                    variant="body2"
                    sx={{ mb: 2, fontSize: "14px" }}
                >
                    {error}
                </Typography>
            )}
            <TextField
                {...register("email")}
                size="medium"
                type="email"
                label="Email"
                fullWidth
                required
                margin="normal"
                autoFocus
                error={!!errors.email}
                helperText={errors.email?.message}
            />
            <TextField
                {...register("username")}
                size="medium"
                type="text"
                label="Username"
                fullWidth
                required
                margin="normal"
                error={!!errors.username}
                helperText={errors.username?.message}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        "& fieldset": {
                            borderColor: "#e8f5e8",
                        },
                        "&:hover fieldset": {
                            borderColor: "#2c3e50",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#2c3e50",
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: "#5a6c7d",
                        "&.Mui-focused": {
                            color: "#2c3e50",
                        },
                    },
                }}
            />
            <TextField
                {...register("password")}
                size="medium"
                type="password"
                label="Password"
                fullWidth
                required
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        "& fieldset": {
                            borderColor: "#e8f5e8",
                        },
                        "&:hover fieldset": {
                            borderColor: "#2c3e50",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#2c3e50",
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: "#5a6c7d",
                        "&.Mui-focused": {
                            color: "#2c3e50",
                        },
                    },
                }}
            />
            <TextField
                {...register("password2")}
                size="medium"
                type="password"
                label="Confirm Password"
                fullWidth
                required
                margin="normal"
                error={!!errors.password2}
                helperText={errors.password2?.message}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        "& fieldset": {
                            borderColor: "#e8f5e8",
                        },
                        "&:hover fieldset": {
                            borderColor: "#2c3e50",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#2c3e50",
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: "#5a6c7d",
                        "&.Mui-focused": {
                            color: "#2c3e50",
                        },
                    },
                }}
            />

            
            <Stack
                direction="row"
                spacing={2}
                sx={{ mt: 2 }}
            >
                <TextField
                    {...register("firstName")}
                    size="medium"
                    type="text"
                    label="First Name"
                    fullWidth
                    required
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            "& fieldset": {
                                borderColor: "#e8f5e8",
                            },
                            "&:hover fieldset": {
                                borderColor: "#2c3e50",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#2c3e50",
                            },
                        },
                        "& .MuiInputLabel-root": {
                            color: "#5a6c7d",
                            "&.Mui-focused": {
                                color: "#2c3e50",
                            },
                        },
                    }}
                />
                <TextField
                    {...register("lastName")}
                    size="medium"
                    type="text"
                    label="Last Name"
                    fullWidth
                    required
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            "& fieldset": {
                                borderColor: "#e8f5e8",
                            },
                            "&:hover fieldset": {
                                borderColor: "#2c3e50",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#2c3e50",
                            },
                        },
                        "& .MuiInputLabel-root": {
                            color: "#5a6c7d",
                            "&.Mui-focused": {
                                color: "#2c3e50",
                            },
                        },
                    }}
                />
            </Stack>
            
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#2c3e50",
                    color: "#fff",
                    borderRadius: "8px",
                    padding: "12px",
                    fontSize: "16px",
                    fontWeight: "500",
                    textTransform: "none",
                    "&:hover": {
                        backgroundColor: "#34495e",
                    },
                }}
            >
                Send Verification Code
            </Button>
        </Box>
    );
};
