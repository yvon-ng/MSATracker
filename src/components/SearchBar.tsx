import {alpha, InputBase, styled} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: 8,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: alpha(theme.palette.divider, 0.05),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
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
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '25ch',
            '&:focus': {
                width: '33ch',
            },
        },
    },
}));


export function SearchBar() {
    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon sx={{color: "text.secondary"}} />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Find something to watch..."
                inputProps={{'aria-label': 'search'}}
            />
        </Search>
    )
}