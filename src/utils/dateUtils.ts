export function getFormattedDate(date = new Date()): string {
    return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });
}

export function getGreeting(date = new Date()): string {
    const hour = date.getHours();

    if (hour < 12) return "Good morning,";
    if (hour < 18) return "Good afternoon,";

    return "Good evening,";
}
