import {Box, Divider, Stack, Typography} from "@mui/material";
import {MediaPoster} from "./MediaPoster.tsx";
import {MediaInfo} from "./MediaInfo.tsx";
import {MediaTrailer} from "./MediaTrailer.tsx";
import {type MovieDetails, type TVSeriesDetails} from "@lorenzopant/tmdb";
import {MediaStats} from "./MediaStats.tsx";
import {IMAGE_BASE_URL} from "../../services/tmdbServices.ts";
import {usePersonalPreferences} from "../../hooks/UsePersonalPreferences.ts";
import {DetailRow} from "../DetailRow.tsx";
import {getLanguageName} from "../../utils/languageUtils.ts";
import {getCountryName} from "../../utils/countryUtils.ts";

type MediaDetailLayoutProps =
    | { media: MovieDetails; isMovie: true }
    | { media: TVSeriesDetails; isMovie: false }; //doesn't allow media: movie + isMovie = false and media: series = true

export function MediaDetailLayout({media, isMovie}: MediaDetailLayoutProps) {
    const {personalPreferences} = usePersonalPreferences();
    const backdrop = media.backdrop_path ? `${IMAGE_BASE_URL}${media.backdrop_path}` : undefined;

    return (
        <Box>
            <Box
                sx={{
                    ml: {xs: -5, md: 0},
                    position: "relative",
                    isolation: "isolate",
                    overflow: "hidden",
                    ...(personalPreferences?.showMediaBackdrop && backdrop && {
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            inset: -10,
                            backgroundImage: `url("${backdrop}")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "blur(100px)",
                            zIndex: -1,
                        },
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            inset: 0,
                            backgroundColor: "rgba(18, 18, 18, 0.65)",
                            zIndex: -1,
                        },
                    })
                }}
            >
                <Box my={10} ml={{xs: 5, md: 8}} mr={{xs: 5, md: 8, lg: 0}}>
                    <Stack direction={{xs: "column", lg: "row"}}>
                        <Stack direction={{xs: "column", md: "row"}} gap={4} width={{lg: "60%"}}>
                            <MediaPoster media={media} isMovie={isMovie}/>

                            {/*MOVIE: title, tagline, release year, duration, overview; SERIE: title, tagline, air years, seasons, ep duration, overview*/}
                            <MediaInfo media={media} isMovie={isMovie}/>

                        </Stack>

                        <Stack width={{xs: "100%", lg: "40%"}} mt={{xs: 5, lg: 0}} mx={{lg: 10}} spacing={1}
                               alignItems="stretch">
                            <MediaTrailer media={media} isMovie={isMovie}/>
                            {/*MOVIE: budget, revenue, vote amount, vote avg; SERIE: series status, vote amount, vote avg*/}
                            <MediaStats media={media} isMovie={isMovie}/>
                        </Stack>
                    </Stack>
                </Box>
            </Box>

            <Divider/>

            <Stack justifyContent={"space-between"} direction={"row"} my={10} pl={{xs: 5, md: 8}}
                   pr={{xs: 5, md: 8, lg: 10}}>
                <Box>
                    <Typography variant={"h4"} fontWeight={300}
                                mt={4}>{isMovie ? "Movie" : "Series"} details</Typography>

                    {/*TODO*/}
                    {/*<Typography>*/}
                    {/*    Website*/}
                    {/*</Typography>*/}
                </Box>
                <Box>
                    <Divider/>
                    <Stack direction={"row"} spacing={5}>
                        <Stack>
                            <DetailRow label={"Genres"} value={media.genres.map(genre => genre.name).join(" · ")}/>

                            {isMovie && (
                                <DetailRow
                                    label="Status"
                                    value={media.status}
                                />
                            )}

                            {!isMovie && media.networks && (
                                <DetailRow
                                    label="Networks"
                                    value={media.networks.map(network => network.name).join(" · ")}
                                />
                            )}
                        </Stack>
                        <Stack>
                            <DetailRow label={"Original language"} value={getLanguageName(media.original_language)}/>
                            <DetailRow label={"Country of origin"}
                                       value={media.origin_country.map(getCountryName).join(" · ")}/>
                        </Stack>


                        {/*TODO show like a navidation  (this movie is part of [title >]) */}
                        {/*{isMovie && media.belongs_to_collection && (*/}
                        {/*    <Typography>*/}
                        {/*        {media.belongs_to_collection.name}*/}
                        {/*    </Typography>*/}
                        {/*)}*/}
                    </Stack>
                </Box>
            </Stack>
        </Box>

    )
}