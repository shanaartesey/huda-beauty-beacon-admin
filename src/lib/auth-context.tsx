
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { User } from "./types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("hudaBeautyUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("hudaBeautyUser");
      }
    }
  }, []);

  const isAuthenticated = !!user;

  const login = (email: string, password: string) => {
    // In a real app, you would validate against a backend API
    // For demo, we'll use a hardcoded admin account
    if (email === "admin@hudabeauty.com" && password === "admin123") {
      const userData: User = {
        id: "1",
        email: email,
        role: "admin"
      };
      
      setUser(userData);
      localStorage.setItem("hudaBeautyUser", JSON.stringify(userData));
      
      toast({
        title: "Login successful",
        description: "Welcome back, admin!",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("hudaBeautyUser");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
