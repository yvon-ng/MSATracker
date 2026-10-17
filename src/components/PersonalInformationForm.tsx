import {Alert, Box, CardContent, IconButton, InputAdornment, Stack, Tooltip} from "@mui/material";
import {LabeledTextField} from "./LabeledTextField.tsx";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import type {UpdateUserDto, User} from "../model/User.ts";
import {type SubmitEvent} from "react"

interface PersonalInformationFormProps {
    user: User | undefined;
    formValues: UpdateUserDto;
    isEditing: boolean;
    isPending: boolean;
    error: Error | null;
    onFieldChange: (field: keyof UpdateUserDto, value: string) => void;
    onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
}

export function PersonalInformationForm({
                                            user,
                                            formValues,
                                            isEditing,
                                            isPending,
                                            error,
                                            onFieldChange,
                                            onSubmit
                                        }: PersonalInformationFormProps) {
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
                {/*TODO check how this is displayed*/}
                {error && (
                    <Alert severity="error" sx={{mx: 3, mb: 2}}>
                        {error.message}
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