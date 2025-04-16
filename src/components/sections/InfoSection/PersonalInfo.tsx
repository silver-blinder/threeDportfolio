function PersonalInfo({ scrollProgress = 0 }) {
  return (
    <section className="relative flex h-[100svh] items-start md:items-center overflow-hidden pt-[6.25rem] text-white px-[2rem]">
      <div
        className="flex w-full flex-col-reverse md:flex-row gap-[6.0625rem] px-[0.9375rem] opacity-0 animate-slideFromRight"
        style={{
          opacity: 1 - scrollProgress * 2,
          transform: `translateY(${scrollProgress * -50}px)`,
        }}
      >
        <div className="flex flex-1 flex-col justify-center">
          <div className="space-y-4">
            <div className="text-[2.875rem] font-bold leading-tight md:text-[6.4375rem]">
              {"Hello".split("").map((letter, i) => (
                <span key={i} className="letter inline-block">
                  {letter}
                </span>
              ))}
            </div>
            <div className="text-[2rem] leading-tight md:text-[3rem]">Welcome to my space</div>
            <div className="text-[2rem] leading-tight md:text-[3rem]">Nice to meet you!👋</div>
          </div>
        </div>

        <div className="flex flex-col gap-y-4 max-w-[75.73vw] text-[1.5625rem]/[1.35] font-medium md:max-w-[45vw] md:text-[2.1875rem] lg:max-w-[22.8125vw]">
          <div className="text-[2.875rem] font-bold leading-tight md:text-[6.4375rem]">I'm</div>
          <span>frontend developer</span>
          <span>digital nomad</span>
          <span>guitar player</span>
          <span>...</span>
        </div>
      </div>
    </section>
  );
}

export default PersonalInfo;
