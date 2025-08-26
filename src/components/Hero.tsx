import { ReactNode } from 'react';

interface HeroProps {
  heading: string;
  subheading?: string;
  children?: ReactNode;
}

// Generic hero component used at the top of pages to display a heading,
// optional subheading and optional call-to-action content.
export default function Hero({ heading, subheading, children }: HeroProps) {
  return (
    <section className="hero">
      <h1>{heading}</h1>
      {subheading && <p>{subheading}</p>}
      {children}
    </section>
  );
}