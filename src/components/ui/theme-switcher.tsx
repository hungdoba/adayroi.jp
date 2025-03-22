'use client';

import { cn } from '@/utils/cn';
import { Cloud, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  function handleChangeTheme(): void {
    if (resolvedTheme === 'dark') {
      setTheme('light');
      return;
    }
    setTheme('dark');
  }

  return (
    <div
      className={cn('p-4 pr-0 hover:cursor-pointer')}
      onClick={handleChangeTheme}
    >
      {!mounted ? <Cloud /> : resolvedTheme === 'dark' ? <Moon /> : <Sun />}
    </div>
  );
}
