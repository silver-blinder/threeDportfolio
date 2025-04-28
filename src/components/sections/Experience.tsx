const experiences = [
  {
    title: "Decoda AI",
    description: `前端开发（React + Next.js + TypeScript + TailwindCSS + AWS）
• 配合后端负责整个聊天（包括群聊）功能的前端页面开发，使用Next.js进行路由管理；TailwindCSS、NextUI库进行页面设计；Xior封装后端API。
• 运用jotai——现代React全局状态管理库对网站进行优化，将首页、探索及聊天页面的加载速度大幅提升，提升用户体验。
• 帮助网站进行SEO优化，包括增加用户页面停留时间、增加服务端静态内容的预渲染等。
• 定期参与代码规范制定，review他人代码，提升代码整洁性，与团队共同学习成长。`,
    link: "https://dreamle.ai/",
    duration: "2024.6-2024.10",
  },
  {
    title: "HippoClinic",
    description: `前端开发（React + Umi.js + TypeScript + TailwindCSS + Ant Design + Three.js）
• 运用React、Umi.js处理复杂页面逻辑，能够根据不同需求调研选择最适合的现代流行库高效完成任务。
• 熟悉对于大规模数据的处理，例如使用indexDB和protobuf数据类型；熟悉使用three.js对图形进行3D操作。
• 对页面的UI细节打磨，能够处理诸如浏览器兼容的各类问题，极大增加用户体验。`,
    link: "https://hippoclinic.com/",
    duration: "2024.11-2025.1",
  },
  {
    title: "噗噗噗教育科技",
    description: `前端开发（React Native + Expo + Nativewind + gluestack-ui）
• 从零运用React Native与Expo框架进行进行跨平台开发工作，完成包括项目合集页、挑战页等关键页面的落地实现。
• 运用现代化组件库nativewind，高效完成网站样式的实现，同时能够利用expo处理不同平台间的差异；利用monorepo管理项目结构，实现不同框架下的组件共享。
• 全程参与项目从零到一的设计与讨论，分工协作完成整个项目各类需求的落地。`,
    link: "https://air.pufflearn.com/",
    duration: "Project Experience",
  },
];

function Experience({ progress = 0 }) {
  const shouldShow = progress > 0.7; // 稍微提前触发显示
  const normalizedProgress = (progress - 0.7) / 0.3; // 将进度标准化到 0-1 范围

  return (
    <section className="relative h-[300svh]">
      {/* Progress indicator */}
      {shouldShow && (
        <div className="sticky top-1/2 left-[0.9375rem] flex w-[11px] -translate-y-1/2 flex-col justify-between overflow-hidden h-[40svh]">
          <div className="absolute bottom-0 left-[4px] top-0 z-0 w-[1px] -translate-x-1/2 bg-[#4c4c4c]">
            <div
              className="absolute top-0 left-0 w-full bg-white transition-transform duration-500"
              style={{
                height: "100%",
                transform: `scaleY(${Math.max(0, Math.min(1, normalizedProgress))})`,
                transformOrigin: "top",
              }}
            />
          </div>

          {experiences.map((_, index) => (
            <div
              key={index}
              className="relative z-20 size-[8px] rounded-full transition-all duration-500"
              style={{
                backgroundColor:
                  normalizedProgress >= index / experiences.length ? "#fff" : "#4c4c4c",
                transform: `scale(${normalizedProgress >= index / experiences.length ? 1.2 : 1})`,
              }}
            />
          ))}
        </div>
      )}

      {/* Experience cards */}
      {experiences.map((exp, index) => (
        <div
          key={exp.title}
          className="sticky top-0 h-[100svh] flex items-center px-[2rem]"
          style={{
            opacity: shouldShow ? 1 : 0,
          }}
        >
          <div
            className="max-w-4xl mx-auto w-full transform transition-all duration-700"
            style={{
              transform: `translate3d(0, ${
                shouldShow ? (normalizedProgress * 2 - index / experiences.length) * -100 : 100
              }px, 0)`,
              opacity: Math.max(
                0,
                Math.min(
                  1,
                  shouldShow ? 1 - Math.abs(normalizedProgress * 2 - index / experiences.length) : 0
                )
              ),
            }}
          >
            <a
              href={exp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
                <h3 className="text-2xl font-bold text-blue-200">{exp.title}</h3>
                <span className="text-slate-400 text-sm md:text-base">{exp.duration}</span>
              </div>
              <p className="text-slate-300 whitespace-pre-line text-sm leading-relaxed">
                {exp.description}
              </p>
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Experience;
