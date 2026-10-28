export function getCountryName(countryCode: string): string {
    const countryNames = new Intl.DisplayNames(["en"], {
        type: "region",
    });

    try {
        return countryNames.of(countryCode) ?? countryCode;
    } catch {
        return countryCode;
    }
}