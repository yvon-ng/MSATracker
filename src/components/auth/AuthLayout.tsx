import {Box, Stack} from "@mui/material";
import type {ReactNode} from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

export function AuthLayout({children}: AuthLayoutProps) {
    return (
        <Stack direction={{xs: "column", md: "row"}} sx={{minHeight: "100dvh"}}>
            <Box
                component="img"
                src="/LoginBackgroundImage.jpg"
                alt=""
                sx={{
                    display: {xs: "none", md: "block"},
                    width: "50%",
                    height: "100dvh",
                    objectFit: "cover",
                    position: "fixed",
                    top: 0,
                    left: 0,
                }}
            />

            <Box
                sx={{
                    ml: {xs: 0, md: "50%"},
                    width: {xs: "100%", md: "50%"},
                    minHeight: "100dvh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: {xs: 3, sm: 5},
                }}
            >
                {children}
            </Box>
        </Stack>
    );
}
