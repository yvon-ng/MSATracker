import {createContext} from 'react'
import type {User as SupabaseUser} from "@supabase/supabase-js";

export interface AuthContextType {
    user: SupabaseUser | undefined
    loading: boolean;

}

export const AuthContext = createContext<AuthContextType>({
    user: undefined,
    loading: true,
})
