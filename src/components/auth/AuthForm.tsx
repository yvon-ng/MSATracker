import {
    Alert,
    Box,
    Button,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import type {SubmitEvent} from "react";
import {Link as RouterLink} from "react-router";
import {Link as MuiLink} from "@mui/material";

interface AuthFormProps {
    title: string;
    subtitle: string;
    submitLabel: string;
    loadingLabel: string;
    email: string;
    password: string;
    confirmPassword?: string;
    onConfirmPasswordChange?: (value: string) => void;
    onEmailChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
    isLoading: boolean;
    error?: string;
    footerText: string;
    footerLinkText: string;
    footerLinkTo: string;
    userName?: string;
    firstName?: string;
    lastName?: string;
    onUserNameChange?: (value: string) => void;
    onFirstNameChange?: (value: string) => void;
    onLastNameChange?: (value: string) => void;
    showSignUpFields?: boolean;
}

export function AuthForm({
                             title,
                             subtitle,
                             submitLabel,
                             loadingLabel,
                             email,
                             password,
                             confirmPassword = "",
                             onConfirmPasswordChange,
                             onEmailChange,
                             onPasswordChange,
                             onSubmit,
                             isLoading,
                             error,
                             footerText,
                             footerLinkText,
                             footerLinkTo,
                             userName = "",
                             firstName = "",
                             lastName = "",
                             onUserNameChange,
                             onFirstNameChange,
                             onLastNameChange,
                             showSignUpFields = false,
                         }: AuthFormProps) {
    return (
        <Stack component="form" onSubmit={onSubmit} spacing={4}>
            <Box>
                <Typography color={"textSecondary"} sx={{letterSpacing: '0.1em'}}>
                    {subtitle}
                </Typography>

                <Typography fontSize={{xs: "3rem", lg: "2.7rem", xl: "3rem"}} fontWeight={500}>
                    {title} msa
                    <Box component="span" color="secondary.main">
                        tracker
                    </Box>
                </Typography>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <Stack spacing={2}>
                {showSignUpFields && (
                    <>
                        <TextField
                            label="Username"
                            value={userName}
                            onChange={(event) =>
                                onUserNameChange?.(event.target.value)
                            }
                            autoComplete="username"
                            required
                            fullWidth
                        />

                        <TextField
                            label="First name"
                            value={firstName}
                            onChange={(event) =>
                                onFirstNameChange?.(event.target.value)
                            }
                            autoComplete="given-name"
                            fullWidth
                        />

                        <TextField
                            label="Last name"
                            value={lastName}
                            onChange={(event) =>
                                onLastNameChange?.(event.target.value)
                            }
                            autoComplete="family-name"
                            fullWidth
                        />
                    </>
                )}

                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(event) => onEmailChange(event.target.value)}
                    autoComplete="email"
                    required
                    fullWidth
                />

                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(event) => onPasswordChange(event.target.value)}
                    autoComplete={showSignUpFields ? "new-password" : "current-password"}
                    required
                    fullWidth
                />

                {showSignUpFields && (
                    <TextField
                        label="Confirm password"
                        type="password"
                        value={confirmPassword}
                        onChange={(event) =>
                            onConfirmPasswordChange?.(event.target.value)
                        }
                        autoComplete="new-password"
                        error={confirmPassword.length > 0 && password !== confirmPassword}
                        helperText={confirmPassword.length > 0 && password !== confirmPassword ? "Passwords do not match" : ""}
                        required
                        fullWidth
                    />
                )}

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isLoading || (showSignUpFields && password !== confirmPassword)}
                    fullWidth
                >
                    {isLoading ? loadingLabel : submitLabel}
                </Button>
            </Stack>

            <Typography variant="body2" textAlign="center" color={"textSecondary"} sx={{letterSpacing: '0.1em'}}>
                {footerText}{" "}
                <MuiLink
                    component={RouterLink}
                    to={footerLinkTo}
                    onClick={() => console.log("Footer link clicked:", footerLinkTo)}

                    underline="none"
                    sx={{
                        color: "secondary.main",
                        "&:hover": {
                            textDecoration: "underline",
                        },
                    }}
                >
                    {footerLinkText}
                </MuiLink>
            </Typography>
        </Stack>
    );
}