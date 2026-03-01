"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import type { User, UserRole, LoginRequest, RegisterRequest } from "@/types";
import { authApi } from "@/lib/api/auth";
import { usersApi } from "@/lib/api/users";

interface AuthUser {
  userId: string;
  email: string;
  fullName: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  fullUser: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface JwtPayload {
  // Registered JWT claims
  sub?: string;
  email?: string;
  exp: number;
  // Short-form mapped claims (.NET OutboundClaimTypeMap)
  role?: string;
  unique_name?: string;
  nameid?: string;
  // Custom claims matching original frontend expectations
  UserID?: string;
  FullName?: string;
  // Allow .NET full URI claim keys as fallback
  [key: string]: unknown;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [fullUser, setFullUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const parseToken = useCallback((token: string): AuthUser | null => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        return null;
      }

      // Handle .NET claim types: ClaimTypes.Role may appear as "role",
      // or as the full URI if OutboundClaimTypeMap is not applied
      const role = (decoded.role ||
        decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ]) as string | undefined;

      const fullName = (decoded.FullName ||
        decoded.unique_name ||
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ]) as string | undefined;

      const userId = (decoded.UserID ||
        decoded.sub ||
        decoded.nameid ||
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ]) as string | undefined;

      return {
        userId: userId || "",
        email: decoded.email || "",
        fullName: fullName || "",
        role: (role?.toLowerCase() as UserRole) || "customer",
      };
    } catch {
      return null;
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const res = await usersApi.getMe();
      setFullUser(res.data);
    } catch {
      // silent fail
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const parsed = parseToken(token);
      setUser(parsed);
      if (parsed) {
        refreshUser();
      }
    }
    setIsLoading(false);
  }, [parseToken, refreshUser]);

  const login = async (data: LoginRequest) => {
    const res = await authApi.login(data);
    const { token } = res.data;
    localStorage.setItem("token", token);
    const parsed = parseToken(token);
    setUser(parsed);
    if (parsed) {
      await refreshUser();
    }
  };

  const register = async (data: RegisterRequest) => {
    await authApi.register(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setFullUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        fullUser,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
