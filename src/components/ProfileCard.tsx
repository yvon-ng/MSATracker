import {alpha, Box, Card, CardContent, Chip, Divider, Stack, Typography} from "@mui/material";
import {ProfileAvatar} from "./ProfileAvatar.tsx";
import theme from "../theme/theme.ts";
import {StatDisplay} from "./StatDisplay.tsx";
import type {User} from "../model/user.ts";
import {UserAuth} from "../context/AuthContextProvider.tsx";

interface ProfileCardProps {
    user: User | undefined;
}

export function ProfileCard({user}: ProfileCardProps) {
    const {supabaseUser} = UserAuth()
    const joinedYear = supabaseUser ? new Date(supabaseUser.created_at).getFullYear() : undefined;

    return(
        <Card variant="outlined" sx={{borderRadius: 4, my: 10}}>
            <CardContent sx={{textAlign: "center"}}>
                <Stack spacing={3} justifyContent={"center"} alignItems={"center"} py={3}>

                    <ProfileAvatar size={100} />

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