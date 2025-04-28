import { useEffect, useState } from "react";
import EarthCanvas from "./components/canvas/EarthCanvas";
import LocationInfo from "./components/sections/InfoSection/LocationInfo";
import PersonalInfo from "./components/sections/InfoSection/PersonalInfo";
import Skills from "./components/sections/Skills";
import "./App.css";

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fadeProgress, setFadeProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const maxScroll = windowHeight * 5.5;

      const fadeStartPoint = windowHeight * 1.2;
      const fadeDuration = windowHeight * 0.8;

      const fadeProgress = Math.max(0, Math.min(1, (scrollY - fadeStartPoint) / fadeDuration));

      setScrollProgress(Math.min(scrollY / maxScroll, 1));
      setFadeProgress(fadeProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative w-full">
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[-1] h-[100svh] w-full overflow-hidden">
        <EarthCanvas scrollProgress={scrollProgress} fadeProgress={fadeProgress} />
      </div>

      <PersonalInfo scrollProgress={scrollProgress} />

      <LocationInfo
        scrollProgress={scrollProgress}
        style={{
          opacity: 1 - fadeProgress * 5,
        }}
      />

      <Skills progress={scrollProgress} />

      {/* <Experience progress={scrollProgress} /> */}
    </main>
  );
}

export default App;
