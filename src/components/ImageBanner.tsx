import {Box, Stack, Typography} from "@mui/material";

export function ImageBanner() {
    return (
        <Box position={"relative"}>
            <Box component={"img"}
                 src={"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5298bac0-b8bf-4c80-af67-725c1272dbb0/dho2sqp-d53a95e0-f4ed-47f5-90d9-6aee4e9ce9ba.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi81Mjk4YmFjMC1iOGJmLTRjODAtYWY2Ny03MjVjMTI3MmRiYjAvZGhvMnNxcC1kNTNhOTVlMC1mNGVkLTQ3ZjUtOTBkOS02YWVlNGU5Y2U5YmEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.oGsr-C0uvEv4d7hYX0vDd8gq1xFLGLcWj115LL-CRdM"}
                 alt={"Banner"}
                 width={"100%"} display={"block"} height={450}
                 sx={{
                     objectFit: "cover",
                     objectPosition: "center 10%",
                 }}
            />

            <Box
                position="absolute"
                top={0}
                right={0}
                bottom={0}
                left={0}
                sx={{
                    background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.85))",
                }}
            />

            <Box position="absolute" display="flex" alignItems="center" justifyContent="center" sx={{inset: 0}}>
                <Stack alignItems={"center"}>
                    <Typography variant={"h2"} fontWeight={500}>
                        What is{" "}
                        <Box component="span" whiteSpace="nowrap" fontWeight={600}>
                            msa
                            <Box component={"span"} color={"secondary.main"}>
                                tracker
                            </Box>
                        </Box>
                    </Typography>
                </Stack>
            </Box>
        </Box>
    )
}