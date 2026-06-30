'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';

/**
 * Toggle de thème brutalist
 * Cycle entre light, dark et system
 * Style : Abidjan Brutalist (sans border-radius)
 */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Évite les erreurs de hydratation
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return (
      <button
        className="border-2 border-shadow bg-concrete px-3 py-2 transition-all"
        aria-label="Toggle theme"
      >
        <Sun className="h-5 w-5" />
      </button>
    );
  }

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-5 w-5 transition-transform duration-300" />;
      case 'dark':
        return <Moon className="h-5 w-5 transition-transform duration-300" />;
      case 'system':
        return <Monitor className="h-5 w-5 transition-transform duration-300" />;
      default:
        return <Sun className="h-5 w-5 transition-transform duration-300" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Mode clair activé';
      case 'dark':
        return 'Mode sombre activé';
      case 'system':
        return 'Mode système activé';
      default:
        return 'Toggle theme';
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className="border-2 border-shadow bg-concrete px-3 py-2 transition-all hover:bg-dust active:translate-x-1 active:translate-y-1 dark:bg-shadow dark:border-concrete dark:hover:bg-violet-dark"
      aria-label={getLabel()}
      title={getLabel()}
    >
      {getIcon()}
    </button>
  );
}
