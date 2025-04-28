import { HoverEffect } from "../ui/card-hover-effect";
import { IconCloud } from "../ui/icon-cloud";

const slugs = [
  "typescript",
  "javascript",
  "react",
  "html5",
  "css3",
  "git",
  "github",
  "tailwindcss",
  "nextdotjs",
  "cplusplus",
  "python",
  "vercel",
];
const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`);

const skills = [
  {
    title: "React/Next.js",
    description:
      "I built some personal website using Next.js and React, which you can see in the project section. Also, I help built dreamle.ai at Company Decoda AI mainly with React and Next.js",
  },
  {
    title: "Typescript/Javascript",
    description:
      "I have a solid foundation in Typescript and Javascript, which is the main language I use for building web applications.",
  },
  {
    title: "HTML5/CSS3",
    description:
      "The basic of web development, I am comfortable with both functional and class-based components.",
  },
  {
    title: "Git/Github",
    description:
      "I am comfortable with the workflow of Git and Github and I often use it for collaborating with my team.",
  },
  {
    title: "TailwindCSS",
    description:
      "A modern CSS framework, which I often use for building responsive and beautiful website.",
  },
  {
    title: "Python",
    description:
      "I used Python for building some deep learning models. I made a dog-nose-detection model using Pytorch. I also want to use it to build some personal website for analyzing data.",
  },
];

function Skills() {
  return (
    <section className="relative flex h-[100svh] items-center overflow-visible pt-0 text-white px-[2rem]">
      <div
        className="flex flex-col lg:flex-row transform w-full"
        style={{
          opacity: 1,
          transform: `translateY(${400}px)`,
        }}
      >
        <div className="relative flex flex-col lg:w-1/2 w-full items-center justify-center rounded-lg px-8 md:px-20 pb-8 pt-8">
          <span className="text-white text-[2.5rem] font-bold leading-none tracking-wider">
            Skills
          </span>
          <IconCloud images={images} />
        </div>
        <HoverEffect items={skills} className="lg:w-1/2 w-full" />
      </div>
    </section>
  );
}

export default Skills;
