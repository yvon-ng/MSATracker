import {alpha, IconButton, InputBase, styled} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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


export function SearchBar() {
    return (
        <>
            {/* Mobile */}
            <IconButton
                sx={{display: {xs: "flex", sm: "none"}}}
                aria-label="Search"
            >
                <SearchIcon sx={{color: "text.secondary"}}/>
            </IconButton>

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