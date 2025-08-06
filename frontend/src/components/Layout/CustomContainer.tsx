import { styled, ContainerProps } from "@mui/material";
import Container from "@mui/material/Container";

export const CustomContainer = styled(Container)<ContainerProps>(
    ({ theme }) => ({
        [theme.breakpoints.up("sm")]: {
            maxWidth: "100%",
            padding: theme.spacing(0, 1.5),
        },
        [theme.breakpoints.up("md")]: {
            maxWidth: "100%",
            padding: theme.spacing(0, 2),
        },
        [theme.breakpoints.up("lg")]: {
            maxWidth: "100%",
            padding: theme.spacing(0, 3),
        },
        [theme.breakpoints.down("sm")]: {
            maxWidth: "100%",
            padding: theme.spacing(0, 2),
        },
        margin: 0,
        width: "100%",
        minHeight: "auto",
        overflow: "visible",
    }),
);
