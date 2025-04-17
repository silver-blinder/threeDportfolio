import { useEffect, useState } from "react";
import EarthCanvas from "./components/canvas/EarthCanvas";
import LocationInfo from "./components/sections/InfoSection/LocationInfo";
import PersonalInfo from "./components/sections/InfoSection/PersonalInfo";
import Skills from "./components/sections/Skills";
import "./App.css";

interface SkillsProgress {
  fade: number;
  skills: number;
}

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [skillsProgress, setSkillsProgress] = useState<SkillsProgress>({ fade: 0, skills: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const maxScroll = windowHeight * 1.2;
      const progress = Math.min(scrollY / maxScroll, 1);

      const fadeStartPoint = windowHeight * 1.2;
      const fadeDuration = windowHeight * 0.4;
      const skillsStartPoint = fadeStartPoint + fadeDuration;
      const skillsDuration = windowHeight * 0.4;

      const fadeProgress = Math.max(0, Math.min(1, (scrollY - fadeStartPoint) / fadeDuration));
      const skillsProgress = Math.max(
        0,
        Math.min(1, (scrollY - skillsStartPoint) / skillsDuration)
      );

      setScrollProgress(progress);
      setSkillsProgress({ fade: fadeProgress, skills: skillsProgress });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative w-full">
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[-1] h-[100svh] w-full overflow-hidden">
        <EarthCanvas scrollProgress={scrollProgress} fadeProgress={skillsProgress.fade} />
      </div>

      <PersonalInfo scrollProgress={scrollProgress} />

      <LocationInfo
        scrollProgress={scrollProgress}
        style={{
          opacity: 1 - skillsProgress.fade,
        }}
      />

      <Skills
        progress={skillsProgress.skills}
        shouldShow={skillsProgress.fade >= 1} // 只有当淡出完成后才显示
      />

      {/* <div className="pointer-events-none fixed top-1/2 flex w-[11px] -translate-y-1/2 flex-col justify-between overflow-hidden transition-opacity left-[0.9375rem] h-[73svh]">
        <div className="absolute bottom-0 left-[4px] top-0 z-0 w-[1px] -translate-x-1/2 bg-[#4c4c4c]">
          <div
            className="absolute top-0 left-0 w-full bg-white transition-transform duration-300 origin-top"
            style={{
              height: "100%",
              transform: `scaleY(${scrollProgress})`,
              transformOrigin: "top",
            }}
          />
        </div>
        <div className="relative z-20 size-[8px] rounded-full bg-white" />
        <div className="relative z-20 size-[8px] rounded-full bg-white" />
      </div> */}
    </main>
  );
}

export default App;
