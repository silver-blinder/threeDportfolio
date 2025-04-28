interface LocationInfoProps {
  scrollProgress?: number;
  style?: {
    opacity?: number;
    [key: string]: any;
  };
}

function LocationInfo({ scrollProgress = 0, style = {} }: LocationInfoProps) {
  const isVisible = scrollProgress > 0.1;
  const shouldFadeOut = style.opacity !== undefined ? style.opacity < 1 : false;

  return (
    <section className="relative h-[100svh]">
      <div
        className="fixed inset-0 flex items-center px-[2rem] pt-[30vh]"
        style={{
          ...style,
          opacity: shouldFadeOut ? style.opacity : isVisible ? 1 : 0,
          transform: `translateY(${
            shouldFadeOut ? `${(1 - Number(style.opacity)) * -100}px` : isVisible ? 0 : 500
          }px)`,
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <div className="flex items-start gap-x-8">
          <div
            className="aspect-[85/59] w-[178px]"
            style={{
              transform: shouldFadeOut ? `scale(${style.opacity})` : "scale(1)",
              transition: "transform 0.8s ease",
            }}
          >
            <img
              className="w-full"
              src="/china-flag-icon.svg"
              alt="China"
              width="178"
              height="123"
            />
          </div>

          <div
            className="text-white"
            style={{
              transform: shouldFadeOut
                ? `translateX(${(1 - Number(style.opacity)) * 50}px)`
                : "translateX(0)",
              transition: "transform 0.8s ease",
            }}
          >
            <h2 className="mb-6 text-[2.5rem] font-bold leading-none tracking-wider">
              SHANGHAI
              <br />
              CHINA
            </h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="text-[1rem] font-light uppercase tracking-wider">LOCATION</div>
                <div className="text-[2rem] font-bold tracking-wider">EAST ASIA</div>
              </div>

              <div className="space-y-1">
                <div className="text-[1rem] font-light uppercase tracking-wider">POPULATION</div>
                <div className="text-[2rem] font-bold tracking-wider">24.9 MILLION</div>
              </div>

              <div className="space-y-1">
                <div className="text-[1rem] font-light uppercase tracking-wider">TIME ZONE</div>
                <div className="text-[2rem] font-bold tracking-wider">UTC+8</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LocationInfo;
