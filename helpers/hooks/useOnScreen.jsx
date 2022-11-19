import { useEffect, useMemo, useState } from "react";

export default function useOnScreen(element, rootMargin) {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting);
      },
      { rootMargin }
    );

    console.log("IN HOOK", element.current.lastChild.lastChild.lastChild);
    element.current &&
      observer.observe(element.current.lastChild.lastChild.lastChild);

    return () =>
      observer.unobserve(element.current.lastChild.lastChild.lastChild);
  }, []);

  return isVisible;
}