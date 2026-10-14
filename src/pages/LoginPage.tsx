import {useState, type SubmitEvent} from "react";
import {useNavigate} from "react-router";
import {useLogIn} from "../hooks/useAuth.ts";
import {AuthLayout} from "../components/auth/AuthLayout.tsx";
import {AuthForm} from "../components/auth/AuthForm.tsx";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, isLoggingIn, error} = useLogIn();
    const navigate = useNavigate();

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        await login({email, password});
        navigate("/home", { replace: true });
    }

    return (
        <AuthLayout>
            <AuthForm
                title="Login to"
                subtitle="Welcome back! Sign in to continue."
                submitLabel="Login"
                loadingLabel="Logging in..."
                email={email}
                password={password}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onSubmit={handleSubmit}
                isLoading={isLoggingIn}
                error={error?.message}
                footerText="Don't have an account?"
                footerLinkText="Sign up"
                footerLinkTo="/signup"
            />
        </AuthLayout>
    );
}