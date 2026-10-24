import {
    Alert,
    alpha,
    Box,
    CardContent,
    IconButton,
    InputAdornment,
    Stack,
    Tooltip,
    Typography,
    useTheme
} from "@mui/material";
import {LabeledTextField} from "./LabeledTextField.tsx";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import type {UpdateUserDto} from "../model/User.ts";
import {type SubmitEvent} from "react"
import {UserAuth} from "../context/AuthContextProvider.tsx";
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

interface PersonalInformationFormProps {
    formValues: UpdateUserDto;
    isEditing: boolean;
    isPending: boolean;
    error: Error | null;
    onFieldChange: (field: keyof UpdateUserDto, value: string) => void;
    onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
}

export function PersonalInformationForm({
                                            formValues,
                                            isEditing,
                                            isPending,
                                            error,
                                            onFieldChange,
                                            onSubmit
                                        }: PersonalInformationFormProps) {
    const {user} = UserAuth();
    const theme = useTheme();

    return (
        <Box component="form" onSubmit={onSubmit}>
            <CardContent>
                <Stack spacing={5} p={3}>
                    <Stack direction={{xs: "column", sm: "row", md: "column", lg: "row"}} spacing={4}>
                        <LabeledTextField
                            label="First name"
                            disabled={!isEditing || isPending}
                            value={isEditing ? formValues.firstName : user?.firstName ?? ""}
                            onChange={(value) => onFieldChange("firstName", value)}
                        />
                        <LabeledTextField
                            label="Last name"
                            disabled={!isEditing || isPending}
                            value={isEditing ? formValues.lastName : user?.lastName ?? ""}
                            onChange={(value) => onFieldChange("lastName", value)}
                        />
                    </Stack>
                    <Stack direction={{xs: "column", sm: "row", md: "column", lg: "row"}} spacing={4}>
                        <LabeledTextField
                            label="Username"
                            value={user?.username ?? ""}
                            disabled
                            startAdornment={
                                <InputAdornment
                                    position="start"
                                    sx={{
                                        alignSelf: "stretch",
                                        maxHeight: "none",
                                        px: 1.5,
                                        bgcolor: "action.hover",
                                        borderRight: 1,
                                        borderColor: "divider",
                                        borderTopLeftRadius: 2,
                                        borderBottomLeftRadius: 2
                                    }}
                                >
                                    @
                                </InputAdornment>
                            }
                        />
                        <LabeledTextField
                            label="Email address"
                            value={user?.email ?? ""}
                            disabled
                        />
                    </Stack>
                </Stack>

                {error && (
                    <Alert
                        icon={<WarningAmberOutlinedIcon fontSize={"large"}/>}
                        severity="error"
                        variant="outlined"
                        sx={{
                            mx: 3,
                            mb: 2,
                            borderRadius: 2,
                            border: "2px solid",
                            backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                            borderColor: alpha(theme.palette.secondary.main, 0.8),
                            color: alpha(theme.palette.secondary.main, 0.8),
                        }}
                    >
                        <Typography variant={"subtitle1"} lineHeight={{xs: 1.1, sm: "auto"}} mb={{xs: 1, sm: 0.5}}
                                    fontWeight={600}>Failed to update your profile.</Typography>
                        <Typography variant="body2" color="text.secondary" lineHeight={{xs: "auto", sm: 1.1}}>
                            {error.message}
                        </Typography>
                    </Alert>
                )}

                {isEditing && (
                    <Box display="flex" justifyContent="flex-end" px={3}>
                        <Tooltip placement={"left"} arrow title={"Save changes"}>
                            <IconButton
                                aria-label="Save changes"
                                type="submit"
                                disabled={isPending}
                                sx={{
                                    color: "secondary.main",
                                    borderColor: "secondary.main",
                                    border: "1px solid",
                                    borderRadius: 2
                                }}
                                size="medium"
                            >
                                <CheckOutlinedIcon fontSize="medium"/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            </CardContent>
        </Box>
    )
}