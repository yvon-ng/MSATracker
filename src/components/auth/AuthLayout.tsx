import {Box, Stack, Typography} from "@mui/material";
import type {ReactNode} from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

export function AuthLayout({children}: AuthLayoutProps) {
    return (
        <Stack direction={{xs: "column", md: "row"}} sx={{minHeight: "100dvh"}}>
            <Box
                sx={{
                    display: {xs: "none", md: "flex"},
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: {md: "60%"},
                    height: "100dvh",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                <Stack position={"relative"}
                       zIndex={2}
                       p={5}
                       pb={15}
                       alignSelf={"stretch"}
                       justifyContent={"flex-end"}
                       height={"100%"}
                       spacing={3}
                >
                    <Typography variant="body2" color="secondary" fontWeight={600} pl={1} textTransform={"uppercase"} letterSpacing={"0.1em"}>
                        All your favorites, organized
                    </Typography>
                    <Typography variant="h1" fontWeight={600} letterSpacing={{md: 0, lg: "-0.1em"}} lineHeight={0.9}>
                        From
                        <Box component={"span"} color={"secondary.main"}> watching </Box>
                        to
                        <Box component={"span"} color={"secondary.main"}> watched.</Box>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" fontWeight={500}>
                        Build your watchlist, keep track of what you've finished, and discover what to watch next.
                    </Typography>
                </Stack>

                {/* Dark overlay */}
                <Box
                    position="absolute"
                    sx={{
                        background: "linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 45%, rgba(0, 0, 0, 0.1) 100%)",
                        zIndex: 1,
                        inset: 0
                    }}
                />

                {/* Image overlay*/}
                <Box
                    component="img"
                    src="/LoginBackgroundImage.jpg"
                    display={{xs: "none", md: "block"}}
                    position={"absolute"}
                    width={"100%"}
                    height={"100%"}
                    sx={{
                        objectFit: "cover",
                    }}
                />

            </Box>
            <Box
                p={{xs: 3, sm: 5}}
                ml={{xs: 0, md: "65%"}}
                width={{xs: "100%", md: "30%"}}
                minHeight={"100dvh"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                {children}
            </Box>
        </Stack>
    );
}
