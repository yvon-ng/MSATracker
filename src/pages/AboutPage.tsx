import {Box, Button, Divider, Link as MuiLink, Stack, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router"
import {ImageBanner} from "../components/ImageBanner.tsx";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export function AboutPage() {
    return (
        <>
            <ImageBanner/>
            <Divider/>
            <Stack alignItems={"center"} px={3} my={8} spacing={3}>
                <Typography variant="body1" maxWidth={800} textAlign={"justify"}>
                    MSATracker is a personal media tracking platform designed to make keeping track of your favourite
                    movies and TV series simple and enjoyable.
                </Typography>

                <Typography variant="body1" maxWidth={800} textAlign={"justify"}>
                    Whether you're building a watchlist of titles you want to see, keeping track of what you're
                    currently
                    watching, or looking back at everything you've completed, MSATracker brings your media
                    collection
                    together in one place.
                </Typography>

                <Typography variant="body1" maxWidth={800} textAlign={"justify"}>
                    Please Note that MSATracker is a media tracking platform, not a streaming service. It helps you
                    organize your watchlist and keep track of movies, TV series, and anime. No media content is hosted
                    or streamed through this application. Users are responsible for accessing content through their own
                    legitimate sources.
                </Typography>

                <Typography variant="body1" maxWidth={800} textAlign="justify">
                    MSATracker is an independently developed and maintained project,
                    created and managed by a single developer.
                </Typography>
            </Stack>

            <Stack direction="row" justifyContent={"space-evenly"} px={40} alignItems={"center"} bgcolor={"#0d253f"}>
                {/*<MuiLink href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer"*/}
                {/*         sx={{display: "inline-flex"}}>*/}
                {/*    <Box component="img"*/}
                {/*         src="https://www.themoviedb.org/assets/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"*/}
                {/*         alt="The Movie Database (TMDB) logo" width={300}*/}
                {/*    />*/}
                {/*</MuiLink>*/}

                <MuiLink href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer"
                         sx={{display: "inline-flex"}}>
                    <Box component="img"
                         src="https://www.themoviedb.org/assets/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                         alt="The Movie Database (TMDB) logo" width={300}/>
                </MuiLink>

                <Typography variant="body1" maxWidth={600} textAlign={"justify"} p={10}>
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

            {/* About the Developer */}
            <Stack alignItems="center" spacing={2} py={6}>
                <Typography variant="h5" fontWeight={600}>
                    About the Developer
                </Typography>

                <Typography variant="body1" textAlign="center">
                    MSATracker is an independently developed and maintained project,
                    created and managed by a single developer.
                    Want to connect with me? Find me on:
                </Typography>

                <Stack direction="row" spacing={3}>
                    <MuiLink
                        href="https://www.linkedin.com/in/your-profile"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="secondary"
                    >
                        LinkedIn
                    </MuiLink>

                    <MuiLink
                        href="https://www.instagram.com/your-profile"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="secondary"
                    >
                        Instagram
                    </MuiLink>

                    <MuiLink
                        href="https://github.com/your-profile"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="secondary"
                    >
                        GitHub
                    </MuiLink>
                </Stack>
            </Stack>

            <Divider />

            {/* Support the Project */}
            <Stack alignItems="center" spacing={2} py={6} px={3}>
                <Typography variant="h5" fontWeight={600}>
                    Support the Project
                </Typography>

                <Typography
                    variant="body1"
                    maxWidth={800}
                    textAlign="center"
                >
                    Enjoy using MSATracker? If you'd like to support its
                    continued development, you can make a voluntary donation.
                    Every contribution is greatly appreciated!
                </Typography>

                {/* Add a PayPal donation button here in the future TODO*/}
            </Stack>

            <Stack direction="row" justifyContent={"space-between"} mx={20} alignItems={"center"}>
                <Typography variant="h3" fontWeight={600} maxWidth={600} py={10}>
                    Build your watchlist now.
                </Typography>
                <Stack alignItems={"center"} spacing={2}>
                    <Button component={RouterLink} to="/signup" variant={"contained"} color="secondary"
                            endIcon={<ArrowForwardIcon/>} sx={{borderRadius: 2}}>
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