"use client";

import { ClassNameProps } from "@/types/ClassName";
import { cn } from "@/utils/cn";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FiSun, FiMoon, FiCloud } from "react-icons/fi";

export default function ThemeSwitcher({ className }: ClassNameProps) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  function handleChangeTheme(): void {
    if (resolvedTheme === "dark") {
      setTheme("light");
      return;
    }
    setTheme("dark");
  }

  return (
    <div
      className={cn("p-4 hover:cursor-pointer", className)}
      onClick={handleChangeTheme}
    >
      {!mounted ? (
        <FiCloud className="text-blue-500" />
      ) : resolvedTheme === "dark" ? (
        <FiMoon className="text-gray-400" />
      ) : (
        <FiSun className="text-orange-600 hover:cursor-pointer" />
      )}
    </div>
  );
}
