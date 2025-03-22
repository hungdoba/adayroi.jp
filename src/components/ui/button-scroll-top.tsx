'use client';
import { cn } from '@/utils/cn';
import { ClassNameProps } from '@/types/ClassName';
import { ChevronUp } from 'lucide-react';

export default function ButtonScrollTop({ className }: ClassNameProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={cn(
        'z-50 fixed right-2 bottom-2 hover:cursor-pointer',
        className
      )}
    >
      <div className="p-2 md:p-4" onClick={scrollToTop}>
        <ChevronUp />
      </div>
    </div>
  );
}
