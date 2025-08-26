import Hero from '../components/Hero';
import RoleCard from '../components/RoleCard';

// Home page with a hero introduction and cards for each professional domain.
export default function Home() {
  return (
    <>
      <Hero
        heading="Hello, I'm Your Name"
        subheading="AI/ML Engineer, Data Professional & Web Developer passionate about building intelligent solutions"
      />
      <section className="role-cards">
        <RoleCard
          title="AI/ML Engineer"
          description="Building intelligent systems and machine learning solutions."
          path="/ai"
        />
        <RoleCard
          title="Data Professional"
          description="Transforming raw data into actionable insights."
          path="/data"
        />
        <RoleCard
          title="Web Developer"
          description="Crafting responsive web applications with delightful experiences."
          path="/web"
        />
      </section>
    </>
  );
}