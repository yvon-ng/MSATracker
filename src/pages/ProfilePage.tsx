import {PageHeader} from "../components/PageHeader.tsx";
import {
    Box,
    CardContent,
    Stack,
} from "@mui/material";
import {UserAuth} from "../context/AuthContextProvider.tsx";
import {ProfileCard} from "../components/ProfileCard.tsx";
import {PreferencesCard} from "../components/PreferencesCard.tsx";
import {useUpdateUser} from "../hooks/useUser.ts";
import {type SubmitEvent, useState} from "react";
import type {UpdateUserDto} from "../model/User.ts";
import {SwitchSetting} from "../components/SwitchSetting.tsx";
import {PersonalInformationForm} from "../components/PersonalInformationForm.tsx";

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

    const handleSave = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                        showEditButton={true}
                        isEditing={isEditing}
                        isPending={isPending}
                        onEdit={handleStartEditing}
                        onCancel={handleCancel}
                    >
                        <PersonalInformationForm
                            user={user}
                            formValues={formValues}
                            isEditing={isEditing}
                            isPending={isPending}
                            error={error}
                            onFieldChange={handleFieldChange}
                            onSubmit={handleSave}
                        />
                    </PreferencesCard>
                    <PreferencesCard title={"Personal preferences"} subtitle={"Control how the app behaves."}
                                     showEditButton={false}>
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