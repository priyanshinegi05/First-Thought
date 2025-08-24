import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../api/login";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// ...existing code...

const loginFormSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});
type ILoginForm = yup.InferType<typeof loginFormSchema>;

export const LoginForm = () => {
    const { handleSubmit, setValue, register } = useForm<ILoginForm>({
        resolver: yupResolver(loginFormSchema),
    });
    // const isSmallScreen = useMediaQuery((theme: Theme) =>
    //     theme.breakpoints.down("sm"),
    // );
    const { mutate: login } = useLoginMutation();

    const loginSubmit = (loginData: ILoginForm) => {
        login({
            username: loginData.username.trim(),
            password: loginData.password.trim(),
        });
    };

    const handleDemoAccountClick = () => {
        setValue("username", "bobsmith");
        setValue("password", "Password@123");
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(loginSubmit)}
            noValidate
            sx={{ width: "100%" }}
        >
            <TextField
                {...register("username")}
                size="medium"
                label="Username"
                type="text"
                fullWidth
                required
                margin="normal"
                autoFocus
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
                label="Password"
                type="password"
                fullWidth
                required
                margin="normal"
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
                Sign in
            </Button>
            <Button
                type="button"
                fullWidth
                variant="outlined"
                sx={{
                    mb: 2,
                    borderColor: "#e8f5e8",
                    color: "#2c3e50",
                    borderRadius: "8px",
                    padding: "12px",
                    fontSize: "16px",
                    fontWeight: "500",
                    textTransform: "none",
                    "&:hover": {
                        borderColor: "#2c3e50",
                        backgroundColor: "rgba(44, 62, 80, 0.04)",
                    },
                }}
                onClick={handleDemoAccountClick}
            >
                Use Demo Account
            </Button>
        </Box>
    );
};
