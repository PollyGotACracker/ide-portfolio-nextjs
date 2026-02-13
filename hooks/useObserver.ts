import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function useObserver(selectors: string) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const currentId = target.dataset.id ?? null;
          setActiveId(currentId);
        }
      });
    }, { rootMargin: "-40% 0px -40% 0px", threshold: 0 });

    const elements = document.querySelectorAll(selectors);
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      setActiveId(null);
    };
  }, [selectors, pathname]);

  return activeId;
}