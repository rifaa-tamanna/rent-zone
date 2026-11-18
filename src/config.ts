/**
 * RentZone hero section configuration.
 * Edit slide content, HD image URLs, and slider behaviour here —
 * no component or stylesheet changes are needed.
 */

export interface HeroSlide {
  /** Unique key for React. */
  id: string;
  /** Small uppercase label above the heading. */
  eyebrow: string;
  /** Main heading of the slide. */
  title: string;
  /** Supporting paragraph below the heading. */
  description: string;
  /** Primary gradient button label. */
  ctaLabel: string;
  /** Primary gradient button destination. */
  ctaHref: string;
  /** HD Unsplash image URL shown on the right. */
  image: string;
  /** Descriptive alt text for the image. */
  imageAlt: string;
  /** Floating caption card overlaid on the image. */
  tag: string;
}

export const heroSliderSettings = {
  /** Automatically advance to the next slide. */
  autoplay: true,
  /** Time each slide stays on screen, in milliseconds. */
  interval: 6000,
  /** Crossfade duration between slides, in milliseconds. */
  transitionMs: 700,
  /** Pause autoplay while the pointer is over the hero. */
  pauseOnHover: true,
} as const;

/** Build a sized, HD Unsplash URL from a photo id. */
const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1600&auto=format&fit=crop`;

export const heroSlides: HeroSlide[] = [
  {
    id: "machinery",
    eyebrow: "Premium Equipment Rental",
    title: "Trusted Machinery & Equipment Rentals",
    description:
      "Rent quality equipment for construction, infrastructure, and agricultural projects — delivered on time, every time.",
    ctaLabel: "View Our Fleet",
    ctaHref: "/equipment",
    image: unsplash("photo-1580901368919-7738efb0f87e"),
    imageAlt: "Excavator working on a rocky mountain construction site",
    tag: "Excavators & Loaders",
  },
  {
    id: "earthmoving",
    eyebrow: "Earthmoving Fleet",
    title: "Power for Every Job Site",
    description:
      "From dump trucks to diggers, our well-serviced fleet keeps your project moving with flexible daily and weekly rates.",
    ctaLabel: "Browse Equipment",
    ctaHref: "/equipment",
    image: unsplash("photo-1517089152318-42ec560349c0"),
    imageAlt: "Aerial view of excavators and dump trucks moving earth",
    tag: "Earthmoving Equipment",
  },
  {
    id: "construction",
    eyebrow: "Built for Deadlines",
    title: "Reliable Machines, Certified Operators",
    description:
      "Maintenance-backed equipment and on-site support so your build never stops — book by the day, week, or month.",
    ctaLabel: "Get a Quote",
    ctaHref: "/contact",
    image: unsplash("photo-1504307651254-35680f356dfd"),
    imageAlt: "Construction crew working with steel reinforcement on site",
    tag: "Construction Ready",
  },
  {
    id: "projects",
    eyebrow: "Flexible Plans",
    title: "Rent Smart. Work Better.",
    description:
      "Transparent pricing, fast delivery, and quick maintenance keep your costs predictable from first day to final handover.",
    ctaLabel: "Start Renting",
    ctaHref: "/register",
    image: unsplash("photo-1508450859948-4e04fabaa4ea"),
    imageAlt: "Multi-storey building under construction with scaffolding",
    tag: "Project-Ready Fleet",
  },
];
