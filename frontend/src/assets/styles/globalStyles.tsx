import { GlobalStyles, Theme } from "@mui/material";
import { css } from '@emotion/react';

const styles = (theme: Theme) => ({
    html: {
        height: "100%",
        overflowX: "hidden",
    },
    body: {
        margin: 0,
        padding: 0,
        fontFamily: "'Charter', 'Georgia', 'Times New Roman', serif",
        fontSize: theme.breakpoints.down('md') ? "0.8rem" : "1rem",
        lineHeight: theme.breakpoints.down('md') ? 1.4 : 1.6,
        color: "#000000",
        backgroundColor: "#f8faf8",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        overflowX: "hidden",
        height: "100%",
    },
    "*": {
        boxSizing: "border-box",
    },
    "h1, h2, h3, h4, h5, h6": {
        margin: 0,
        fontWeight: 400,
        lineHeight: 1.2,
        [theme.breakpoints.down('md')]: {
            fontSize: "0.85em",
            marginBottom: "0.5rem",
        },
    },
    "p": {
        margin: "0 0 1rem 0",
        lineHeight: 1.6,
        [theme.breakpoints.down('md')]: {
            fontSize: "0.8rem",
            margin: "0 0 0.5rem 0",
            lineHeight: 1.4,
        },
    },
    "a": {
        color: "inherit",
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
        },
    },
    ".MuiSvgIcon-root": {
        fontSize: theme.breakpoints.down('md') ? "1rem" : "1.25rem",
    },
    ".active": {
        fontWeight: 500,
    },
    "::-webkit-scrollbar": {
        width: theme.breakpoints.down('md') ? "4px" : "8px",
    },
    "::-webkit-scrollbar-track": {
        background: "#F7F7F7",
    },
    "::-webkit-scrollbar-thumb": {
        background: "#E1E1E1",
        borderRadius: theme.breakpoints.down('md') ? "2px" : "4px",
        "&:hover": {
            background: "#C1C1C1",
        },
    },
    // Mobile-specific optimizations
    [theme.breakpoints.down('md')]: {
        "button, input, textarea, select": {
            fontSize: "16px", // Prevents zoom on iOS
        },
        ".MuiButton-root": {
            fontSize: "0.8rem",
            padding: "4px 8px",
            minHeight: "32px",
        },
        ".MuiCard-root": {
            margin: "4px 0",
            padding: "8px",
            borderRadius: "6px",
        },
        ".MuiTextField-root": {
            fontSize: "0.8rem",
        },
        ".MuiPaper-root": {
            borderRadius: "6px",
        },
        ".MuiChip-root": {
            fontSize: "0.75rem",
            height: "24px",
        },
        ".MuiAvatar-root": {
            width: "28px",
            height: "28px",
        },
    },
});

export const globalStyles = css`
  html {
    overflow-y: scroll;
  }
`;
