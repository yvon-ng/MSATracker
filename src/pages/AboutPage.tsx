import {Box, Button, Divider, Link as MuiLink, Stack, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router"
import {ImageBanner} from "../components/ImageBanner.tsx";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export function AboutPage() {
    return (
        <>
            <ImageBanner/>
            <Divider/>
            <Stack alignItems={"center"} my={8} spacing={3}>
                <Typography variant="body1" maxWidth={{xs: 280, sm: 600, md: 800}} textAlign={"justify"}>
                    MSATracker is a personal media tracking platform designed to make keeping track of your favourite
                    movies and TV series simple and enjoyable.
                </Typography>

                <Typography variant="body1" maxWidth={{xs: 280, sm: 600, md: 800}} textAlign={"justify"}>
                    Whether you're building a watchlist of titles you want to see, keeping track of what you're
                    currently
                    watching, or looking back at everything you've completed, MSATracker brings your media
                    collection
                    together in one place.
                </Typography>

                <Typography variant="body1" maxWidth={{xs: 280, sm: 600, md: 800}} textAlign={"justify"}>
                    Please Note that MSATracker is a media tracking platform, not a streaming service. It helps you
                    organize your watchlist and keep track of movies, TV series, and anime. No media content is hosted
                    or streamed through this application. Users are responsible for accessing content through their own
                    legitimate sources.
                </Typography>

                <Stack alignItems="center" spacing={4} py={6}>
                    <Typography variant="h5" maxWidth={{xs: 280, sm: 600, md: 800}} fontWeight={600}>
                        The Story Behind MSATracker
                    </Typography>

                    <Typography variant="body1" maxWidth={{xs: 280, sm: 600, md: 800}} textAlign={"justify"}>
                        MSATracker originated as a personal project inspired by a challenge I encountered in managing my
                        own
                        watchlist. I previously kept track of series I wanted to watch by saving screenshots, making
                        written
                        notes, and using various other methods. However, I wanted a more organized and efficient way to
                        manage my media.

                        The aim was to create a single platform for tracking movies, series, and anime. The name MSA is
                        derived from these three categories: Movies, Series, and Anime. What began as a personal
                        solution
                        eventually developed into MSATracker, an independently developed and maintained project.
                    </Typography>

                    <Typography variant="body1" maxWidth={{xs: 280, sm: 600, md: 800}} textAlign="justify">
                        Developers interested in connecting or discussing the project are
                        welcome to reach out through my{" "}
                        <MuiLink
                            href="https://www.linkedin.com/in/mark-ng-03980b1b1"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="secondary"
                            underline="hover"
                        >
                            LinkedIn
                        </MuiLink>
                        {" "}and{" "}
                        <MuiLink
                            href="https://github.com/yvon-ng"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="secondary"
                            underline="hover"
                        >
                            GitHub
                        </MuiLink>
                        {" "}profiles.
                    </Typography>
                </Stack>
            </Stack>

            <Divider/>

            <Stack
                direction={{xs: "column", md: "row"}}
                justifyContent={"center"}
                spacing={10}
                py={{xs: 10, md: 4}}
                px={{md: 10}}
                alignItems={"center"}
                bgcolor={"#0d253f"}>

                <MuiLink
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{display: "inline-flex"}}
                >
                    <Box
                        component="img"
                        src="https://www.themoviedb.org/assets/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                        alt="The Movie Database (TMDB) logo"
                        width={{xs: 250, sm: 300}}
                    />
                </MuiLink>

                <Typography variant="body1" maxWidth={{xs: 280, sm: 600, md: 800}} textAlign={"justify"}>
                    MSATracker uses{" "}
                    <MuiLink href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer"
                             color="secondary"
                             underline="hover">TMDB (The Movie Database)</MuiLink>
                    {" "}API to provide movie
                    and TV series information, including titles, descriptions, posters, backdrops, genres, release
                    dates, and more. This product uses TMDB and the TMDB API but is not endorsed, certified or otherwise
                    approved by TMDB.
                    Media information and images are provided by TMDB and remain the property of their respective
                    owners.
                </Typography>
            </Stack>

            <Divider/>

            <Stack alignItems="center" spacing={5} py={6}>
                <Typography variant="h5" fontWeight={600}>
                    Support the Project
                </Typography>

                <Typography variant="body1" maxWidth={{xs: 280, sm: 600, md: 800}} textAlign="justify">
                    If you find MSATracker useful and wish to support its
                    continued development, you can make a voluntary donation.
                    Contributions help fund future improvements and ongoing
                    maintenance of the application. Any support is greatly
                    appreciated.
                </Typography>

                <Button
                    component="a"
                    href="https://www.paypal.com/donate/?hosted_button_id=AGGXQQ7QU9HPY"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    startIcon={<Box component="img" src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
                                    alt="paypal logo" sx={{width: 20, height: 20}}/>}
                    sx={{
                        px: 3,
                        py: 1,
                        borderRadius: 3,
                        borderColor: "divider",
                        "&:hover": {
                            bgcolor: "action.selected",
                        },
                    }}
                >
                    Donate with PayPal
                </Button>
            </Stack>

            <Divider/>

            <Stack direction={{xs: "column", md: "row"}} justifyContent={"space-between"} px={20} alignItems={"center"}
                   bgcolor={"background.paper"}>
                <Box py={10}>
                    <Typography variant="h3" fontWeight={600} maxWidth={600}>
                        Ready to organize your {" "}
                        <Box component="span" color="secondary.main">
                            media?
                        </Box>
                    </Typography>
                    <Typography color="text.secondary" mt={2} alignItems={"center"}>
                        Start building your personal watchlist with
                        {" "}
                        <Box component="span" whiteSpace="nowrap">
                            msa
                            <Box component={"span"} color={"secondary.main"}>
                                tracker
                            </Box>
                        </Box>
                        .
                    </Typography>
                </Box>
                <Stack alignItems={"center"} spacing={2} pb={{xs: 10, md: 0}}>
                    <Button component={RouterLink} to="/signup" variant={"contained"} color="secondary"
                            endIcon={<ArrowForwardIcon/>} sx={{borderRadius: 2, whiteSpace: "nowrap",}}>
                        Create your account
                    </Button>
                    <Typography variant={"body2"} color={"textSecondary"}>
                        Have an account? {" "}
                        <MuiLink
                            component={RouterLink}
                            to={"/home"}
                            underline="none"
                            sx={{
                                color: "secondary.main",
                                "&:hover": {
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            Log in
                        </MuiLink>
                    </Typography>
                </Stack>
            </Stack>
        </>
    )
}