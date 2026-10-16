import {Card, CardHeader, Divider} from "@mui/material";
import type {ReactNode} from "react";

interface PreferencesCardProps {
    title: string;
    subtitle: string;
    headerActionButton?: ReactNode;
    children?: ReactNode;
}

export function PreferencesCard({title, subtitle, headerActionButton, children}: PreferencesCardProps) {
    return (
        <Card variant="outlined" sx={{flex: 1, height: "100%", borderRadius: 4}}>
            <CardHeader
                title={title}
                subheader={subtitle}
                action={
                    headerActionButton
                }
                sx={{
                    p: 5,
                    "& .MuiCardHeader-title": {
                        lineHeight: 1.4,
                    },
                    "& .MuiCardHeader-subheader": {
                        lineHeight: 1.2,
                    },
                }}
                slotProps={{
                    title: {variant: "h6"},
                    subheader: {variant: "body2"},
                }}
            />
            <Divider/>
            {children}
        </Card>
    )
}