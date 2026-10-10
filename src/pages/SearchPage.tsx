import {Box, Typography} from "@mui/material";
import {useSearchParams} from "react-router";
import {SearchResults} from "../components/SearchResults.tsx";

export function SearchPage() {

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") ?? "";

    if (!query.trim()) { // needed for when someone navigates directly to page via url (no ?q= [no search results])
        return (
            <Box mt={10} ml={{xs: 0, md: 8}}>
                Enter a title to search.
            </Box>
        );
    }

    return (
        <Box mt={10} ml={{xs: 0, md: 8}} mr={{xs: 5, sm: 0}}>
            <Typography fontSize={{xs: "2rem",sm: "3rem"}} mb={{xs: 5}} sx={{textWrap: "nowrap"}}>
                Search Results
            </Typography>
            <SearchResults query={query}/>
        </Box>
    );
}