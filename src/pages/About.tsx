import Hero from '../components/Hero';

// About page providing a personal narrative, skills and philosophy.
export default function About() {
  return (
    <>
      <Hero heading="About Me" subheading="The story behind my journey in AI, data and web development." />
      <div className="container">
        <p>
          Hello! I'm a multi‑disciplinary engineer combining expertise in artificial intelligence, data science and web development. My journey began with a curiosity for how software could solve complex problems and has since evolved into building intelligent products, uncovering insights from data and crafting elegant user experiences.
        </p>
        <p>
          I thrive on bridging domains. As an AI/ML engineer I design and deploy machine learning systems that power real‑world applications. As a data professional I translate raw datasets into actionable business intelligence. And as a web developer I create responsive and scalable web applications with modern frameworks.
        </p>
        <p>
          Beyond work, I enjoy writing about my learnings, mentoring aspiring developers and contributing to open source. When I'm not coding you might find me experimenting with new technologies, reading research papers or exploring nature.
        </p>
      </div>
    </>
  );
}