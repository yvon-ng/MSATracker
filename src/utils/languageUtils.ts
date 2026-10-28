export function getLanguageName(languageCode: string): string {
    const languageNames = new Intl.DisplayNames(["en"], {
        type: "language",
    });

    return languageNames.of(languageCode) ?? languageCode;
}