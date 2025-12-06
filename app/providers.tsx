"use client";

import { SessionProvider } from "next-auth/react";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { UserHeader } from "@/components/UserHeader";

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <FavoritesProvider>
        <UserHeader />
        {children}
      </FavoritesProvider>
    </SessionProvider>
  );
}
