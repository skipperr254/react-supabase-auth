import { supabase } from "@/utils/supabase";
import type { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextTypes = {
    user: User | null;
    loading: boolean;
    handleSignOut: () => void;
}

const AuthContext = createContext<AuthContextTypes | undefined>(undefined)

export default function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
      // Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });
  
      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });
  
      return () => subscription.unsubscribe();
    }, []);
  
    const handleSignOut = async () => {
      await supabase.auth.signOut();
      navigate("/");
    };

    const value = {
        user, loading, handleSignOut
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}