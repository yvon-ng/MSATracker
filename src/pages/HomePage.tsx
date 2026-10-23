import {Box, Stack} from "@mui/material";
import {PageHeader} from "../components/PageHeader.tsx";
import {useGetTrendingMedia} from "../hooks/UseTMDBs.ts";
import {MediaCard} from "../components/media/MediaCard.tsx";
import {UserAuth} from "../context/AuthContextProvider.tsx";
import {usePersonalPreferences} from "../hooks/UsePersonalPreferences.ts";
import {getFormattedDate, getGreeting} from "../utils/dateUtils.ts";
import {useUserMediaStatuses} from "../hooks/UseUserMedia.ts";

export function HomePage() {
    const {media} = useGetTrendingMedia();
    const titles = media?.results.filter(
        item => item.media_type === "movie" || item.media_type === "tv"
    ) ?? [];

    const formattedDate = getFormattedDate();
    const greeting = getGreeting();
    const {user} = UserAuth()
    const {personalPreferences} = usePersonalPreferences();

    const displayName = personalPreferences?.usernameAsDisplayName ? user?.username : user?.firstName;
    const titleSuffix = displayName ? `${displayName}.` : ""; //dont show the dot when no first name
    const { data: statuses = [] } = useUserMediaStatuses(titles);

    const statusMap = new Map(
        statuses.map((item) => [
            `${item.media.media_type === "series" ? "tv" : item.media.media_type}-${item.media.tmdb_id}`,
            item.status,
        ])
    );

    return (
        <Box my={{xs: 10}} ml={{xs: 0, md: 8}} mr={{xs: 5, sm: 0}}>
            <PageHeader overline={formattedDate} title={greeting}
                        titleSuffix={titleSuffix}
                        subtitle={"Pick up where you left off or discover something new."}/>
            <Stack direction="row" flexWrap={"wrap"} gap={3} my={{xs: 10}}>
                {titles.map(item => (
                    <MediaCard media={item} key={`${item.media_type}-${item.id}`} userMediaStatus={statusMap.get(`${item.media_type}-${item.id}`)}/>
                ))}
            </Stack>
        </Box>
    )
}