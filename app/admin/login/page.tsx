"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole, AlertCircle, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        const from = searchParams.get("from") || "/admin";
        router.push(from);
      } else {
        setError(data.message || "Authentification échouée.");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-[#c85a3a] mb-4">
            <LockKeyhole className="w-8 h-8 text-[#c85a3a]" strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-3xl text-[#f7efe2] mb-2">
            Admin Portfolio
          </h1>
          <p className="font-mono text-sm text-white/50">
            Accès Restreint
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="border border-white/10 bg-white/5 backdrop-blur-sm"
        >
          <div className="p-6 space-y-6">
            {error && (
              <div className="flex items-start gap-3 border border-red-500/30 bg-red-500/10 p-4">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="password"
                className="block font-mono text-sm text-[#f7efe2] mb-2"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-white/20 text-[#f7efe2] font-mono text-sm focus:border-[#c85a3a] focus:outline-none transition-colors"
                placeholder="••••••••"
                required
                autoFocus
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-[#c85a3a] hover:bg-[#d16b4a] disabled:bg-[#c85a3a]/50 text-[#f7efe2] font-mono text-sm transition-colors flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                "Vérification..."
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-center mt-6 font-mono text-xs text-white/30">
          Toutes les tentatives sont enregistrées
        </p>
      </div>
    </div>
  );
}
