import {PageHeader} from "../components/PageHeader.tsx";
import {
    Box,
    CardContent, FormControlLabel, IconButton,
    InputAdornment,
    Stack, Switch,
    TextField,
    Typography
} from "@mui/material";
import {UserAuth} from "../context/AuthContextProvider.tsx";
import {ProfileCard} from "../components/ProfileCard.tsx";
import {PreferencesCard} from "../components/PreferencesCard.tsx";
import {useState} from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";


export function ProfilePage() {
    const {user} = UserAuth()
    const [showMediaBackdrop, setShowMediaBackdrop] = useState(false);
    const [useUsername, setUseUsername] = useState(true);

    return (
        <Box my={10} ml={{xs: 0, md: 8}} mr={{xs: 5, sm: 8}}>
            <Stack direction="row" spacing={10} my={10}>
                <Box>
                    <PageHeader overline={"Account"} title={"Your"} titleSuffix={"Profile."}
                                subtitle={"Manage how you appear across your library."}/>
                    <ProfileCard user={user}/>
                </Box>
                <Stack flex={1} height={"100%"} spacing={2}>
                    <PreferencesCard
                        title={"Personal information"}
                        subtitle={"Your account details and identity."}
                        headerActionButton={
                            // todo user should be able to edit info
                            <IconButton
                                aria-label={"Edit Personal Information"}
                                size="small"
                                sx={{color: "text.secondary"}}
                            >
                                <EditOutlinedIcon fontSize="small"/>
                            </IconButton>
                        }>
                        <CardContent>
                            <Stack spacing={5} p={3}>
                                <Stack direction="row" spacing={4}>
                                    <Stack spacing={1} flex={1}>
                                        <Typography variant={"caption"} color={"textSecondary"}>First name</Typography>
                                        <TextField variant="outlined" disabled value={user?.firstName} fullWidth
                                                   sx={{
                                                       "& .MuiInputBase-input": {
                                                           fontSize: "0.8rem",
                                                       },
                                                   }}
                                        />
                                    </Stack>
                                    <Stack spacing={1} flex={1}>
                                        <Typography variant={"caption"} color={"textSecondary"}>Last name</Typography>
                                        <TextField variant="outlined" disabled value={user?.lastName} fullWidth
                                                   sx={{
                                                       "& .MuiInputBase-input": {
                                                           fontSize: "0.8rem",
                                                       },
                                                   }}
                                        />
                                    </Stack>
                                </Stack>
                                <Stack direction="row" spacing={4}>
                                    <Stack spacing={1} flex={1}>
                                        <Typography variant={"caption"} color={"textSecondary"}>Username</Typography>
                                        <TextField variant="outlined" disabled value={user?.username} fullWidth
                                                   slotProps={{
                                                       input: {
                                                           startAdornment: <InputAdornment position="start"
                                                                                           sx={{
                                                                                               alignSelf: "stretch",
                                                                                               maxHeight: "none",
                                                                                               px: 1.5,
                                                                                               bgcolor: "action.hover",
                                                                                               borderRight: 1,
                                                                                               borderColor: "divider",
                                                                                           }}
                                                           >
                                                               @
                                                           </InputAdornment>,
                                                       },
                                                   }}
                                                   sx={{
                                                       "& .MuiInputBase-input": {
                                                           fontSize: "0.8rem",
                                                       },
                                                       "& .MuiOutlinedInput-root": {
                                                           pl: 0,
                                                       },
                                                   }}
                                        />
                                    </Stack>
                                    <Stack spacing={1} flex={1}>
                                        <Typography variant={"caption"} color={"textSecondary"}>Email
                                            address</Typography>
                                        <TextField variant="outlined" disabled value={user?.email} fullWidth
                                                   sx={{
                                                       "& .MuiInputBase-input": {
                                                           fontSize: "0.8rem",
                                                       },
                                                   }}
                                        />
                                    </Stack>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </PreferencesCard>
                    <PreferencesCard title={"Personal preferences"} subtitle={"Manage how the app behaves."}>
                        <CardContent>
                            <Stack spacing={3} p={3}>
                                <Box>
                                    {/*TODO needs to be added to database*/}
                                    <FormControlLabel
                                        label="Show media backdrop"
                                        labelPlacement="start"
                                        control={
                                            <Switch
                                                checked={showMediaBackdrop}
                                                onChange={(event) => setShowMediaBackdrop(event.target.checked)}
                                                sx={{
                                                    width: 50,
                                                    height: 26,
                                                    padding: 0,
                                                    "& .MuiSwitch-switchBase": {
                                                        padding: "3px",
                                                        "&.Mui-checked": {
                                                            transform: "translateX(25px)",
                                                            color: "#fff",
                                                            "& + .MuiSwitch-track": {
                                                                backgroundColor: "secondary.main",
                                                                opacity: 1,
                                                            },
                                                        },
                                                    },
                                                    "& .MuiSwitch-thumb": {
                                                        width: 20,
                                                        height: 20,
                                                        boxShadow: "none",
                                                    },
                                                    "& .MuiSwitch-track": {
                                                        borderRadius: 13,
                                                        backgroundColor: "#80848E",
                                                        opacity: 1,
                                                    },
                                                }}
                                            />
                                        }
                                        sx={{
                                            m: 0,
                                            width: "100%",
                                            justifyContent: "space-between",
                                        }}
                                    />
                                    <Typography variant={"caption"} color={"textSecondary"}>When turned on shows the
                                        media backdrop as a background in the detail page.</Typography>
                                </Box>
                                <Box>
                                    <FormControlLabel
                                        label="Use username as display name"
                                        labelPlacement="start"
                                        control={
                                            <Switch
                                                checked={useUsername}
                                                onChange={(event) => setUseUsername(event.target.checked)}
                                                sx={{
                                                    width: 50,
                                                    height: 26,
                                                    padding: 0,
                                                    "& .MuiSwitch-switchBase": {
                                                        padding: "3px",
                                                        "&.Mui-checked": {
                                                            transform: "translateX(25px)",
                                                            color: "#fff",
                                                            "& + .MuiSwitch-track": {
                                                                backgroundColor: "secondary.main",
                                                                opacity: 1,
                                                            },
                                                        },
                                                    },
                                                    "& .MuiSwitch-thumb": {
                                                        width: 20,
                                                        height: 20,
                                                        boxShadow: "none",
                                                    },
                                                    "& .MuiSwitch-track": {
                                                        borderRadius: 13,
                                                        backgroundColor: "#80848E",
                                                        opacity: 1,
                                                    },
                                                }}
                                            />
                                        }
                                        sx={{
                                            m: 0,
                                            width: "100%",
                                            justifyContent: "space-between",
                                        }}
                                    />
                                    <Typography variant={"caption"} color={"textSecondary"}>Turn off to use your first name
                                        as your display name across the app. (Make sure to have filled in your details above.)</Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </PreferencesCard>
                </Stack>
            </Stack>
        </Box>
    )
}