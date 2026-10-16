import {useState, type SubmitEvent} from "react";
import {useNavigate} from "react-router";
import {useSignUp} from "../hooks/useAuth.ts";
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

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        if (password !== confirmPassword) {
            return;
        }

        await signUp({
            email: email.trim(),
            password: password,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            userName: userName.trim(),
        });
        navigate("/login", {
            state: { signupSuccess: true }, //is used for the snackbar
        });
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
                error={error?.message}
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