export type PersonalPreferences = {
    showMediaBackdrop: boolean,
    usernameAsDisplayName: boolean
    showExtraLabels: boolean
}

export type UpdatePersonalPreferencesDto = Partial<PersonalPreferences>;
