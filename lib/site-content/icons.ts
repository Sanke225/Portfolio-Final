import {
  Brain,
  Code,
  Globe,
  Layers,
  Palette,
  Server,
  Smartphone,
  Zap,
} from "lucide-react";
import type { ComponentType } from "react";
import type { IconKey } from "./types";

export const sectionIconMap = {
  Code,
  Server,
  Brain,
  Palette,
  Globe,
  Layers,
  Zap,
  Smartphone,
} satisfies Record<IconKey, ComponentType<{ className?: string; strokeWidth?: number }>>;
