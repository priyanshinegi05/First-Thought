import { useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { useMediaQuery, useTheme } from "@mui/material";
import "react-toastify/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { globalStyles } from "../../assets/styles/globalStyles";
import Footer from "./Footer";
import { selectCurrentUser } from "../../features/auth/slices/authSlice";
import { ReactNode } from "react";
import { Global } from '@emotion/react';

export const MainLayout = (props: { children: ReactNode }) => {
    const user = useSelector(selectCurrentUser);
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isShowFooter =
        user &&
        location.pathname !== "/auth/login" &&
        location.pathname !== "/auth/register";

    return (
        <>
            <CssBaseline />
            <Global styles={globalStyles} />
            <ToastContainer
                limit={1}
                position={isMobile ? "top-center" : "top-right"}
                autoClose={3000}
                theme="light"
                toastStyle={{
                    fontSize: isMobile ? "0.875rem" : "1rem",
                    padding: isMobile ? "8px 12px" : "12px 16px",
                }}
            />
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    background: "linear-gradient(180deg, #f8faf8 0%, #f0f7f0 50%, #e8f5e8 100%)",
                }}
            >
                <Box 
                    sx={{ 
                        color: "text.primary",
                        flex: 1,
                        maxWidth: "100%",
                        overflow: "auto",
                        minHeight: 0,
                        padding: 0, // Remove padding since Header is now outside containers
                    }}
                >
                    {props.children}
                </Box>
                {isShowFooter && <Footer />}
            </Box>
        </>
    );
};
