import {Divider, Link as MuiLink, Stack, Typography, Box} from "@mui/material";
import {Link as RouterLink} from "react-router";

export function PrivacyPolicyPage() {
    return (
        <Stack
            mt={{xs: 12, md: 16}}
            mb={{xs: 10}}
            mx={{xs: 5, md: 8}}
            spacing={5}
        >
            <Stack spacing={2}>
                <Typography variant="h3">
                    Privacy{" "}
                    <Box component="span" color="secondary.main">
                        policy
                    </Box>
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Last updated: 4 November 2026
                </Typography>

                <Typography variant="body1" color="text.secondary" maxWidth={850}>
                    Welcome to MSATracker ("we", "our", or "the application").
                    This Privacy Policy explains what personal information we collect, how it is used, how it is stored,
                    and what rights you have regarding your personal information. We are committed to respecting your
                    privacy and handling your information responsibly in accordance with applicable data protection
                    laws, including the GDPR.
                </Typography>
            </Stack>

            <Divider/>

            <Stack spacing={5} maxWidth={900}>
                <Stack spacing={2}>
                    <Typography variant="h5">
                        1. Information We Collect
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        When you use MSATracker, we may collect and process
                        the following categories of information:
                    </Typography>

                    <Typography variant="subtitle1" fontWeight={600}>
                        1.1 Account Information
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        When you create an account, we collect information such as:
                    </Typography>

                    <Box>
                        <Typography variant="body1" color="text.secondary">
                            - Email address
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            - Username
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            - First and last name, where provided
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            - Authentication information required to manage your account
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            - Profile picture, if you choose to upload one
                        </Typography>
                    </Box>

                    <Typography variant="body1" color="text.secondary">
                        This information is used to create and maintain your
                        account and provide access to the application's features.
                    </Typography>

                    <Typography variant="subtitle1" fontWeight={600}>
                        1.2 Media and Activity Information
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        When you use MSATracker to manage your media collection,
                        we store information associated with your account, including:
                    </Typography>

                    <Box>
                        <Typography variant="body1" color="text.secondary">
                            - Movies, television series, and anime added to your collection
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            - Your watchlist and viewing status
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            - Dates associated with adding, starting, or completing a title
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            - Other media-related preferences and information you provide
                        </Typography>
                    </Box>

                    <Typography variant="body1" color="text.secondary">
                        This information allows MSATracker to maintain your
                        personal media collection and display your viewing progress.
                    </Typography>

                    <Typography variant="subtitle1" fontWeight={600}>
                        1.3 Technical Information
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        When you access MSATracker, certain technical information
                        may be processed by the application and its service
                        providers. This may include information necessary to
                        establish connections, authenticate users, and maintain
                        the security and functionality of the service.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        2. How We Use Your Information
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        We use the information collected for the following purposes:
                    </Typography>

                    <Box>
                        <Typography variant="body1" color="text.secondary">
                            - <strong>Account management:</strong> To create,
                            authenticate, and maintain user accounts.
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            - <strong>Application functionality:</strong> To
                            provide the features and services offered by MSATracker.
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            - <strong>Media tracking:</strong> To store and
                            display your personal media collection and viewing progress.
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            - <strong>Profile management:</strong> To allow you
                            to manage your account details and profile picture.
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            - <strong>Security:</strong> To help protect accounts
                            and maintain the integrity of the application.
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            - <strong>Service improvements:</strong> To maintain
                            and improve the application's functionality and user experience.
                        </Typography>
                    </Box>

                    <Typography variant="body1" color="text.secondary">
                        We do not intentionally use your personal information
                        for advertising purposes.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        3. Third-Party Services
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        MSATracker relies on third-party services to provide
                        certain application features. These services may
                        process information in accordance with their own
                        privacy policies.
                    </Typography>

                    <Typography variant="subtitle1" fontWeight={600}>
                        3.1 Supabase
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        MSATracker uses Supabase for authentication, database
                        functionality, and account management.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Supabase processes and stores information such as
                        account details, authentication information, profile
                        information, and media tracking data.
                        Authentication session information is stored in
                        your browser's local storage to maintain your
                        signed-in session.
                    </Typography>

                    <MuiLink
                        href="https://supabase.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="secondary"
                        underline="hover"
                        sx={{alignSelf: "flex-start"}}
                    >
                        Supabase Privacy Policy
                    </MuiLink>

                    <Typography variant="subtitle1" fontWeight={600}>
                        3.2 The Movie Database (TMDB)
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        MSATracker uses The Movie Database (TMDB) API to
                        retrieve movie and television series information,
                        including titles, descriptions, posters, backdrops,
                        genres, and release dates.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Search queries and API requests are sent to TMDB
                        to retrieve the requested media information.
                        Media information and images are provided by TMDB
                        and remain the property of their respective owners.
                    </Typography>

                    <MuiLink
                        href="https://www.themoviedb.org/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="secondary"
                        underline="hover"
                        sx={{alignSelf: "flex-start"}}
                    >
                        TMDB Privacy Policy
                    </MuiLink>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        4. Data Storage and Security
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Your account information and media tracking data
                        are stored using Supabase.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        We rely on appropriate technical and organizational
                        measures provided by our infrastructure and service
                        providers to help protect personal information against
                        unauthorized access, alteration, disclosure, or destruction.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Authentication and access controls are used to help
                        ensure that users can access their own account information.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        However, no method of electronic storage or transmission
                        over the internet can be guaranteed to be completely secure.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        5. Data Retention and Account Deletion
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        We retain personal information for as long as necessary
                        to provide the application's services and fulfil the
                        purposes described in this Privacy Policy.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        If you choose to delete your account, your associated
                        personal information and media tracking data will be
                        handled in accordance with the applicable deletion
                        process and legal requirements.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Certain information may need to be retained where
                        required by law or for legitimate security purposes.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        6. Your Privacy Rights
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Under the General Data Protection Regulation (GDPR),
                        you may have the following rights regarding your
                        personal information:
                    </Typography>

                    <Box>
                        <Typography variant="body1" color="text.secondary">
                            - <strong>Right of access:</strong> Request access
                            to the personal information we hold about you.
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            - <strong>Right to rectification:</strong> Request
                            correction of inaccurate or incomplete information.
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            - <strong>Right to erasure:</strong> Request deletion
                            of your personal information, subject to applicable
                            legal requirements.
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            - <strong>Right to restriction:</strong> Request
                            that processing of your personal information be
                            restricted in certain circumstances.
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            - <strong>Right to data portability:</strong> Request
                            a copy of your personal information in a commonly
                            used, machine-readable format, where applicable.
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            - <strong>Right to object:</strong> Object to certain
                            types of processing in circumstances provided by the GDPR.
                        </Typography>
                    </Box>

                    <Typography variant="body1" color="text.secondary">
                        To exercise these rights, please contact us through
                        our{" "}
                        <MuiLink
                            component={RouterLink}
                            to="/contact"
                            color="secondary"
                            underline="hover"
                        >
                            Contact page
                        </MuiLink>.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        You also have the right to lodge a complaint with a
                        data protection supervisory authority. In Belgium,
                        this is the{" "}
                        <MuiLink
                            href="https://www.dataprotectionauthority.be/"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="secondary"
                            underline="hover"
                        >
                            Belgian Data Protection Authority
                        </MuiLink>.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        7. Cookies and Similar Technologies
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        MSATracker uses browser storage technologies to
                        support essential application functionality,
                        including authentication and session management.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        For more information about cookies, local storage,
                        and similar technologies, please consult our{" "}
                        <MuiLink
                            component={RouterLink}
                            to="/cookie-policy"
                            color="secondary"
                            underline="hover"
                        >
                            Cookie Policy
                        </MuiLink>.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        8. Children's Privacy
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        MSATracker is not specifically directed at children.
                        We do not knowingly collect personal information
                        from children in violation of applicable data
                        protection laws.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        If you believe that a child has provided personal
                        information inappropriately, please contact us so
                        that the matter can be reviewed.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        9. Changes to This Privacy Policy
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        We may update this Privacy Policy from time to time
                        to reflect changes in the application, the services
                        we use, or applicable legal requirements.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Any updates will be published on this page,
                        together with the revised update date.
                    </Typography>
                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h5">
                        10. Contact
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        If you have any questions, concerns, or requests
                        regarding this Privacy Policy or the processing
                        of your personal information, please contact us
                        through our{" "}
                        <MuiLink
                            component={RouterLink}
                            to="/contact"
                            color="secondary"
                            underline="hover"
                        >
                            Contact page
                        </MuiLink>.
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
}
