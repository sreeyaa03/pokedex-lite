"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function UserHeader() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "rgba(0,0,0,0.12)" }}>
      <h1 className="text-xl font-bold">Pokedex Lite</h1>
      <div className="flex items-center gap-4">
        {session?.user ? (
          <>
            <span className="text-sm">{session.user.email || session.user.name}</span>
            <button
              className="px-3 py-1 border rounded text-sm hover:opacity-70 transition"
              onClick={() => signOut()}
              style={{ background: "var(--card-bg)", borderColor: "rgba(0,0,0,0.12)" }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            className="px-3 py-1 border rounded text-sm hover:opacity-70 transition"
            onClick={() => signIn()}
            style={{ background: "var(--card-bg)", borderColor: "rgba(0,0,0,0.12)" }}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
