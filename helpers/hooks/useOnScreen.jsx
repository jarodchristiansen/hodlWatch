import { useEffect, useMemo, useState } from "react";

export default function useOnScreen(element, rootMargin) {
  const [isVisible, setState] = useState(false);

  console.log({ element });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      },
      { rootMargin }
    );

    element.current && observer.observe(element.current);

    return () => observer.unobserve(element);
  }, []);

  return isVisible;
}
