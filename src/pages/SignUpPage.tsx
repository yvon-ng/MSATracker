import {useState, type SubmitEvent} from "react";
import {useNavigate} from "react-router";
import {useSignUp} from "../hooks/UseAuth.ts";
import {AuthLayout} from "../components/auth/AuthLayout.tsx";
import {AuthForm} from "../components/auth/AuthForm.tsx";

export function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userName, setUserName] = useState("");
    const {signUp, isSigningUp, error} = useSignUp();
    const navigate = useNavigate();

    const usernameError = error?.message === "USERNAME_TAKEN" ? "This username is already taken." : undefined;

    const formError = error && !usernameError ? error.message : undefined;

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        if (password !== confirmPassword) {
            return;
        }

        try {
            await signUp({
                email: email.trim(),
                password,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                userName: userName.trim(),
            });

            navigate("/login", {
                state: { signupSuccess: true }, //is used for the snackbar
            });
        } catch {
            // The error is handled by React Query and displayed in the form.
        }
    }

    return (
        <AuthLayout>
            <AuthForm
                title="Create your"
                subtitle="Join msatracker and start building your library."
                submitLabel="Sign up"
                loadingLabel="Creating account..."
                email={email}
                password={password}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onSubmit={handleSubmit}
                isLoading={isSigningUp}
                error={formError}
                usernameError={usernameError}
                footerText="Already have an account?"
                footerLinkText="Login"
                footerLinkTo="/login"
                showSignUpFields
                userName={userName}
                firstName={firstName}
                lastName={lastName}
                onUserNameChange={setUserName}
                onFirstNameChange={setFirstName}
                onLastNameChange={setLastName}
                confirmPassword={confirmPassword}
                onConfirmPasswordChange={setConfirmPassword}
            />
        </AuthLayout>
    );
}