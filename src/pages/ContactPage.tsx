import {Box, Divider, Stack, Typography} from "@mui/material";
import {Link as MuiLink} from "@mui/material";
import {ContactFormFields} from "../components/ContactFormFields.tsx";

export function ContactPage() {
    return (
        <Stack mt={{xs: 16}} mb={{xs: 10}} ml={{xs: 5, md: 8}} mr={{xs: 5, md: 8}} spacing={8}>
            <Stack spacing={3}>
                <Typography variant={"h3"}>
                    Contact{" "}
                    <Box component="span" color="secondary.main">
                        Us
                    </Box>
                </Typography>
                <Typography variant="body1" color="text.secondary" maxWidth={800}>
                    For general enquiries, feedback, technical support, or legal matters,
                    please use the contact form below. All enquiries are welcome and will
                    be reviewed as soon as possible. Alternatively, you may also reach out
                    through my {" "}
                    <MuiLink
                        href="https://www.linkedin.com/in/mark-ng-03980b1b1"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="secondary"
                        underline="hover"
                    >
                        LinkedIn
                    </MuiLink>
                    {" "}or{" "}
                    <MuiLink
                        href="https://github.com/yvon-ng"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="secondary"
                        underline="hover"
                    >
                        GitHub
                    </MuiLink>
                    {" "}profiles.
                </Typography>
            </Stack>

            <Divider/>

            <ContactFormFields/>
        </Stack>
    )
}