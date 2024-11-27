"use client";

import { cn } from "@/utils/cn";
import { useState } from "react";
import { FiBookmark } from "react-icons/fi";
import { ClassNameProps } from "@/types/ClassName";

// Used at Question component
export default function Bookmark({ className }: ClassNameProps) {
  const [marked, setMarked] = useState(false);

  return (
    <FiBookmark
      onClick={() => setMarked(!marked)}
      className={cn(
        "w-6 h-6 cursor-pointer",
        { "text-blue-500": marked },
        className
      )}
    />
  );
}
