import {PageHeader} from "../components/PageHeader.tsx";
import {
    Alert,
    Box,
    CardContent, FormControlLabel, IconButton,
    InputAdornment,
    Stack, Switch,
    TextField, Tooltip,
    Typography
} from "@mui/material";
import {UserAuth} from "../context/AuthContextProvider.tsx";
import {ProfileCard} from "../components/ProfileCard.tsx";
import {PreferencesCard} from "../components/PreferencesCard.tsx";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {usePersonalPreferences, useUpdatePersonalPreferences} from "../hooks/UsePersonalPreferences.ts";
import type {UpdatePersonalPreferencesDto} from "../model/PersonalPreferences.ts";
import {useUpdateUser} from "../hooks/useUser.ts";
import {useState} from "react";
import type {UpdateUserDto} from "../model/User.ts";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

export function ProfilePage() {
    const {user} = UserAuth()
    const {personalPreferences} = usePersonalPreferences(user?.userId);
    const {updatePersonalPreferences} = useUpdatePersonalPreferences(user?.userId);
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

    const handlePreferenceChange = (preference: keyof UpdatePersonalPreferencesDto, value: boolean) => {
        updatePersonalPreferences({[preference]: value,});
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
                                <Stack direction="row" spacing={4}>
                                    <Stack spacing={1} flex={1}>
                                        <Typography variant={"caption"} color={"textSecondary"}>First name</Typography>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            disabled={!isEditing || isPending}
                                            value={formValues.firstName}
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
                                            value={formValues.lastName}
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
                                                           borderRadius: 2,
                                                       },
                                                   }}
                                        />
                                    </Stack>
                                    <Stack spacing={1} flex={1}>
                                        <Typography variant={"caption"} color={"textSecondary"}>Email
                                            address</Typography>
                                        <TextField variant="outlined" disabled value={user?.email} fullWidth
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
                            <Stack spacing={3} p={3}>
                                <Box>
                                    <FormControlLabel
                                        label="Show media backdrop"
                                        labelPlacement="start"
                                        control={
                                            <Switch
                                                checked={personalPreferences?.showMediaBackdrop}
                                                disabled={!personalPreferences}
                                                onChange={(event) =>
                                                    handlePreferenceChange(
                                                        "showMediaBackdrop",
                                                        event.target.checked,
                                                    )
                                                }
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
                                                checked={personalPreferences?.usernameAsDisplayName}
                                                disabled={!personalPreferences}
                                                onChange={(event) =>
                                                    handlePreferenceChange(
                                                        "usernameAsDisplayName",
                                                        event.target.checked,
                                                    )
                                                }
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
                                    <Typography variant={"caption"} color={"textSecondary"}>Turn off to use your first
                                        name as your display name across the app. (Make sure to have filled in your
                                        details above.)</Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </PreferencesCard>
                </Stack>
            </Stack>
        </Box>
    )
}