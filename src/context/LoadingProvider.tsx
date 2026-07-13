import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import Loading from "../components/Loading";
import { LoadingContext } from "./loadingContext";

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(
    () => window.innerWidth > 1024,
  );
  const [loading, setLoading] = useState(0);
  const hasStartedInitialEffects = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let startTimer: number | undefined;

    const startWithoutCharacter = async () => {
      if (window.innerWidth > 1024 || hasStartedInitialEffects.current) {
        return;
      }

      hasStartedInitialEffects.current = true;
      setIsLoading(false);

      try {
        const { initialFX } = await import("../components/utils/initialFX");
        if (!cancelled) {
          startTimer = window.setTimeout(initialFX, 100);
        }
      } catch (error) {
        if (cancelled) return;
        console.error("Unable to initialize page animations:", error);
        document.body.style.overflowY = "auto";
      }
    };

    void startWithoutCharacter();

    const handleResize = () => {
      void startWithoutCharacter();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      window.clearTimeout(startTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const value = useMemo(
    () => ({ isLoading, setIsLoading, setLoading }),
    [isLoading],
  );

  return (
    <LoadingContext.Provider value={value}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};
