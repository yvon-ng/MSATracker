export type PersonalPreferences = {
    showMediaBackdrop: boolean,
    usernameAsDisplayName: boolean
}

export type UpdatePersonalPreferencesDto = Partial<PersonalPreferences>;
