"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ background: "var(--background)" }}
    >
      <div
        className="p-8 rounded-lg shadow-lg w-96"
        style={{ background: "var(--card-bg)", color: "var(--foreground)" }}
      >
        <h1 className="text-3xl font-bold mb-4 text-center">Pokedex Lite</h1>
        <p className="text-center mb-6">Sign in to access your favorites</p>

        <button
          className="w-full px-4 py-2 mb-3 border rounded transition hover:opacity-80"
          onClick={() => signIn("github")}
          style={{ background: "var(--card-bg)", borderColor: "rgba(0,0,0,0.12)" }}
        >
          Sign in with GitHub
        </button>

        <button
          className="w-full px-4 py-2 border rounded transition hover:opacity-80"
          onClick={() => signIn("google")}
          style={{ background: "var(--card-bg)", borderColor: "rgba(0,0,0,0.12)" }}
        >
          Sign in with Google
        </button>

        <p className="text-center text-sm mt-6">
          Or{" "}
          <button
            className="underline hover:opacity-70"
            onClick={() => router.push("/")}
          >
            continue as guest
          </button>
        </p>
      </div>
    </div>
  );
}
