import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { useLoading } from "../context/loadingContext";
import "./styles/Loading.css";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflowY;
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (percent < 100) return;

    const loadedTimer = window.setTimeout(() => {
      setLoaded(true);
    }, 600);
    const readyTimer = window.setTimeout(() => {
      setIsReady(true);
    }, 1600);

    return () => {
      window.clearTimeout(loadedTimer);
      window.clearTimeout(readyTimer);
    };
  }, [percent]);

  useEffect(() => {
    if (!isReady) return;

    let cancelled = false;
    let closeTimer: number | undefined;
    setIsClosing(true);

    void import("./utils/initialFX")
      .then(({ initialFX }) => {
        if (cancelled) return;

        closeTimer = window.setTimeout(() => {
          try {
            initialFX();
          } finally {
            setIsLoading(false);
          }
        }, 900);
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Unable to initialize page animations:", error);
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
      window.clearTimeout(closeTimer);
    };
  }, [isReady, setIsLoading]);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  };

  return (
    <>
      <div className="loading-header">
        <a href="#landingDiv" className="loader-title" data-cursor="disable">
          RedoyanulHaque
        </a>
        <div className={`loaderGame${isClosing ? " loader-out" : ""}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {Array.from({ length: 27 }, (_, index) => (
                <div className="loaderGame-line" key={index} />
              ))}
            </div>
            <div className="loaderGame-ball" />
          </div>
        </div>
      </div>
      <div className="loading-screen" role="status" aria-live="polite">
        <div className="loading-marquee" aria-hidden="true">
          <Marquee>
            <span>&nbsp; AI Engineer &nbsp;</span>
            <span>&nbsp; Full Stack Developer &nbsp;</span>
            <span>&nbsp; AI Engineer &nbsp;</span>
            <span>&nbsp; Full Stack Developer &nbsp;</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap${isClosing ? " loading-clicked" : ""}`}
          onMouseMove={handleMouseMove}
        >
          <div className="loading-hover" />
          <div className={`loading-button${loaded ? " loading-complete" : ""}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{Math.min(100, Math.round(percent))}%</span>
                </div>
              </div>
              <div className="loading-box" />
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
