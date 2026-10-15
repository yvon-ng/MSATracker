import {createContext} from 'react'
import type {User as SupabaseUser} from "@supabase/supabase-js";
import type {User} from "../model/user.ts";

export interface AuthContextType {
    supabaseUser: SupabaseUser | undefined
    loading: boolean;
    user: User | undefined
}

export const AuthContext = createContext<AuthContextType>({
    supabaseUser: undefined,
    loading: true,
    user: undefined,
})
