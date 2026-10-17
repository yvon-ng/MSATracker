export type PersonalPreferences = {
    personalPreferencesId: string, // todo maybe not needed
    showMediaBackdrop: boolean,
    usernameAsDisplayName: boolean
}

export type UpdatePersonalPreferenceseDto = Partial<Omit<PersonalPreferences, "personalPreferencesId">>;
