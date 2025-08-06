import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface PaletteOptions {
        footer?: PaletteOptions["primary"];
        highlight?: PaletteOptions["primary"];
    }
}

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 768,
            lg: 1024,
            xl: 1536,
        },
    },
    typography: {
        fontFamily: "'Charter', 'Georgia', 'Times New Roman', serif",
        h1: {
            fontWeight: 400,
            fontSize: "2.5rem",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
        },
        h2: {
            fontWeight: 400,
            fontSize: "2rem",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
        },
        h3: {
            fontWeight: 400,
            fontSize: "1.5rem",
            lineHeight: 1.4,
        },
        h4: {
            fontWeight: 400,
            fontSize: "1.25rem",
            lineHeight: 1.4,
        },
        h5: {
            fontWeight: 400,
            fontSize: "1.125rem",
            lineHeight: 1.4,
        },
        h6: {
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: 1.4,
        },
        body1: {
            fontSize: "1.125rem",
            lineHeight: 1.6,
            fontWeight: 400,
        },
        body2: {
            fontSize: "1rem",
            lineHeight: 1.6,
            fontWeight: 400,
        },
        button: {
            textTransform: "none",
            fontWeight: 400,
            fontSize: "0.875rem",
        },
    },
    palette: {
        primary: {
            main: "#1A8917",
        },
        secondary: {
            main: "#6B6B6B",
        },
        text: {
            primary: "#1A1A1A",
            secondary: "#6B6B6B",
        },
        background: {
            default: "#f8faf8",
            paper: "#ffffff",
        },
        error: {
            main: "#d32f2f",
        },
        info: {
            main: "#1976d2",
        },
        footer: {
            main: "#6B6B6B",
        },
        highlight: {
            main: "#1A8917",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "20px",
                    padding: "8px 16px",
                    fontSize: "0.875rem",
                    textTransform: "none",
                    fontWeight: 500,
                },
                contained: {
                    backgroundColor: "#000000",
                    color: "#FFFFFF",
                    "&:hover": {
                        backgroundColor: "#1A1A1A",
                    },
                },
                outlined: {
                    borderColor: "#000000",
                    color: "#000000",
                    "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        fontSize: "1rem",
                        "& fieldset": {
                            borderColor: "#E1E1E1",
                        },
                        "&:hover fieldset": {
                            borderColor: "#1A8917",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#1A8917",
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: "#6B6B6B",
                        "&.Mui-focused": {
                            color: "#000000",
                        },
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                    border: "1px solid #e1e1e1",
                    borderRadius: "8px",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
                        transform: "translateY(-2px)",
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                },
            },
        },
    },
});

export default theme;
