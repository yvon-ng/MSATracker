import {alpha, Box, IconButton, InputBase, styled} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {useState} from "react";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: 8,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: alpha(theme.palette.divider, 0.05),
    display: "none",

    [theme.breakpoints.up('sm')]: {
        display: "block",
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: "inherit",
    width: "100%",

    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 2),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: "25ch",
        transition: theme.transitions.create("width"),

        "&:focus": {
            width: "33ch",
        },
    },
}));

const MobileSearchOverlay = styled(Box)(({theme}) => ({
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


export function SearchBar() {
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    return (
        <>
            {/* Mobile */}
            <IconButton
                sx={{display: {xs: "flex", sm: "none"}}}
                aria-label="Search"
                onClick={() => setMobileSearchOpen((prev) => !prev)}
            >
                <SearchIcon sx={{color: "text.secondary"}}/>
            </IconButton>

            {mobileSearchOpen && (
                <StyledMobileInputBase
                    autoFocus placeholder="Find something to watch..."
                    inputProps={{
                        "aria-label": "Search titles"
                    }}
                    // value={query}
                    // onChange={(event) => setQuery(event.target.value)}
                />
            )}

            {/* Mobile overlay */}
            {mobileSearchOpen && (
                <MobileSearchOverlay>
                    <SearchIcon sx={{color: "text.secondary"}}/>

                    <StyledMobileInputBase
                        autoFocus
                        placeholder="Find something to watch..."
                        inputProps={{"aria-label": "Search titles"}}
                    />

                    <IconButton
                        aria-label="Close search"
                        onClick={() => setMobileSearchOpen(false)}
                    >
                        <CloseIcon sx={{color: "text.secondary"}}/>
                    </IconButton>
                </MobileSearchOverlay>
            )}

            {/* Mobile: tablet + Desktop */}
            <Search>
                <SearchIconWrapper>
                    <SearchIcon sx={{color: "text.secondary"}}/>
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Find something to watch..."
                    inputProps={{'aria-label': 'search'}}
                />
            </Search>
        </>
    )
}