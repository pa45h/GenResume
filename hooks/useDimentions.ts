import { useEffect, useState } from "react";

export default function useDimentions(
  containerRef: React.RefObject<HTMLDivElement>,
) {
  const [dimentions, setDimentions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const currentRef = containerRef.current;

    function getDimetions() {
      return {
        width: currentRef?.offsetWidth || 0,
        height: currentRef?.offsetHeight || 0,
      };
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDimentions(getDimetions());
      }
    });

    if (currentRef) {
      resizeObserver.observe(currentRef);
      setDimentions(getDimetions());
    }

    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef);
      }
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  return dimentions;
}
