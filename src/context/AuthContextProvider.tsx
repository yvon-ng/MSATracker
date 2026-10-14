import {type ReactNode, useEffect, useState} from "react";
import { AuthContext } from "./AuthContext.ts";
import {supabase} from "../lib/supabaseClient.ts";
import type {User} from "@supabase/supabase-js";

interface UserContextProviderProps {
    children: ReactNode
}

export const AuthContextProvider = ({children}: UserContextProviderProps) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        // Listen for login, logout, and session changes.
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (isMounted) {
                setUser(session?.user);
                setLoading(false);
            }
        });

        // Restore an existing session on initial app load.
        supabase.auth.getSession().then(({ data, error }) => {
            if (isMounted) {
                if (error) {
                    setUser(undefined);
                } else {
                    setUser(data.session?.user);
                }
                setLoading(false);
            }
        });

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{user, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

// export const UserAuth = () => { TODO
//     return useContext(AuthContext);
// }