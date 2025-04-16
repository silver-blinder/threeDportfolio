function LocationInfo({ scrollProgress = 0 }) {
  return (
    <section className="relative h-[100svh]">
      <div
        className="fixed inset-0 flex items-center px-[2rem] pt-[30vh]"
        style={{
          opacity: scrollProgress > 0.6 ? 1 : 0,
          transform: `translateY(${scrollProgress > 0.6 ? 0 : 500}px)`,
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <div className="flex items-start gap-x-8">
          <div className="aspect-[85/59] w-[178px]">
            <img
              className="w-full"
              src="/china-flag-icon.svg"
              alt="China"
              width="178"
              height="123"
            />
          </div>

          <div className="text-white">
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
