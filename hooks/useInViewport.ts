import { RefObject, useCallback, useEffect, useState } from "react";

const useInViewport = (
  ref: RefObject<HTMLElement | null>,
  options?: IntersectionObserverInit
): boolean => {
  const [inViewport, setInViewport] = useState(false);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (inViewport !== entry.isIntersecting) {
        setInViewport(entry.isIntersecting);
      }
    },
    [inViewport]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    ref.current && observer.observe(ref.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ref.current && observer.unobserve(ref.current);
    };
  }, [callback, options, ref]);

  return inViewport;
};

export default useInViewport;
