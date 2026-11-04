import {useState} from "react";
import {Button, Stack, TextField} from "@mui/material";

export function ContactFormFields() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    return (
        <Stack spacing={5} width={{md: "70%", lg: "50%"}}>
            <Stack direction={{xs: "column", md: "row"}} spacing={5} width={"100%"}>
                <TextField
                    required
                    label="Name"
                    placeholder=""
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                />

                <TextField
                    required
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                />
            </Stack>

            <TextField
                required
                label="Subject"
                variant="outlined"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />

            <TextField
                required
                label="Your Message"
                variant="outlined"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                multiline
                rows={10}
            />

            <Button
                size={"large"}
                variant="contained"
                color="secondary"
                fullWidth
                sx={{
                    display: "flex",
                    width: {sm: 200},
                    borderRadius: 2,
                    alignSelf: "end"
                }}
            >
                Send Message
            </Button>
        </Stack>
    )
}