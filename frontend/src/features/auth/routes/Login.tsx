import { LoginForm } from "../components/LoginForm";
import AuthLayout from "../components/AuthLayout";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <AuthLayout>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    maxWidth: "400px"
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        color: "#000",
                        marginBottom: "32px",
                        textAlign: "center"
                    }}
                >
                    Welcome back.
                </Typography>
                
                <LoginForm />
                
                <Box
                    sx={{
                        marginTop: "24px",
                        textAlign: "center",
                        color: "#6c757d",
                        fontSize: "14px"
                    }}
                >
                    No account?{" "}
                    <Box
                        component={Link}
                        to="/auth/register"
                        sx={{
                            color: "#000",
                            textDecoration: "underline",
                            fontWeight: "500",
                            "&:hover": {
                                color: "#333"
                            }
                        }}
                    >
                        Create one
                    </Box>
                </Box>
            </Box>
        </AuthLayout>
    );
};

export default Login;
