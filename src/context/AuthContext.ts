import {createContext} from 'react'
import type {User as SupabaseUser} from "@supabase/supabase-js";
import type {User} from "../model/User.ts";

export interface AuthContextType {
    supabaseUser: SupabaseUser | undefined
    loading: boolean;
    user: User | undefined
    setUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType>({
    supabaseUser: undefined,
    loading: true,
    user: undefined,
    setUser: () => {},
})
