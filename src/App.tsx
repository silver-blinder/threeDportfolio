import { useEffect, useState } from "react";
import EarthCanvas from "./components/canvas/EarthCanvas";
import LocationInfo from "./components/sections/InfoSection/LocationInfo";
import PersonalInfo from "./components/sections/InfoSection/PersonalInfo";
import "./App.css";

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const maxScroll = windowHeight * 1.2;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative w-full">
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[-1] h-[100svh] w-full overflow-hidden">
        <EarthCanvas scrollProgress={scrollProgress} />
      </div>

      <PersonalInfo scrollProgress={scrollProgress} />

      <LocationInfo scrollProgress={scrollProgress} />

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
