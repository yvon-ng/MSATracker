import {Card, CardHeader, Divider, IconButton, Tooltip} from "@mui/material";
import type {ReactNode} from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

interface PreferencesCardProps {
    title: string;
    subtitle: string;
    children?: ReactNode;
    showEditButton: boolean;
    isEditing?: boolean;
    isPending?: boolean;
    onEdit?: () => void;
    onCancel?: () => void;
}

export function PreferencesCard({
                                    title,
                                    subtitle,
                                    children,
                                    showEditButton,
                                    isEditing,
                                    isPending = false,
                                    onEdit,
                                    onCancel,
                                }: PreferencesCardProps) {
    return (
        <Card variant="outlined" sx={{flex: 1, height: "100%", borderRadius: 4}}>
            <CardHeader
                title={title}
                subheader={subtitle}
                action={
                    showEditButton && (
                        <Tooltip
                            placement="left"
                            arrow
                            title={
                                isEditing
                                    ? "Cancel editing"
                                    : "Edit personal information"
                            }
                        >
                            <IconButton
                                aria-label={
                                    isEditing
                                        ? "Cancel editing personal information"
                                        : "Edit personal information"
                                }
                                size="medium"
                                onClick={isEditing ? onCancel : onEdit}
                                disabled={isPending}
                                sx={{color: "text.secondary"}}
                            >
                                {isEditing ? (
                                    <CloseOutlinedIcon fontSize="medium"/>
                                ) : (
                                    <EditOutlinedIcon fontSize="medium"/>
                                )}
                            </IconButton>
                        </Tooltip>
                    )
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