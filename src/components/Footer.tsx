import {Box, Divider, Link as MuiLink, Stack, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router";

interface FooterProps {
    brandName: string;
}

export function Footer({brandName}: FooterProps) {
    return (
        <>
            <Divider/>
            <Box px={{xs: 10}} py={{xs: 3}} bgcolor={"background.paper"}>
                <Stack direction={{xs: "column", md: "row"}} justifyContent={"space-between"} alignItems="center"
                       spacing={{xs: 5, sm: 3}}>
                    <Typography variant={"caption"} color={"textSecondary"}>© 2026 {brandName}. All rights reserved.</Typography>
                    <Stack spacing={{xs: 1, md: 6}}
                           alignItems={"center"}
                           direction={{xs: "column", md: "row"}}>
                        <MuiLink component={RouterLink} to={"about"} underline={"none"} variant={"caption"}
                                 color={"textSecondary"}>About</MuiLink>
                        <MuiLink component={RouterLink} to={"privacy-policy"} underline={"none"} variant={"caption"}
                                 color={"textSecondary"}>Privacy Policy</MuiLink>
                        <MuiLink component={RouterLink} to={"cookie-policy"} underline={"none"} variant={"caption"}
                                 color={"textSecondary"}>Cookie Policy</MuiLink>
                        <MuiLink component={RouterLink} to={""} underline={"none"} variant={"caption"}
                                 color={"textSecondary"}>Terms & Conditions</MuiLink>
                        <MuiLink component={RouterLink} to={""} underline={"none"} variant={"caption"}
                                 color={"textSecondary"}>Legal Notice</MuiLink>
                        <MuiLink component={RouterLink} to={"contact"} underline={"none"} variant={"caption"}
                                 color={"textSecondary"}>Contact</MuiLink>
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}