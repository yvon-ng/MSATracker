import {Outlet, useNavigate} from "react-router";
import {Box, Typography} from "@mui/material";
import {Footer} from "../components/Footer.tsx";

export default function PublicLayout() {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate("/home")
    }

    return (
        <Box position={"relative"}>
            <Box position="fixed" top={30} left={50} zIndex={10}>
                <Typography variant="h5" noWrap fontWeight={600} onClick={handleLogoClick} sx={{cursor: "pointer"}}>
                    msa
                    <Box component={"span"} color={"secondary.main"}>
                        tracker
                    </Box>
                </Typography>
            </Box>
            <Outlet/>
            <Footer brandName={"msatracker"}/>
        </Box>
    );
}