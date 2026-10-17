import {PageHeader} from "../components/PageHeader.tsx";
import {
    Alert,
    Box,
    CardContent, IconButton,
    InputAdornment,
    Stack,
    TextField, Tooltip,
    Typography
} from "@mui/material";
import {UserAuth} from "../context/AuthContextProvider.tsx";
import {ProfileCard} from "../components/ProfileCard.tsx";
import {PreferencesCard} from "../components/PreferencesCard.tsx";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {useUpdateUser} from "../hooks/useUser.ts";
import {useState} from "react";
import type {UpdateUserDto} from "../model/User.ts";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import {SwitchSetting} from "../components/SwitchSetting.tsx";

export function ProfilePage() {
    const {user} = UserAuth()
    const {updateUser, isPending, error} = useUpdateUser(user?.userId);
    const [isEditing, setIsEditing] = useState(false);

    const [formValues, setFormValues] = useState<UpdateUserDto>({
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
    });

    const handleStartEditing = () => {
        setFormValues({
            firstName: user?.firstName ?? "",
            lastName: user?.lastName ?? "",
        });

        setIsEditing(true);
    };

    const handleFieldChange = (field: keyof UpdateUserDto, value: string) => {
        setFormValues((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const handleSave = () => {
        updateUser(formValues, {
            onSuccess: () => {
                setIsEditing(false);
            },
        });
    };

    const handleCancel = () => {
        setFormValues({
            firstName: user?.firstName ?? "",
            lastName: user?.lastName ?? "",
        });
        setIsEditing(false);
    };

    return (
        <Box my={10} ml={{xs: 0, md: 8}} mr={{xs: 5, sm: 8}}>
            <Stack direction={{xs: "column", md: "row"}} spacing={{xs: 5, xl: 10}} my={10}>
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
                            <Tooltip placement={"left"} arrow
                                     title={isEditing ? "Cancel editing" : "Edit personal information"}>
                                <IconButton
                                    aria-label={isEditing ? "Cancel editing personal information" : "Edit personal information"}
                                    size="medium"
                                    onClick={isEditing ? handleCancel : handleStartEditing}
                                    sx={{color: "text.secondary"}}
                                    disabled={isPending}
                                >
                                    {isEditing ? (<CloseOutlinedIcon fontSize="medium"/>) : (
                                        <EditOutlinedIcon fontSize="medium"/>)}
                                </IconButton>
                            </Tooltip>
                        }>
                        <CardContent>
                            <Stack spacing={5} p={3}>
                                <Stack direction={{xs: "column", sm: "row", md: "column", lg: "row"}} spacing={4}>
                                    <Stack spacing={1} flex={1}>
                                        <Typography variant={"caption"} color={"textSecondary"}>First name</Typography>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            disabled={!isEditing || isPending}
                                            value={isEditing
                                                ? formValues.firstName
                                                : user?.firstName ?? ""
                                            }
                                            onChange={(event) =>
                                                handleFieldChange("firstName", event.target.value)
                                            }
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 2,
                                                },
                                                "& .MuiInputBase-input": {
                                                    fontSize: "0.8rem",
                                                },
                                            }}
                                        />
                                    </Stack>
                                    <Stack spacing={1} flex={1}>
                                        <Typography variant={"caption"} color={"textSecondary"}>Last name</Typography>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            disabled={!isEditing || isPending}
                                            value={isEditing
                                                ? formValues.lastName
                                                : user?.lastName ?? ""
                                            }
                                            onChange={(event) =>
                                                handleFieldChange("lastName", event.target.value)
                                            }
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 2,
                                                },
                                                "& .MuiInputBase-input": {
                                                    fontSize: "0.8rem",
                                                },
                                            }}
                                        />
                                    </Stack>
                                </Stack>
                                <Stack direction={{xs: "column", sm: "row", md: "column", lg: "row"}} spacing={4}>
                                    <Stack spacing={1} flex={1}>
                                        <Typography variant={"caption"} color={"textSecondary"}>Username</Typography>
                                        <TextField variant="outlined" disabled value={user?.username ?? ""} fullWidth
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
                                                           borderRadius: 2,
                                                       },
                                                   }}
                                        />
                                    </Stack>
                                    <Stack spacing={1} flex={1}>
                                        <Typography variant={"caption"} color={"textSecondary"}>Email
                                            address</Typography>
                                        <TextField variant="outlined" disabled value={user?.email ?? ""}
                                                   fullWidth
                                                   sx={{
                                                       "& .MuiOutlinedInput-root": {
                                                           borderRadius: 2,
                                                       },
                                                       "& .MuiInputBase-input": {
                                                           fontSize: "0.8rem",
                                                       },
                                                   }}
                                        />
                                    </Stack>
                                </Stack>
                            </Stack>
                            {/*TODO check how this is displayed*/}
                            {error && (
                                <Alert severity="error" sx={{mx: 3, mb: 2}}>
                                    {error.message}
                                </Alert>
                            )}

                            {isEditing && (
                                <Box display="flex" justifyContent="flex-end" px={3}>
                                    <Tooltip placement={"left"} arrow
                                             title={"Save changes"}>
                                        <IconButton
                                            aria-label="Save changes"
                                            onClick={handleSave}
                                            disabled={isPending}
                                            sx={{
                                                color: "secondary.main",
                                                borderColor: "secondary.main",
                                                border: "1px solid",
                                                borderRadius: "100%"
                                            }}
                                            size="medium"
                                        >
                                            <CheckOutlinedIcon fontSize="medium"/>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            )}
                        </CardContent>
                    </PreferencesCard>
                    <PreferencesCard title={"Personal preferences"} subtitle={"Manage how the app behaves."}>
                        <CardContent>
                            <Stack spacing={4} p={3}>
                                <SwitchSetting
                                    userId={user?.userId}
                                    title="Show media backdrop"
                                    description="Show the media backdrop as a background on the detail page."
                                    preferenceKey="showMediaBackdrop"
                                />

                                <SwitchSetting
                                    userId={user?.userId}
                                    title="Username as display name"
                                    description="Use your username instead of your first name across the app."
                                    preferenceKey="usernameAsDisplayName"
                                />
                            </Stack>
                        </CardContent>
                    </PreferencesCard>
                </Stack>
            </Stack>
        </Box>
    )
}