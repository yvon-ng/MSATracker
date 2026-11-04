import {Box, Divider, Link as MuiLink, Stack, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router";

export function CookiePolicyPage() {
    return (
        <Stack mt={{xs: 12, md: 16}} mb={{xs: 10}} mx={{xs: 5, md: 8}} spacing={5}>
            <Stack spacing={2}>
                <Typography variant="h3">
                    Cookie{" "}
                    <Box component="span" color="secondary.main">
                        policy
                    </Box>
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Last updated: 4 November 2026
                </Typography>

                <Typography variant="body1" color="text.secondary" maxWidth={850}>
                    This Cookie Policy explains how MSATracker uses cookies
                    and similar technologies when you visit or use the application.
                    We are committed to respecting your privacy and being
                    transparent about how information is stored and used on your device.
                </Typography>
            </Stack>

            <Divider/>

            <Stack spacing={5} maxWidth={900}>
                <Stack spacing={2}>
                    <Typography variant="h5">
                        1. What Are Cookies?
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Cookies are small text files stored on your device when
                        you visit a website. They allow websites to remember
                        information about your visit, maintain functionality,
                        and improve the user experience.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Similar technologies, such as local storage and session
                        storage, can also store information directly in your
                        browser. Although these technologies are not technically
                        cookies, they may be subject to similar privacy and
                        data-protection requirements.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        2. How We Use Cookies and Similar Technologies
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        MSATracker does not intentionally use browser cookies
                        for its own advertising or analytics purposes.
                        However, the application uses browser storage to support
                        its core functionality.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        In particular, Supabase Auth uses browser local storage
                        to maintain your authentication session, including
                        information needed to keep you signed in and access
                        your account.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        3. Third-Party Services
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        MSATracker relies on third-party services to provide
                        certain application features:
                    </Typography>

                    <Stack spacing={1} pl={2}>
                        <Typography variant="body1" color="text.secondary">
                            <strong>Supabase:</strong> Used for authentication,
                            database functionality, and account management.
                            Authentication session information is stored in
                            browser local storage.
                        </Typography>

                        <Typography variant="body1" color="text.secondary">
                            <strong>The Movie Database (TMDB):</strong> Used
                            to retrieve movie and television series information
                            and images through its API.
                        </Typography>
                    </Stack>

                    <Typography variant="body1" color="text.secondary">
                        These services may process technical information when
                        communicating with their servers. Any cookies or
                        similar technologies used directly by these providers
                        are governed by their respective privacy policies.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        You can find more information in their privacy policies:
                    </Typography>

                    <Stack spacing={1}>
                        <MuiLink
                            href="https://supabase.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="hover"
                            color={"secondary"}
                            pl={2}
                        >
                            Supabase Privacy Policy
                        </MuiLink>

                        <MuiLink
                            href="https://www.themoviedb.org/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="hover"
                            color={"secondary"}
                            pl={2}
                        >
                            TMDB Privacy Policy
                        </MuiLink>
                    </Stack>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        4. Managing Browser Storage
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        You can manage or delete cookies and browser storage
                        through your browser settings. Most browsers allow
                        you to block cookies, delete stored data, or receive
                        notifications when cookies are being stored.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Please note that clearing or restricting browser
                        storage may affect certain MSATracker features,
                        particularly authentication and account access.
                        You may need to sign in again after clearing your
                        stored authentication information.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        5. Changes to This Cookie Policy
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        We may update this Cookie Policy from time to time
                        to reflect changes in the application, the services
                        we use, or applicable legal requirements.
                        Any updates will be published on this page,
                        together with the revised update date.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        6. Contact
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        If you have any questions or concerns regarding this
                        Cookie Policy or our use of cookies and similar
                        technologies, please visit our{" "}
                        <MuiLink
                            component={RouterLink}
                            to="/contact"
                            underline="hover"
                            color="secondary"
                        >
                            Contact page
                        </MuiLink>.
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
}
