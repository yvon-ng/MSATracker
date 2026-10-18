import {Avatar, type SxProps, type Theme} from "@mui/material";
import {useProfilePicture} from "../hooks/UseProfilePicture.ts";
import {UserAuth} from "../context/AuthContextProvider.tsx";
import PersonIcon from "@mui/icons-material/Person";

interface ProfileAvatarProps {
    size: number;
    sx?: SxProps<Theme>;
}

interface AvatarWithPicture {
    path: string;
    username: string
    size: number
    sx?: SxProps<Theme>;
}

function AvatarWithPicture({path, username, size, sx}: AvatarWithPicture) {
    const {profilePictureUrl} = useProfilePicture(path);

    return (
        <Avatar
            src={profilePictureUrl}
            alt={username}
            sx={{
                width: size,
                height: size,
                ...sx,
            }}
        />
    );
}

export function ProfileAvatar({size, sx}: ProfileAvatarProps) {
    const {user} = UserAuth();

    if (user?.profilePicture) {
        return (
            <AvatarWithPicture
                path={user.profilePicture}
                username={user.username}
                size={size}
                sx={sx}
            />
        );
    }

    return (
        <Avatar
            alt={user?.username ?? "Profile"}
            sx={{
                width: size,
                height: size,
                bgcolor: "background.default",
                color: "secondary.main",
                border: "2px solid",
                borderColor: "secondary.main",
            }}
        >
            <PersonIcon sx={{fontSize: size * 0.65}} color={"secondary"}/>
        </Avatar>
    );
}