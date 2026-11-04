import {Box, Button, Divider, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {Link as MuiLink} from "@mui/material";


export function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");


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

            <Stack spacing={5} width={{md: "70%", lg: "50%"}}>
                <Stack direction={{xs: "column", md: "row"}} spacing={5} width={"100%"}>
                    <TextField required label="Name" variant="outlined" fullWidth value={name}
                               onChange={(e) => setName(e.target.value)} autoComplete="name"/>
                    <TextField required label="Email" variant="outlined" fullWidth value={email}
                               onChange={(e) => setEmail(e.target.value)} autoComplete="email"/>
                </Stack>

                <TextField required label="Subject" variant="outlined" value={subject}
                           onChange={(e) => setSubject(e.target.value)}/>
                <TextField required label="Your Message" variant="outlined" value={message}
                           onChange={(e) => setMessage(e.target.value)} multiline
                           rows={10}/>

                <Button size={"large"} variant="contained" color="secondary"
                        fullWidth
                        sx={{display: "flex", width: {sm: 200}, borderRadius: 2, alignSelf: "end"}}>
                    Send Message
                </Button>
            </Stack>
        </Stack>
    )
}