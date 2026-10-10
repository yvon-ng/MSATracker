import {alpha, Box, IconButton, InputBase, styled} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {type FormEvent, useState} from "react";
import {useNavigate} from "react-router";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: 8,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: alpha(theme.palette.divider, 0.05),
    display: "none",

    [theme.breakpoints.up('sm')]: {
        display: "flex",
    },
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: "inherit",
    width: "100%",

    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        width: "25ch",
        transition: theme.transitions.create("width"),

        "&:focus": {
            width: "33ch",
        },
    },
}));

const MobileSearchOverlay = styled("form")(({theme}) => ({
    position: "absolute",
    inset: 0,
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    padding: 20,
    backgroundColor: theme.palette.background.default,

    [theme.breakpoints.up("sm")]: {
        display: "none",
    },
}));

const StyledMobileInputBase = styled(InputBase)(({theme}) => ({
    color: "inherit",
    flex: 1,
    minWidth: 0,

    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        width: "100%",
    },

    [theme.breakpoints.up("sm")]: {
        display: "none",
    },
}));

interface SearchBarProps {
    onSearchOpen?: () => void;
}

export function SearchBar({ onSearchOpen }: SearchBarProps) {
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();

        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;

        const params = new URLSearchParams();
        params.set("q", trimmedQuery);

        navigate(`/search?${params.toString()}`);
        setQuery("");
        setMobileSearchOpen(false);
    };

    const handleSearchOverlay = () => {
        // close mobile side menu drawer so we can type on search bar even if SideMenu was open first
        onSearchOpen?.();
        setMobileSearchOpen(true);
    }

    return (
        <Box>
            {/* Mobile */}
            <IconButton
                sx={{display: {xs: "flex", sm: "none",}}}
                aria-label="Open search"
                onClick={handleSearchOverlay}
            >
                <SearchIcon sx={{color: "text.secondary"}}/>
            </IconButton>

            {mobileSearchOpen && (
                <MobileSearchOverlay onSubmit={handleSearch}>
                    <IconButton type={"submit"} aria-label="Submit search"
                        // onClick={handleSearch}
                    >
                        <SearchIcon sx={{color: "text.secondary"}}/>
                    </IconButton>

                    <StyledMobileInputBase
                        autoFocus
                        placeholder="Find something to watch..."
                        inputProps={{"aria-label": "Search titles", enterKeyHint: "search"}}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <IconButton
                        type={"button"}
                        aria-label="Close search"
                        onClick={() => setMobileSearchOpen(false)}
                    >
                        <CloseIcon sx={{color: "text.secondary"}}/>
                    </IconButton>
                </MobileSearchOverlay>
            )}

            {/* tablet + Desktop */}
            <Box component="form" onSubmit={handleSearch}>
                <Search>
                    <IconButton
                        type="submit"
                        aria-label="Search titles"
                        sx={{flexShrink: 0}}
                    >
                        <SearchIcon sx={{color: "text.secondary"}}/>
                    </IconButton>

                    <StyledInputBase
                        placeholder="Find something to watch..."
                        inputProps={{'aria-label': 'search'}}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </Search>
            </Box>
        </Box>
    )
}