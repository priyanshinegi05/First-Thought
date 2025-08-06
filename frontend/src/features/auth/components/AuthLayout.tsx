import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Grid container component="main" sx={{ height: "100vh", backgroundColor: "#fafafa" }}>
            {/* Left Section - Branding */}
            <Grid
                item
                xs={false}
                sm={6}
                sx={{
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                {/* Logo that completely fills the left side */}
                <img 
                    src="/F.png" 
                    alt="FIRST THOUGHT Logo" 
                    style={{ 
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center"
                    }} 
                />
                
                {/* Tagline overlay - simple text without background */}
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "60px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 2,
                        textAlign: "center"
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            color: "#2c3e50",
                            textAlign: "center",
                            fontSize: "20px",
                            fontStyle: "italic",
                            fontWeight: "300",
                            letterSpacing: "1px",
                            textShadow: "0 2px 4px rgba(255,255,255,0.8)",
                            whiteSpace: "nowrap"
                        }}
                    >
                        A clean home for messy thoughts.
                    </Typography>
                </Box>
            </Grid>
            
            {/* Right Section - Form */}
            <Grid
                item
                xs={12}
                sm={6}
                component={Paper}
                elevation={0}
                sx={{
                    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "40px 20px",
                    borderLeft: "1px solid #e8f5e8"
                }}
            >
                {children}
            </Grid>
        </Grid>
    );
};

export default AuthLayout;
