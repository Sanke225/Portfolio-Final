"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  FileText,
  Image as ImageIcon,
  LockKeyhole,
  LogOut,
  Plus,
  Save,
  Settings2,
  Shield,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";
import { useSiteContent } from "@/lib/site-content/context";
import { sectionIconMap } from "@/lib/site-content/icons";
import type { IconKey, ProjectItem, SiteContent } from "@/lib/site-content/types";
import type { FormEvent, ReactNode } from "react";

type SectionKey = keyof SiteContent;

const sectionTabs: Array<{ key: SectionKey; label: string; short: string }> = [
  { key: "hero", label: "Hero", short: "01" },
  { key: "about", label: "About", short: "02" },
  { key: "skills", label: "Skills", short: "03" },
  { key: "services", label: "Services", short: "04" },
  { key: "projects", label: "Projets", short: "05" },
  { key: "contact", label: "Contact", short: "06" },
];

const iconOptions: IconKey[] = [
  "Code",
  "Server",
  "Brain",
  "Palette",
  "Globe",
  "Layers",
  "Zap",
  "Smartphone",
];

function cloneContent(content: SiteContent): SiteContent {
  return JSON.parse(JSON.stringify(content)) as SiteContent;
}

function splitList(value: string) {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function joinList(values: string[]) {
  return values.join("\n");
}

function createProject(nextId: number): ProjectItem {
  return {
    id: nextId,
    title: "Nouveau projet",
    description: "Décris le projet ici.",
    tags: ["Next.js", "TypeScript"],
    image: {
      src: "/placeholder-portfolio.svg",
      alt: "Aperçu du projet",
      gradient: "from-slate-500 to-slate-700",
    },
    links: {
      github: "https://github.com/",
    },
    inDevelopment: true,
  };
}

function Panel({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`border border-white/10 bg-white/5 backdrop-blur-sm ${className}`}>
      <div className="border-b border-white/10 px-5 py-4">
        <h3 className="font-serif text-xl text-[#f7efe2]">{title}</h3>
        {subtitle ? (
          <p className="mt-1 text-sm text-white/55">{subtitle}</p>
        ) : null}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function FieldLabel({
  label,
  hint,
}: {
  label: string;
  hint?: string;
}) {
  return (
    <div className="mb-2 flex items-end justify-between gap-3">
      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
        {label}
      </label>
      {hint ? <span className="text-[11px] text-white/35">{hint}</span> : null}
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  hint,
  placeholder,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <FieldLabel label={label} hint={hint} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border border-white/10 bg-[#101014] px-4 py-3 text-sm text-[#f5ede3] outline-none transition focus:border-[#d7b26d]"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  hint,
  rows = 4,
  placeholder,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  rows?: number;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <FieldLabel label={label} hint={hint} />
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border border-white/10 bg-[#101014] px-4 py-3 text-sm text-[#f5ede3] outline-none transition focus:border-[#d7b26d]"
      />
    </div>
  );
}

function MiniTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/70">
      {children}
    </span>
  );
}

function PreviewCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border border-white/10 bg-[#111116] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
          {title}
        </h4>
        <Eye className="h-4 w-4 text-[#d7b26d]" />
      </div>
      {children}
    </div>
  );
}

export default function PortfolioAdmin() {
  const { content: liveContent, setContent: setLiveContent } = useSiteContent();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [password, setPassword] = useState("");
  const [draft, setDraft] = useState<SiteContent>(() => cloneContent(liveContent));
  const [activeSection, setActiveSection] = useState<SectionKey>("hero");
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusTone, setStatusTone] = useState<"success" | "error" | "neutral">("neutral");
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        const response = await fetch("/api/admin/session", { cache: "no-store" });
        const payload = (await response.json()) as { authenticated: boolean };

        if (mounted) {
          setIsAuthenticated(payload.authenticated);
        }
      } catch {
        if (mounted) {
          setIsAuthenticated(false);
        }
      } finally {
        if (mounted) {
          setIsCheckingSession(false);
        }
      }
    }

    void checkSession();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!statusMessage) {
      return;
    }

    const timer = window.setTimeout(() => setStatusMessage(null), 4500);
    return () => window.clearTimeout(timer);
  }, [statusMessage]);

  const previewKey = useMemo(() => activeSection, [activeSection]);

  const updateSection = <K extends SectionKey>(section: K, updater: (current: SiteContent[K]) => SiteContent[K]) => {
    setDraft((current) => ({
      ...current,
      [section]: updater(current[section]),
    }));
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error("Mot de passe invalide.");
      }

      setIsAuthenticated(true);
      setPassword("");
      setStatusTone("success");
      setStatusMessage("Connexion admin réussie.");
    } catch (error) {
      setStatusTone("error");
      setStatusMessage(error instanceof Error ? error.message : "Connexion impossible.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
    setStatusTone("neutral");
    setStatusMessage("Déconnexion effectuée.");
  };

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMessage(null);

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(draft),
      });

      if (!response.ok) {
        throw new Error("Impossible d'enregistrer le contenu.");
      }

      const payload = (await response.json()) as { content: SiteContent };
      setDraft(payload.content);
      setLiveContent(payload.content);
      setStatusTone("success");
      setStatusMessage("Contenu publié avec succès.");
    } catch (error) {
      setStatusTone("error");
      setStatusMessage(error instanceof Error ? error.message : "Erreur lors de la sauvegarde.");
    } finally {
      setIsSaving(false);
    }
  };

  const uploadImage = async (file: File, index: number) => {
    setUploadingIndex(index);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload impossible.");
      }

      const payload = (await response.json()) as { url: string };

      updateSection("projects", (section) => ({
        ...section,
        items: section.items.map((project, projectIndex) =>
          projectIndex === index
            ? {
                ...project,
                image: {
                  ...project.image,
                  src: payload.url,
                },
              }
            : project,
        ),
      }));

      setStatusTone("success");
      setStatusMessage("Image uploadée avec succès.");
    } catch (error) {
      setStatusTone("error");
      setStatusMessage(error instanceof Error ? error.message : "Upload impossible.");
    } finally {
      setUploadingIndex(null);
    }
  };

  const ActiveIcon = sectionIconMap[{
    hero: "Code",
    about: "Palette",
    skills: "Brain",
    services: "Layers",
    projects: "Globe",
    contact: "Smartphone",
  }[previewKey]];

  if (isCheckingSession) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#09090b] px-6 py-20 text-[#f5ede3]">
        <div className="mx-auto max-w-3xl">
          <Panel title="Chargement" subtitle="Vérification de la session admin...">
            <div className="flex items-center gap-3 text-white/70">
              <Sparkles className="h-5 w-5 animate-pulse text-[#d7b26d]" />
              <span>Préparation de l&apos;interface admin.</span>
            </div>
          </Panel>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#09090b] px-6 py-20 text-[#f5ede3]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px] opacity-60" />
        <div className="absolute left-[-10%] top-[-10%] h-80 w-80 rounded-full bg-[#d7b26d]/10 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] h-80 w-80 rounded-full bg-[#6cb3ff]/10 blur-3xl" />

        <div className="relative mx-auto flex max-w-5xl items-center justify-center">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              <MiniTag>Portfolio Admin</MiniTag>
              <h1 className="max-w-2xl font-serif text-5xl leading-[0.95] text-[#f7efe2] md:text-7xl">
                Un tableau de bord pour modifier le portfolio sans toucher au code.
              </h1>
              <p className="max-w-xl text-base leading-7 text-white/65 md:text-lg">
                Connecte-toi pour éditer les textes, les projets, les images et prévisualiser
                les changements avant publication.
              </p>

              {statusMessage ? (
                <div
                  className={`inline-flex items-center gap-2 border px-4 py-3 text-sm ${
                    statusTone === "success"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                      : "border-red-500/30 bg-red-500/10 text-red-200"
                  }`}
                >
                  {statusTone === "success" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  {statusMessage}
                </div>
              ) : null}

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="border border-white/10 bg-white/5 p-4">
                  <Shield className="mb-3 h-5 w-5 text-[#d7b26d]" />
                  <p className="text-sm text-white/65">Authentification protégée</p>
                </div>
                <div className="border border-white/10 bg-white/5 p-4">
                  <ImageIcon className="mb-3 h-5 w-5 text-[#d7b26d]" />
                  <p className="text-sm text-white/65">Upload d&apos;images intégré</p>
                </div>
                <div className="border border-white/10 bg-white/5 p-4">
                  <Eye className="mb-3 h-5 w-5 text-[#d7b26d]" />
                  <p className="text-sm text-white/65">Prévisualisation en direct</p>
                </div>
              </div>
            </div>

            <Panel title="Connexion" subtitle="Mot de passe admin requis">
              <form className="space-y-4" onSubmit={handleLogin}>
                <TextInput
                  label="Mot de passe"
                  value={password}
                  onChange={setPassword}
                  placeholder="Saisis ton mot de passe"
                />
                <button
                  type="submit"
                  className="inline-flex cursor-pointer items-center gap-2 border border-[#d7b26d]/60 bg-[#d7b26d] px-4 py-3 text-sm font-semibold text-[#120f0b] transition hover:translate-x-[-2px] hover:translate-y-[-2px]"
                >
                  <LockKeyhole className="h-4 w-4" />
                  Accéder au dashboard
                </button>
              </form>
            </Panel>
          </div>
        </div>
      </div>
    );
  }

  const renderPreview = () => {
    switch (previewKey) {
      case "hero":
        return (
          <PreviewCard title="Hero">
            <div className="space-y-3">
              <MiniTag>{draft.hero.badge}</MiniTag>
              <h4 className="font-serif text-3xl leading-tight text-[#f7efe2]">
                {draft.hero.name}
              </h4>
              <p className="text-sm leading-6 text-white/65">
                {draft.hero.subtitle} <strong className="text-[#d7b26d]">{draft.hero.subtitleBold}</strong>.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {draft.hero.stats.map((stat) => (
                  <div key={stat.label} className="border border-white/10 bg-white/5 p-3">
                    <div className="text-lg font-semibold text-[#f7efe2]">{stat.value}</div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-white/45">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </PreviewCard>
        );
      case "about":
        return (
          <PreviewCard title="About">
            <div className="space-y-3">
              <h4 className="font-serif text-3xl text-[#f7efe2]">{draft.about.title}</h4>
              <p className="text-sm text-white/65">{draft.about.subtitle}</p>
              <div className="grid gap-2 sm:grid-cols-3">
                {draft.about.techStack.map((item) => (
                  <MiniTag key={item}>{item}</MiniTag>
                ))}
              </div>
            </div>
          </PreviewCard>
        );
      case "skills":
        return (
          <PreviewCard title="Skills">
            <div className="space-y-3">
              {draft.skills.categories.map((category) => {
                const Icon = sectionIconMap[category.icon];
                return (
                  <div key={category.key} className="border border-white/10 bg-white/5 p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <Icon className="h-4 w-4 text-[#d7b26d]" />
                      <span className="text-sm font-medium text-[#f7efe2]">{category.title}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.slice(0, 5).map((skill) => (
                        <MiniTag key={skill}>{skill}</MiniTag>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </PreviewCard>
        );
      case "services":
        return (
          <PreviewCard title="Services">
            <div className="space-y-3">
              {draft.services.items.slice(0, 3).map((service) => {
                const Icon = sectionIconMap[service.icon];
                return (
                  <div key={service.title} className="border border-white/10 bg-white/5 p-3">
                    <div className="mb-2 flex items-center gap-2">
                      <Icon className="h-4 w-4 text-[#d7b26d]" />
                      <span className="text-sm font-medium text-[#f7efe2]">{service.title}</span>
                    </div>
                    <p className="text-xs leading-5 text-white/55">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </PreviewCard>
        );
      case "projects":
        return (
          <PreviewCard title="Projects">
            <div className="space-y-3">
              {draft.projects.items.slice(0, 2).map((project) => (
                <div key={project.id} className="overflow-hidden border border-white/10 bg-white/5">
                  <div className={`h-24 bg-gradient-to-br ${project.image.gradient}`} />
                  <div className="p-3">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium text-[#f7efe2]">{project.title}</h4>
                      {project.inDevelopment ? (
                        <MiniTag>Draft</MiniTag>
                      ) : (
                        <MiniTag>Live</MiniTag>
                      )}
                    </div>
                    <p className="mt-2 text-xs leading-5 text-white/55">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </PreviewCard>
        );
      case "contact":
        return (
          <PreviewCard title="Contact">
            <div className="space-y-3 text-sm text-white/65">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/35">
                  {draft.contact.sidebar.title}
                </div>
                <div className="mt-1 text-[#f7efe2]">{draft.contact.sectionSubtitle}</div>
              </div>
              <div className="grid gap-2">
                <MiniTag>{draft.contact.sidebar.emailValue}</MiniTag>
                <MiniTag>{draft.contact.sidebar.whatsappValue}</MiniTag>
                <MiniTag>{draft.contact.sidebar.locationValue}</MiniTag>
              </div>
            </div>
          </PreviewCard>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09090b] text-[#f5ede3]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px] opacity-50" />
      <div className="absolute left-[-10%] top-[-10%] h-80 w-80 rounded-full bg-[#d7b26d]/10 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] h-80 w-80 rounded-full bg-[#6cb3ff]/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1700px] px-6 py-8 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 border border-white/10 bg-white/5 p-4 backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center border border-[#d7b26d]/40 bg-[#d7b26d]/10">
              <Settings2 className="h-5 w-5 text-[#d7b26d]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">Admin Console</p>
              <h1 className="font-serif text-3xl text-[#f7efe2]">Portfolio Control Room</h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <MiniTag>Mode {statusTone}</MiniTag>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 border border-[#d7b26d]/60 bg-[#d7b26d] px-4 py-3 text-sm font-semibold text-[#120f0b] transition hover:translate-x-[-2px] hover:translate-y-[-2px] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {isSaving ? "Publication..." : "Publier"}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-[#f7efe2] transition hover:border-white/25 hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" />
              Quitter
            </button>
          </div>
        </header>

        {statusMessage ? (
          <div
            className={`mb-6 flex items-center gap-3 border px-4 py-3 text-sm ${
              statusTone === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                : statusTone === "error"
                  ? "border-red-500/30 bg-red-500/10 text-red-200"
                  : "border-white/10 bg-white/5 text-white/70"
            }`}
          >
            {statusTone === "success" ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : statusTone === "error" ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
            {statusMessage}
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_420px]">
          <aside className="space-y-4">
            <Panel title="Navigation" subtitle="Choisis la section à éditer">
              <div className="space-y-2">
                {sectionTabs.map((tab) => {
                  const isActive = tab.key === activeSection;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveSection(tab.key)}
                      className={`flex w-full items-center justify-between border px-4 py-3 text-left transition ${
                        isActive
                          ? "border-[#d7b26d]/60 bg-[#d7b26d]/10 text-[#f7efe2]"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-xs tracking-[0.3em] text-white/40">
                          {tab.short}
                        </span>
                        {tab.label}
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  );
                })}
              </div>
            </Panel>

            <Panel title="Etat">
              <div className="space-y-3 text-sm text-white/65">
                <div className="flex items-center justify-between">
                  <span>Authentifié</span>
                  <MiniTag>{isAuthenticated ? "Oui" : "Non"}</MiniTag>
                </div>
                <div className="flex items-center justify-between">
                  <span>Section</span>
                  <MiniTag>{activeSection}</MiniTag>
                </div>
                <div className="flex items-center justify-between">
                  <span>Upload</span>
                  <MiniTag>{uploadingIndex !== null ? `#${uploadingIndex + 1}` : "Idle"}</MiniTag>
                </div>
              </div>
            </Panel>

            <Panel title="Raccourcis">
              <div className="space-y-2 text-sm text-white/65">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#d7b26d]" />
                  Prévisualisation à droite
                </div>
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4 text-[#d7b26d]" />
                  Upload direct dans les projets
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[#d7b26d]" />
                  Cookie admin sécurisé
                </div>
              </div>
            </Panel>
          </aside>

          <main className="space-y-6">
            <Panel
              title={`${activeSection.toUpperCase()} — Edition`}
              subtitle="Modifie le contenu puis publie quand tout te convient."
            >
              {activeSection === "hero" ? (
                <div className="grid gap-4 lg:grid-cols-2">
                  <TextInput label="Badge" value={draft.hero.badge} onChange={(value) => updateSection("hero", (section) => ({ ...section, badge: value }))} />
                  <TextInput label="Nom" value={draft.hero.name} onChange={(value) => updateSection("hero", (section) => ({ ...section, name: value }))} />
                  <TextInput label="Sous-titre" value={draft.hero.subtitle} onChange={(value) => updateSection("hero", (section) => ({ ...section, subtitle: value }))} />
                  <TextInput label="Phrase forte" value={draft.hero.subtitleBold} onChange={(value) => updateSection("hero", (section) => ({ ...section, subtitleBold: value }))} />
                  <TextArea label="Description" value={draft.hero.description} onChange={(value) => updateSection("hero", (section) => ({ ...section, description: value }))} className="lg:col-span-2" />
                  <TextInput label="CTA projets" value={draft.hero.ctaProjects} onChange={(value) => updateSection("hero", (section) => ({ ...section, ctaProjects: value }))} />
                  <TextInput label="CTA contact" value={draft.hero.ctaContact} onChange={(value) => updateSection("hero", (section) => ({ ...section, ctaContact: value }))} />
                  <TextInput label="Statut" value={draft.hero.status} onChange={(value) => updateSection("hero", (section) => ({ ...section, status: value }))} />
                  <div className="lg:col-span-2 space-y-4">
                    <div className="grid gap-3 md:grid-cols-2">
                      {draft.hero.stats.map((stat, index) => (
                        <div key={stat.label} className="border border-white/10 bg-white/5 p-4">
                          <div className="mb-3 flex items-center justify-between">
                            <MiniTag>Stat {index + 1}</MiniTag>
                          </div>
                          <div className="grid gap-3 md:grid-cols-2">
                            <TextInput
                              label="Valeur"
                              value={stat.value}
                              onChange={(value) =>
                                updateSection("hero", (section) => ({
                                  ...section,
                                  stats: section.stats.map((item, itemIndex) =>
                                    itemIndex === index ? { ...item, value } : item,
                                  ),
                                }))
                              }
                            />
                            <TextInput
                              label="Label"
                              value={stat.label}
                              onChange={(value) =>
                                updateSection("hero", (section) => ({
                                  ...section,
                                  stats: section.stats.map((item, itemIndex) =>
                                    itemIndex === index ? { ...item, label: value } : item,
                                  ),
                                }))
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <TextArea
                      label="Tech stack"
                      value={joinList(draft.hero.techStack)}
                      onChange={(value) =>
                        updateSection("hero", (section) => ({
                          ...section,
                          techStack: splitList(value),
                        }))
                      }
                      rows={6}
                    />
                  </div>
                </div>
              ) : null}

              {activeSection === "about" ? (
                <div className="grid gap-4 lg:grid-cols-2">
                  <TextInput label="Titre" value={draft.about.title} onChange={(value) => updateSection("about", (section) => ({ ...section, title: value }))} />
                  <TextInput label="Sous-titre" value={draft.about.subtitle} onChange={(value) => updateSection("about", (section) => ({ ...section, subtitle: value }))} />
                  <TextInput label="Intro" value={draft.about.paragraphs.intro} onChange={(value) => updateSection("about", (section) => ({ ...section, paragraphs: { ...section.paragraphs, intro: value } }))} />
                  <TextInput label="Intro en gras" value={draft.about.paragraphs.introBold} onChange={(value) => updateSection("about", (section) => ({ ...section, paragraphs: { ...section.paragraphs, introBold: value } }))} />
                  <TextArea label="Intro suite" value={draft.about.paragraphs.introEnd} onChange={(value) => updateSection("about", (section) => ({ ...section, paragraphs: { ...section.paragraphs, introEnd: value } }))} />
                  <TextArea label="Paragraphe formation" value={draft.about.paragraphs.training} onChange={(value) => updateSection("about", (section) => ({ ...section, paragraphs: { ...section.paragraphs, training: value } }))} />
                  <TextInput label="Code années" value={draft.about.statsBoxes.codeYears} onChange={(value) => updateSection("about", (section) => ({ ...section, statsBoxes: { ...section.statsBoxes, codeYears: value } }))} />
                  <TextInput label="Code label" value={draft.about.statsBoxes.codeLabel} onChange={(value) => updateSection("about", (section) => ({ ...section, statsBoxes: { ...section.statsBoxes, codeLabel: value } }))} />
                  <TextInput label="Projets valeur" value={draft.about.statsBoxes.projects} onChange={(value) => updateSection("about", (section) => ({ ...section, statsBoxes: { ...section.statsBoxes, projects: value } }))} />
                  <TextInput label="Projets label" value={draft.about.statsBoxes.projectsLabel} onChange={(value) => updateSection("about", (section) => ({ ...section, statsBoxes: { ...section.statsBoxes, projectsLabel: value } }))} />
                  <TextInput label="Skills valeur" value={draft.about.statsBoxes.skills} onChange={(value) => updateSection("about", (section) => ({ ...section, statsBoxes: { ...section.statsBoxes, skills: value } }))} />
                  <TextInput label="Skills label" value={draft.about.statsBoxes.skillsLabel} onChange={(value) => updateSection("about", (section) => ({ ...section, statsBoxes: { ...section.statsBoxes, skillsLabel: value } }))} />
                  <TextArea
                    label="Timeline"
                    value={draft.about.timeline.map((entry) => `${entry.year}|${entry.title}|${entry.description}`).join("\n")}
                    onChange={(value) =>
                      updateSection("about", (section) => ({
                        ...section,
                        timeline: splitList(value).map((entry) => {
                          const [year = "", title = "", ...rest] = entry.split("|");
                          return {
                            year: year.trim(),
                            title: title.trim(),
                            description: rest.join("|").trim(),
                          };
                        }),
                      }))
                    }
                    rows={7}
                    hint="Format: année|titre|description"
                  />
                  <TextArea
                    label="Tech stack"
                    value={joinList(draft.about.techStack)}
                    onChange={(value) =>
                      updateSection("about", (section) => ({
                        ...section,
                        techStack: splitList(value),
                      }))
                    }
                    rows={5}
                  />
                  <TextInput label="Commentaire" value={draft.about.comment} onChange={(value) => updateSection("about", (section) => ({ ...section, comment: value }))} />
                </div>
              ) : null}

              {activeSection === "skills" ? (
                <div className="space-y-4">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <TextInput label="Titre" value={draft.skills.title} onChange={(value) => updateSection("skills", (section) => ({ ...section, title: value }))} />
                    <TextInput label="Sous-titre" value={draft.skills.subtitle} onChange={(value) => updateSection("skills", (section) => ({ ...section, subtitle: value }))} />
                    <TextInput label="Commentaire" value={draft.skills.comment} onChange={(value) => updateSection("skills", (section) => ({ ...section, comment: value }))} />
                  </div>

                  <div className="space-y-3">
                    {draft.skills.categories.map((category, index) => (
                      <div key={category.key} className="border border-white/10 bg-white/5 p-4">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <MiniTag>{category.key}</MiniTag>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                updateSection("skills", (section) => ({
                                  ...section,
                                  categories: section.categories.filter((_, categoryIndex) => categoryIndex !== index),
                                }))
                              }
                              className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 text-xs text-white/70 transition hover:border-red-500/40 hover:text-red-200"
                            >
                              <Trash2 className="h-3 w-3" />
                              Supprimer
                            </button>
                          </div>
                        </div>
                        <div className="grid gap-3 lg:grid-cols-3">
                          <TextInput
                            label="Titre"
                            value={category.title}
                            onChange={(value) =>
                              updateSection("skills", (section) => ({
                                ...section,
                                categories: section.categories.map((item, itemIndex) =>
                                  itemIndex === index ? { ...item, title: value } : item,
                                ),
                              }))
                            }
                          />
                          <div>
                            <FieldLabel label="Icône" />
                            <select
                              value={category.icon}
                              onChange={(event) =>
                                updateSection("skills", (section) => ({
                                  ...section,
                                  categories: section.categories.map((item, itemIndex) =>
                                    itemIndex === index ? { ...item, icon: event.target.value as IconKey } : item,
                                  ),
                                }))
                              }
                              className="w-full border border-white/10 bg-[#101014] px-4 py-3 text-sm text-[#f5ede3] outline-none transition focus:border-[#d7b26d]"
                            >
                              {iconOptions.map((icon) => (
                                <option key={icon} value={icon}>
                                  {icon}
                                </option>
                              ))}
                            </select>
                          </div>
                          <TextArea
                            label="Skills"
                            value={joinList(category.skills)}
                            onChange={(value) =>
                              updateSection("skills", (section) => ({
                                ...section,
                                categories: section.categories.map((item, itemIndex) =>
                                  itemIndex === index ? { ...item, skills: splitList(value) } : item,
                                ),
                              }))
                            }
                            rows={5}
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        updateSection("skills", (section) => ({
                          ...section,
                          categories: [
                            ...section.categories,
                            {
                              key: `new-${Date.now()}`,
                              title: "Nouvelle catégorie",
                              icon: "Code",
                              skills: ["Skill 1", "Skill 2"],
                            },
                          ],
                        }))
                      }
                      className="inline-flex items-center gap-2 border border-[#d7b26d]/40 bg-[#d7b26d]/10 px-4 py-3 text-sm text-[#f7efe2] transition hover:bg-[#d7b26d]/20"
                    >
                      <Plus className="h-4 w-4" />
                      Ajouter une catégorie
                    </button>
                  </div>
                </div>
              ) : null}

              {activeSection === "services" ? (
                <div className="space-y-4">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <TextInput label="Titre" value={draft.services.title} onChange={(value) => updateSection("services", (section) => ({ ...section, title: value }))} />
                    <TextInput label="Sous-titre" value={draft.services.subtitle} onChange={(value) => updateSection("services", (section) => ({ ...section, subtitle: value }))} />
                    <TextInput label="CTA text" value={draft.services.cta.text} onChange={(value) => updateSection("services", (section) => ({ ...section, cta: { ...section.cta, text: value } }))} />
                    <TextInput label="CTA button" value={draft.services.cta.button} onChange={(value) => updateSection("services", (section) => ({ ...section, cta: { ...section.cta, button: value } }))} />
                  </div>

                  <div className="space-y-3">
                    {draft.services.items.map((service, index) => (
                      <div key={`${service.title}-${index}`} className="border border-white/10 bg-white/5 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <MiniTag>{index + 1}</MiniTag>
                          <button
                            type="button"
                            onClick={() =>
                              updateSection("services", (section) => ({
                                ...section,
                                items: section.items.filter((_, itemIndex) => itemIndex !== index),
                              }))
                            }
                            className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 text-xs text-white/70 transition hover:border-red-500/40 hover:text-red-200"
                          >
                            <Trash2 className="h-3 w-3" />
                            Supprimer
                          </button>
                        </div>
                        <div className="grid gap-3 lg:grid-cols-3">
                          <TextInput
                            label="Titre"
                            value={service.title}
                            onChange={(value) =>
                              updateSection("services", (section) => ({
                                ...section,
                                items: section.items.map((item, itemIndex) =>
                                  itemIndex === index ? { ...item, title: value } : item,
                                ),
                              }))
                            }
                          />
                          <div>
                            <FieldLabel label="Icône" />
                            <select
                              value={service.icon}
                              onChange={(event) =>
                                updateSection("services", (section) => ({
                                  ...section,
                                  items: section.items.map((item, itemIndex) =>
                                    itemIndex === index ? { ...item, icon: event.target.value as IconKey } : item,
                                  ),
                                }))
                              }
                              className="w-full border border-white/10 bg-[#101014] px-4 py-3 text-sm text-[#f5ede3] outline-none transition focus:border-[#d7b26d]"
                            >
                              {iconOptions.map((icon) => (
                                <option key={icon} value={icon}>
                                  {icon}
                                </option>
                              ))}
                            </select>
                          </div>
                          <TextArea
                            label="Description"
                            value={service.description}
                            onChange={(value) =>
                              updateSection("services", (section) => ({
                                ...section,
                                items: section.items.map((item, itemIndex) =>
                                  itemIndex === index ? { ...item, description: value } : item,
                                ),
                              }))
                            }
                            rows={5}
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        updateSection("services", (section) => ({
                          ...section,
                          items: [
                            ...section.items,
                            {
                              icon: "Globe",
                              title: "Nouveau service",
                              description: "Décris ton service ici.",
                            },
                          ],
                        }))
                      }
                      className="inline-flex items-center gap-2 border border-[#d7b26d]/40 bg-[#d7b26d]/10 px-4 py-3 text-sm text-[#f7efe2] transition hover:bg-[#d7b26d]/20"
                    >
                      <Plus className="h-4 w-4" />
                      Ajouter un service
                    </button>
                  </div>
                </div>
              ) : null}

              {activeSection === "projects" ? (
                <div className="space-y-4">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <TextInput label="Titre principal" value={draft.projects.title} onChange={(value) => updateSection("projects", (section) => ({ ...section, title: value }))} />
                    <TextInput label="Titre accent" value={draft.projects.titleAccent} onChange={(value) => updateSection("projects", (section) => ({ ...section, titleAccent: value }))} />
                    <TextArea label="Sous-titre" value={draft.projects.subtitle} onChange={(value) => updateSection("projects", (section) => ({ ...section, subtitle: value }))} className="lg:col-span-2" />
                  </div>

                  <div className="space-y-4">
                    {draft.projects.items.map((project, index) => (
                      <div key={project.id} className="border border-white/10 bg-white/5 p-4">
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                          <MiniTag>Projet {index + 1}</MiniTag>
                          <button
                            type="button"
                            onClick={() =>
                              updateSection("projects", (section) => ({
                                ...section,
                                items: section.items.filter((_, itemIndex) => itemIndex !== index),
                              }))
                            }
                            className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 text-xs text-white/70 transition hover:border-red-500/40 hover:text-red-200"
                          >
                            <Trash2 className="h-3 w-3" />
                            Supprimer
                          </button>
                        </div>
                        <div className="grid gap-3 lg:grid-cols-2">
                          <TextInput
                            label="Titre"
                            value={project.title}
                            onChange={(value) =>
                              updateSection("projects", (section) => ({
                                ...section,
                                items: section.items.map((item, itemIndex) =>
                                  itemIndex === index ? { ...item, title: value } : item,
                                ),
                              }))
                            }
                          />
                          <TextInput
                            label="Image alt"
                            value={project.image.alt}
                            onChange={(value) =>
                              updateSection("projects", (section) => ({
                                ...section,
                                items: section.items.map((item, itemIndex) =>
                                  itemIndex === index ? { ...item, image: { ...item.image, alt: value } } : item,
                                ),
                              }))
                            }
                          />
                          <TextArea
                            label="Description"
                            value={project.description}
                            onChange={(value) =>
                              updateSection("projects", (section) => ({
                                ...section,
                                items: section.items.map((item, itemIndex) =>
                                  itemIndex === index ? { ...item, description: value } : item,
                                ),
                              }))
                            }
                            rows={4}
                          />
                          <TextArea
                            label="Tags"
                            value={joinList(project.tags)}
                            onChange={(value) =>
                              updateSection("projects", (section) => ({
                                ...section,
                                items: section.items.map((item, itemIndex) =>
                                  itemIndex === index ? { ...item, tags: splitList(value) } : item,
                                ),
                              }))
                            }
                            rows={4}
                          />
                          <TextInput
                            label="Image src"
                            value={project.image.src}
                            onChange={(value) =>
                              updateSection("projects", (section) => ({
                                ...section,
                                items: section.items.map((item, itemIndex) =>
                                  itemIndex === index ? { ...item, image: { ...item.image, src: value } } : item,
                                ),
                              }))
                            }
                          />
                          <TextInput
                            label="Gradient"
                            value={project.image.gradient}
                            onChange={(value) =>
                              updateSection("projects", (section) => ({
                                ...section,
                                items: section.items.map((item, itemIndex) =>
                                  itemIndex === index ? { ...item, image: { ...item.image, gradient: value } } : item,
                                ),
                              }))
                            }
                          />
                          <TextInput
                            label="GitHub"
                            value={project.links.github}
                            onChange={(value) =>
                              updateSection("projects", (section) => ({
                                ...section,
                                items: section.items.map((item, itemIndex) =>
                                  itemIndex === index ? { ...item, links: { ...item.links, github: value } } : item,
                                ),
                              }))
                            }
                          />
                          <TextInput
                            label="Demo"
                            value={project.links.demo ?? ""}
                            onChange={(value) =>
                              updateSection("projects", (section) => ({
                                ...section,
                                items: section.items.map((item, itemIndex) =>
                                  itemIndex === index
                                    ? {
                                        ...item,
                                        links: {
                                          ...item.links,
                                          demo: value,
                                        },
                                      }
                                    : item,
                                ),
                              }))
                            }
                          />
                          <div className="space-y-3">
                            <label className="flex items-center gap-3 text-sm text-white/65">
                              <input
                                type="checkbox"
                                checked={project.inDevelopment}
                                onChange={(event) =>
                                  updateSection("projects", (section) => ({
                                    ...section,
                                    items: section.items.map((item, itemIndex) =>
                                      itemIndex === index ? { ...item, inDevelopment: event.target.checked } : item,
                                    ),
                                  }))
                                }
                                className="h-4 w-4 border-white/10 bg-[#101014] accent-[#d7b26d]"
                              />
                              Projet en développement
                            </label>

                            <div className="space-y-2">
                              <FieldLabel label="Uploader une image" hint="PNG, JPG, WebP" />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                  const file = event.target.files?.[0];
                                  if (file) {
                                    void uploadImage(file, index);
                                  }
                                }}
                                className="block w-full text-sm text-white/65 file:mr-4 file:border-0 file:bg-[#d7b26d] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#120f0b]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        updateSection("projects", (section) => ({
                          ...section,
                          items: [...section.items, createProject(section.items.length + 1)],
                        }))
                      }
                      className="inline-flex items-center gap-2 border border-[#d7b26d]/40 bg-[#d7b26d]/10 px-4 py-3 text-sm text-[#f7efe2] transition hover:bg-[#d7b26d]/20"
                    >
                      <Plus className="h-4 w-4" />
                      Ajouter un projet
                    </button>
                  </div>
                </div>
              ) : null}

              {activeSection === "contact" ? (
                <div className="grid gap-4 lg:grid-cols-2">
                  <TextInput label="Titre" value={draft.contact.sectionTitle} onChange={(value) => updateSection("contact", (section) => ({ ...section, sectionTitle: value }))} />
                  <TextArea label="Sous-titre" value={draft.contact.sectionSubtitle} onChange={(value) => updateSection("contact", (section) => ({ ...section, sectionSubtitle: value }))} />
                  <TextInput label="Succès titre" value={draft.contact.successTitle} onChange={(value) => updateSection("contact", (section) => ({ ...section, successTitle: value }))} />
                  <TextInput label="Succès message" value={draft.contact.successDescription} onChange={(value) => updateSection("contact", (section) => ({ ...section, successDescription: value }))} />
                  <TextInput label="Nom label" value={draft.contact.form.nameLabel} onChange={(value) => updateSection("contact", (section) => ({ ...section, form: { ...section.form, nameLabel: value } }))} />
                  <TextInput label="Email label" value={draft.contact.form.emailLabel} onChange={(value) => updateSection("contact", (section) => ({ ...section, form: { ...section.form, emailLabel: value } }))} />
                  <TextInput label="Sujet label" value={draft.contact.form.subjectLabel} onChange={(value) => updateSection("contact", (section) => ({ ...section, form: { ...section.form, subjectLabel: value } }))} />
                  <TextInput label="Message label" value={draft.contact.form.messageLabel} onChange={(value) => updateSection("contact", (section) => ({ ...section, form: { ...section.form, messageLabel: value } }))} />
                  <TextInput label="Submit" value={draft.contact.form.submit} onChange={(value) => updateSection("contact", (section) => ({ ...section, form: { ...section.form, submit: value } }))} />
                  <TextInput label="Submitting" value={draft.contact.form.submitting} onChange={(value) => updateSection("contact", (section) => ({ ...section, form: { ...section.form, submitting: value } }))} />
                  <TextInput label="Email valeur" value={draft.contact.sidebar.emailValue} onChange={(value) => updateSection("contact", (section) => ({ ...section, sidebar: { ...section.sidebar, emailValue: value } }))} />
                  <TextInput label="LinkedIn valeur" value={draft.contact.sidebar.linkedinValue} onChange={(value) => updateSection("contact", (section) => ({ ...section, sidebar: { ...section.sidebar, linkedinValue: value } }))} />
                  <TextInput label="GitHub valeur" value={draft.contact.sidebar.githubValue} onChange={(value) => updateSection("contact", (section) => ({ ...section, sidebar: { ...section.sidebar, githubValue: value } }))} />
                  <TextInput label="Localisation" value={draft.contact.sidebar.locationValue} onChange={(value) => updateSection("contact", (section) => ({ ...section, sidebar: { ...section.sidebar, locationValue: value } }))} />
                  <TextInput label="WhatsApp" value={draft.contact.sidebar.whatsappValue} onChange={(value) => updateSection("contact", (section) => ({ ...section, sidebar: { ...section.sidebar, whatsappValue: value } }))} />
                  <TextInput label="Disponibilité" value={draft.contact.sidebar.availabilityValue} onChange={(value) => updateSection("contact", (section) => ({ ...section, sidebar: { ...section.sidebar, availabilityValue: value } }))} />
                </div>
              ) : null}
            </Panel>
          </main>

          <aside className="space-y-6">
            <Panel
              title="Prévisualisation"
              subtitle="Aperçu live de la section sélectionnée."
            >
              <div className="mb-4 flex items-center gap-3">
                {ActiveIcon ? <ActiveIcon className="h-5 w-5 text-[#d7b26d]" /> : null}
                <div>
                  <div className="text-sm font-medium text-[#f7efe2]">
                    {sectionTabs.find((tab) => tab.key === activeSection)?.label}
                  </div>
                  <div className="text-xs text-white/45">
                    Mise à jour instantanée
                  </div>
                </div>
              </div>
              {renderPreview()}
            </Panel>

            <Panel title="Récapitulatif" subtitle="Ce que tu peux modifier ici.">
              <div className="space-y-3 text-sm text-white/65">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#d7b26d]" />
                  Textes, titres et paragraphes
                </div>
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-[#d7b26d]" />
                  Images de projets et médias
                </div>
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4 text-[#d7b26d]" />
                  Ajout et suppression de projets
                </div>
                <div className="flex items-center gap-2">
                  <Save className="h-4 w-4 text-[#d7b26d]" />
                  Publication via API
                </div>
              </div>
            </Panel>
          </aside>
        </div>
      </div>
    </div>
  );
}
