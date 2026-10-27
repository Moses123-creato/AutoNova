import SwipeHero from "@/components/services/swipe-hero";

/**
 * Services — the site's main Services section.
 *
 * A scroll-pinned carousel in a contained panel: the box stays fixed while you
 * scroll through each service, and the name and its description swap as you go.
 *
 * Typography comes from the site design system (Orbitron display, Inter body).
 */
export function ServicesSection() {
  return <SwipeHero height={720} scrollPerService={420} title="Our Services" eyebrow="What we build" />;
}

export default ServicesSection;
