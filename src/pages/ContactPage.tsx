import {Button, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";

export function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");


    return (
        <Stack mt={{xs: 20}} mb={{xs: 10}} ml={{xs: 0, md: 8}} mr={{xs: 5, md: 8}} spacing={10}>
            <Typography variant={"h3"}>
                Contact Us
            </Typography>

            <Stack spacing={5}>
                <Stack direction={"row"} spacing={5} width={"100%"}>
                    <TextField required label="Name" variant="outlined" fullWidth value={name}
                               onChange={(e) => setName(e.target.value)} autoComplete="name"/>
                    <TextField required label="Email" variant="outlined" fullWidth value={email}
                               onChange={(e) => setEmail(e.target.value)} autoComplete="email"/>
                </Stack>

                <TextField required label="Subject" variant="outlined" value={subject}
                           onChange={(e) => setSubject(e.target.value)}/>
                <TextField required label="Your Message" variant="outlined" value={message}
                           onChange={(e) => setMessage(e.target.value)} multiline
                           rows={10} />
                <Button size={"large"} variant="contained" color="secondary"
                        sx={{display: "flex", width: 300, borderRadius: 2, alignSelf: "center"}}>
                    Send Message
                </Button>
            </Stack>
        </Stack>
    )
}