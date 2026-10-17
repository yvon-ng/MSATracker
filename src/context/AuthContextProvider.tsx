import {type ReactNode, useContext, useEffect, useState} from "react";
import { AuthContext } from "./AuthContext.ts";
import {supabase} from "../lib/supabaseClient.ts";
import type {User as SupabaseUser} from "@supabase/supabase-js";
import type { User } from "../model/User.ts";

interface UserContextProviderProps {
    children: ReactNode
}

export const AuthContextProvider = ({children}: UserContextProviderProps) => {
    const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        let isMounted = true;

        // Listen for login, logout, and session changes.
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (isMounted) {
                setSupabaseUser(session?.user);
                setLoading(false);
            }
        });

        // Restore an existing session on initial app load.
        supabase.auth.getSession().then(({ data, error }) => {
            if (isMounted) {
                if (error) {
                    setSupabaseUser(undefined);
                } else {
                    setSupabaseUser(data.session?.user);
                }
                setLoading(false);
            }
        });

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);

    // Fetch the public profile when the authenticated user changes.
    useEffect(() => {
        let cancelled = false;

        async function fetchProfile() {
            if (!supabaseUser) {
                setUser(undefined);
                return;
            }

            const { data, error } = await supabase
                .from("users")
                .select("user_id, username, first_name, last_name, email, profile_picture")
                .eq("user_id", supabaseUser.id)
                .maybeSingle();

            if (cancelled) return;

            if (error) {
                console.error("Failed to fetch profile:", error.message);
                setUser(undefined);
                return;
            }
            
            if (!data) {
                setUser(undefined);
                return;
            }

            setUser({
                userId: data.user_id,
                username: data.username,
                firstName: data.first_name,
                lastName: data.last_name,
                email: data.email,
                profilePicture: data.profile_picture
            });
        }

        void fetchProfile();

        return () => {
            cancelled = true;
        };
    }, [supabaseUser]);

    return (
        <AuthContext.Provider value={{supabaseUser, loading, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}