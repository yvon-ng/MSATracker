import {
    alpha,
    Badge,
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    Stack,
    Typography, useTheme
} from "@mui/material";
import {ProfileAvatar} from "./ProfileAvatar.tsx";
import {StatDisplay} from "./StatDisplay.tsx";
import {UserAuth} from "../context/AuthContextProvider.tsx";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {ProfileOptionsMenu} from "./ProfileOptionsMenu.tsx";
import {useChangeProfilePicture} from "../hooks/UseProfilePicture.ts";
import {type ChangeEvent, useRef} from "react";
import {MIME_EXTENSIONS} from "../utils/pictureUitls.ts";


export function ProfileCard() {
    const {user, supabaseUser} = UserAuth()
    const joinedYear = supabaseUser ? new Date(supabaseUser.created_at).getFullYear() : undefined;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {changePicture, isPending, error} = useChangeProfilePicture();
    const theme = useTheme();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && supabaseUser) {
            changePicture({userId: supabaseUser.id, file});
        }
        event.target.value = "";
    };

    return (
        <Card variant="outlined" sx={{borderRadius: 4, mt: {xs: 10}, mb: {xs: 0}}}>
            <CardHeader action={<ProfileOptionsMenu/>}/>
            <CardContent sx={{textAlign: "center"}}>
                <Stack spacing={3} justifyContent={"center"} alignItems={"center"} py={3}>
                    <Box>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept={Object.keys(MIME_EXTENSIONS).join(",")}
                            hidden
                            onChange={handleFileChange}
                        />

                        <Box
                            component="button"
                            type="button"
                            aria-label="Upload profile picture"
                            disabled={isPending}
                            onClick={() => fileInputRef.current?.click()}
                            sx={{
                                display: "block",
                                p: 0,
                                border: 0,
                                borderRadius: "50%",
                                bgcolor: "transparent",
                                cursor: isPending ? "wait" : "pointer",
                            }}
                        >
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
                        </Box>
                    </Box>

                    {isPending && (
                        <Typography variant="caption" color="text.secondary">
                            Updating profile picture...
                        </Typography>
                    )}

                    {error && (
                        <Typography variant="caption" color="error">
                            {error.message}
                        </Typography>
                    )}

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

            {/*TODO Tracked / Completed / Watchlist statistics */}
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