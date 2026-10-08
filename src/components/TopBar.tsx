import {
    AppBar as MuiAppBar,
    type AppBarProps as MuiAppBarProps,
    Toolbar,
    Typography,
    styled, Stack,
} from "@mui/material";
import {collapsedDrawerWidth, drawerWidth, topBarHeight} from "./layoutConstants.ts";
import {SearchBar} from "./SearchBar.tsx";

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const StyledAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme}) => ({
    zIndex: theme.zIndex.drawer + 1,

    marginLeft: collapsedDrawerWidth,
    width: `calc(100% - ${collapsedDrawerWidth}px)`,

    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),

    variants: [
        {
            props: ({open}) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,

                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

interface TopBarProps {
    open: boolean;
}


export default function TopBar({open}: TopBarProps) {
    return (
        <StyledAppBar position="fixed" open={open}>
            <Toolbar
                sx={{
                    height: topBarHeight,
                    bgcolor: "background.default",
                    borderBottom: 2,
                    borderColor: "divider",
                    justifyContent: "space-between"
                }}
            >
                <Stack direction={"row"}>
                    <Typography variant="h5" noWrap fontWeight={600}>
                        msa
                    </Typography>
                    <Typography variant="h5" noWrap color={"secondary"} fontWeight={600}>
                        tracker
                    </Typography>
                </Stack>
                <SearchBar/>
            </Toolbar>
        </StyledAppBar>
    );
}