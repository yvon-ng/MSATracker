import {Box, Divider, Stack, Typography} from "@mui/material";
import {ImageBanner} from "../components/ImageBanner.tsx";

export function AboutPage() {
    return (
        <>
            <ImageBanner/>
            <Divider/>
            <Stack alignItems={"center"} px={3} my={8} spacing={6}>
                <Typography variant="body1" maxWidth={600} textAlign={"justify"}>
                    MSA Tracker is a personal media tracking platform designed to make keeping track of your favourite
                    movies and TV series simple and enjoyable.
                </Typography>

                <Typography variant="body1" maxWidth={600} textAlign={"justify"}>
                    Whether you're building a watchlist of titles you want to see, keeping track of what you're
                    currently
                    watching, or looking back at everything you've completed, MSA Tracker brings your media
                    collection
                    together in one place.
                </Typography>
            </Stack>

            <Stack direction="row" justifyContent={"space-evenly"} px={40} alignItems={"center"} bgcolor={"#0d253f"}>
                {/*<Box*/}
                {/*    component="img"*/}
                {/*    src="https://www.themoviedb.org/assets/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"*/}
                {/*    width={300}*/}
                {/*/>*/}

                <Box
                    component="img"
                    src="https://www.themoviedb.org/assets/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                    width={300}
                />

                <Typography variant="body1" maxWidth={600} textAlign={"justify"} p={10}> {/*(https://www.themoviedb.org/)*/}
                    MSA Tracker uses the TMDB (The Movie Database) API to provide movie
                    and TV series information, including titles, descriptions, posters, backdrops, genres, release
                    dates, and more.
                    This product uses the TMDB API but is not endorsed or certified by TMDB.
                    Media information and images are provided by TMDB and remain the property of their respective
                    owners.
                </Typography>
            </Stack>

            <Typography variant="body1" maxWidth={600} textAlign="justify">
                Organize your watchlist, discover new titles, explore detailed information about movies and
                series, and
                keep your viewing journey organized. No more forgetting what you wanted to watch next or losing
                track of
                where you left off.
            </Typography>
        </>
    )
}