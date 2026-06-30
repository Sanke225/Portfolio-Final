import { promises as fs } from "fs";
import path from "path";
import { defaultSiteContent } from "./default";
import type { ProjectItem, SiteContent } from "./types";

const CONTENT_PATH = path.join(process.cwd(), "data", "site-content.json");

async function ensureDirectory() {
  await fs.mkdir(path.dirname(CONTENT_PATH), { recursive: true });
}

function normalizeContent(content: Partial<SiteContent>): SiteContent {
  const fallback = defaultSiteContent;

  return {
    hero: { ...fallback.hero, ...(content.hero ?? {}) },
    about: {
      ...fallback.about,
      ...(content.about ?? {}),
      paragraphs: {
        ...fallback.about.paragraphs,
        ...(content.about?.paragraphs ?? {}),
      },
      statsBoxes: {
        ...fallback.about.statsBoxes,
        ...(content.about?.statsBoxes ?? {}),
      },
      timeline: content.about?.timeline?.length ? content.about.timeline : fallback.about.timeline,
      techStack: content.about?.techStack?.length ? content.about.techStack : fallback.about.techStack,
    },
    skills: {
      ...fallback.skills,
      ...(content.skills ?? {}),
      categories: content.skills?.categories?.length
        ? content.skills.categories
        : fallback.skills.categories,
    },
    services: {
      ...fallback.services,
      ...(content.services ?? {}),
      items: content.services?.items?.length ? content.services.items : fallback.services.items,
    },
    projects: {
      ...fallback.projects,
      ...(content.projects ?? {}),
      items: content.projects?.items?.length
        ? content.projects.items
        : fallback.projects.items,
    },
    contact: {
      ...fallback.contact,
      ...(content.contact ?? {}),
      form: {
        ...fallback.contact.form,
        ...(content.contact?.form ?? {}),
      },
      sidebar: {
        ...fallback.contact.sidebar,
        ...(content.contact?.sidebar ?? {}),
      },
    },
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(CONTENT_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    return normalizeContent(parsed);
  } catch {
    return defaultSiteContent;
  }
}

export async function saveSiteContent(content: SiteContent): Promise<SiteContent> {
  await ensureDirectory();
  const normalized = normalizeContent(content);
  await fs.writeFile(CONTENT_PATH, JSON.stringify(normalized, null, 2), "utf8");
  return normalized;
}

export function createEmptyProject(nextId: number): ProjectItem {
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
