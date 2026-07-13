import { PropsWithChildren, useEffect, useState } from "react";
import About from "./About";
import CallToAction from "./CallToAction";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState(
    () => window.innerWidth > 1024,
  );

  useEffect(() => {
    let resizeTimer: number | undefined;
    let cleanupSplitText = setSplitText();

    const resizeHandler = () => {
      window.clearTimeout(resizeTimer);
      setIsDesktopView(window.innerWidth > 1024);
      resizeTimer = window.setTimeout(() => {
        cleanupSplitText();
        cleanupSplitText = setSplitText();
      }, 150);
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", resizeHandler);
      cleanupSplitText();
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div className="content-main">
        <Landing />
        <About />
        <WhatIDo />
        <Career />
        <Work />
        <CallToAction />
        <Contact />
      </div>
    </div>
  );
};

export default MainContainer;
