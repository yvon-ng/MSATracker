import {
    AppBar as MuiAppBar,
    type AppBarProps as MuiAppBarProps,
    Toolbar,
    Typography,
    styled, Stack, IconButton,
} from "@mui/material";
import {collapsedDrawerWidth, drawerWidth, topBarHeight} from "./layoutConstants.ts";
import {SearchBar} from "./SearchBar.tsx";
import MenuIcon from "@mui/icons-material/Menu";
import {useNavigate} from "react-router";

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const StyledAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme}) => ({
    zIndex: theme.zIndex.drawer + 1,

    // marginLeft: 0,
    // width: "100%",

    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),

    [theme.breakpoints.up("md")]: {
        marginLeft: collapsedDrawerWidth,
        width: `calc(100% - ${collapsedDrawerWidth}px)`,
    },

    variants: [
        {
            props: ({open}) => open,
            style: {
                [theme.breakpoints.up("md")]: {
                    marginLeft: drawerWidth,
                    width: `calc(100% - ${drawerWidth}px)`,
                },

                transition: theme.transitions.create(["width", "margin"], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

interface TopBarProps {
    open: boolean;
    onMenuClick: () => void;
}


export default function TopBar({open, onMenuClick}: TopBarProps) {
    const navigate = useNavigate();

    const handleLogoClick = () =>{
        navigate("/home")
    }

    return (
        <StyledAppBar position="fixed" open={open}>
            <Toolbar
                sx={{
                    height: topBarHeight,
                    bgcolor: "background.default",
                    borderBottom: 2,
                    borderColor: "divider",
                    alignItems: "center",
                    // position: "relative",
                }}
            >
                <IconButton
                    size="small"
                    aria-label="menu"
                    onClick={onMenuClick}
                    sx={{
                        display: {xs: "inline-flex", md: "none"},
                        mr: 2,
                    }}
                >
                    <MenuIcon/>
                </IconButton>
                <Stack direction={"row"} flex={1} justifyContent={"space-between"} alignItems={"center"}>
                    <Stack direction={"row"} onClick={handleLogoClick}>
                        <Typography variant="h5" noWrap fontWeight={600}>
                            msa
                        </Typography>
                        <Typography variant="h5" noWrap color={"secondary"} fontWeight={600}>
                            tracker
                        </Typography>
                    </Stack>
                    <SearchBar/>
                </Stack>
            </Toolbar>
        </StyledAppBar>
    );
}