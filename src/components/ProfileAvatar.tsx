import {Avatar} from "@mui/material";
import {useProfilePicture} from "../hooks/UseProfilePicture.ts";
import {UserAuth} from "../context/AuthContextProvider.tsx";
import PersonIcon from "@mui/icons-material/Person";

interface ProfileAvatarProps {
    size: number;
}

interface AvatarWithPicture {
    path: string;
    username: string
    size: number
}

function AvatarWithPicture({path, username, size,}: AvatarWithPicture) {
    const {profilePictureUrl} = useProfilePicture(path);

    return (
        <Avatar
            src={profilePictureUrl}
            alt={username}
            sx={{
                width: size,
                height: size,
                bgcolor: "background.default",
                color: "secondary.main",
                borderColor: "secondary",
                border: "1px solid"
            }}
        />
    );
}

export function ProfileAvatar({size}: ProfileAvatarProps) {
    const {user} = UserAuth();

    if (user?.profilePicture) {
        return (
            <AvatarWithPicture
                path={user.profilePicture}
                username={user.username}
                size={size}
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
                borderColor: "secondary",
                border: "1px solid",
            }}
        >
            <PersonIcon sx={{ fontSize: size * 0.65 }} />
        </Avatar>
    );
}