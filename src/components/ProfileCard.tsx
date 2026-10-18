import {
    alpha,
    Badge,
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    IconButton, ListItemIcon, ListItemText, Menu, MenuItem,
    Stack,
    Typography
} from "@mui/material";
import {ProfileAvatar} from "./ProfileAvatar.tsx";
import theme from "../theme/theme.ts";
import {StatDisplay} from "./StatDisplay.tsx";
import type {User} from "../model/User.ts";
import {UserAuth} from "../context/AuthContextProvider.tsx";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {useState} from "react";
import {useLogOut} from "../hooks/UseAuth.ts";

interface ProfileCardProps {
    user: User | undefined;
}

export function ProfileCard({user}: ProfileCardProps) {
    const {supabaseUser} = UserAuth()
    const joinedYear = supabaseUser ? new Date(supabaseUser.created_at).getFullYear() : undefined;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const { logout, isLoggingOut } = useLogOut();

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleMenuClose();
        await logout();
    };

    return (
        <Card variant="outlined" sx={{borderRadius: 4, mt: {xs: 10}, mb: {xs: 0}}}>
            <CardHeader
                action={
                    <>
                        <IconButton
                            aria-label="Profile options"
                            aria-haspopup="true"
                            aria-expanded={isMenuOpen ? "true" : undefined}
                            onClick={handleMenuOpen}
                        >
                            <MoreVertIcon sx={{color: "text.secondary"}}/>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={isMenuOpen}
                            onClose={handleMenuClose}
                            slotProps={{
                                paper: {
                                    elevation: 3,
                                    sx: {
                                        border: 1,
                                        borderColor: "divider",
                                        borderRadius: 2,
                                    },
                                },
                                list: {
                                    sx: {
                                        p: 0, //might need to remove when more settings come
                                    },
                                },
                            }}
                        >
                            <MenuItem
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                sx={{
                                    px: 2, //might need to remove when more settings come
                                    py: 1.5, //might need to remove when more settings come
                                    color: "secondary.main",
                                    "& .MuiSvgIcon-root": {
                                        color: "secondary.main",
                                        transition: "transform 500ms ease",
                                    },
                                    "& .MuiListItemText-root": {
                                        transition: "transform 500ms ease",
                                    },
                                    "&:hover": {
                                        bgcolor: "secondary.main",
                                        color: "black",
                                        "& .MuiListItemIcon-root": {
                                            color: "black",
                                        },
                                        "& .MuiSvgIcon-root": {
                                            color: "black",
                                            transform: "translateX(-3rem)",
                                        },
                                        "& .MuiListItemText-root": {
                                            transform: "translateX(-1rem)",
                                        },
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    <LogoutOutlinedIcon fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText>
                                    Log out
                                </ListItemText>
                            </MenuItem>
                        </Menu>
                    </>
                }
            />
            <CardContent sx={{textAlign: "center"}}>
                <Stack spacing={3} justifyContent={"center"} alignItems={"center"} py={3}>
                    {/*TODO enable user to upload own picture*/}
                    <Badge
                        overlap="circular"
                        anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                        badgeContent={<AddOutlinedIcon/>}
                        sx={{
                            "& .MuiBadge-badge": {
                                width: 30,
                                height: 30,
                                borderRadius: "100%",
                                bgcolor: "secondary.main",
                                color: "background.paper",
                                border: "3px solid",
                            },
                        }}
                    >
                        <ProfileAvatar
                            size={100}
                            sx={{
                                bgcolor: "background.default",
                                border: "4px solid",
                                borderColor: alpha("rgb(250, 250, 250)", 0.4),
                                outline: "4px solid",
                                outlineColor: alpha("rgb(250, 250, 250)", 0.1),
                            }}
                        />
                    </Badge>

                    <Box>
                        <Typography variant="h4">
                            {user?.firstName} {user?.lastName}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            @{user?.username}
                        </Typography>
                    </Box>
                    <Chip
                        variant="outlined"
                        label={`MEMBER SINCE ${joinedYear}`}
                        size="medium"
                        sx={{
                            "& .MuiChip-label": {
                                fontSize: "0.6rem",
                                fontWeight: 500,
                                px: 2
                            },
                            color: alpha(theme.palette.secondary.main, 0.8),
                            backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                            borderColor: alpha(theme.palette.secondary.main, 0.8),
                        }}
                    />
                </Stack>
            </CardContent>

            <Divider sx={{mx: 3}}/>

            {/* Tracked / Completed / Watchlist statistics */}
            <CardContent>
                <Stack direction="row" justifyContent="space-around" alignItems="center">
                    <StatDisplay value={124} label="Total"/>
                    <Divider orientation="vertical" flexItem/>
                    <StatDisplay value={12} label="Completed"/>
                    <Divider orientation="vertical" flexItem/>
                    <StatDisplay value={72} label="Watchlist"/>
                </Stack>
            </CardContent>
        </Card>
    )
}