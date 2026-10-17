export type User = {
    userId: string;
    username: string,
    email: string,
    firstName: string | null,
    lastName: string | null,
    profilePicture: string | null
}

export type UpdateUserDto = Partial <Omit<User, "userId" | "username" | "email"| "profilePicture">>;
