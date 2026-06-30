"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { SiteContent } from "./types";

interface SiteContentContextValue {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
  refreshContent: () => Promise<void>;
  isLoading: boolean;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({
  initialContent,
  children,
}: {
  initialContent: SiteContent;
  children: ReactNode;
}) {
  const [content, setContent] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(false);

  const refreshContent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/content", { cache: "no-store" });
      if (response.ok) {
        const nextContent = (await response.json()) as SiteContent;
        setContent(nextContent);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SiteContentContext.Provider
      value={{
        content,
        setContent,
        refreshContent,
        isLoading,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const value = useContext(SiteContentContext);

  if (!value) {
    throw new Error("useSiteContent must be used within a SiteContentProvider");
  }

  return value;
}
