'use client';

import { useEffect, useRef, useState } from 'react';

// Toggles an "active" flag while the attached element is visible in the
// viewport - meant to be combined with a glowOnHover* class + the
// corresponding .glowActive CSS rule (see globals.css, scoped to
// @media (hover: none)) so touch devices get the hover glow automatically
// as each expandable section scrolls into view, instead of a static
// always-on glow or no affordance at all.
export function useScrollGlow(threshold = 0.4) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, active };
}
