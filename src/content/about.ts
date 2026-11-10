import { IMAGES } from "@/content/images";

export type AboutIcon = "vision" | "mission" | "make-it-works" | "ai-driven" | "professional" | "approachable";

export const ABOUT_PAGE = {
  title: "About",
  metaTitle: "About Rekadia Solusi Teknologi | 10+ Years IT Expertise",
  metaDescription:
    "Rekadia is a trusted IT partner making technology easy for non-IT businesses in Indonesia. AI-driven solutions, professional service, measurable results.",
  bannerDescription: "Rekadia helps you realize business progress by implementing current digital transformation.",
};

export const ABOUT_INTRO = {
  heading: "We are an IT Partner that makes technology easy for your business.",
  subheading:
    "Since its inception, Rekadia has been present to bridge non-IT businesses with the ever-evolving world of technology.",
  paragraphs: [
    "Rekadia was born out of a desire to connect people with advanced technology. It was founded by a group of innovators who believe that everyone deserves better access to information and services.",
    "Since its inception, Rekadia has been committed to creating solutions that simplify everyday life, continuously innovating and adapting to the evolving needs of society.",
  ],
  photos: [IMAGES.aboutTeam1, IMAGES.aboutTeam2, IMAGES.aboutTeam3],
};

export const ABOUT_VISION_MISSION: { icon: AboutIcon; title: string; description: string }[] = [
  {
    icon: "vision",
    title: "Vision",
    description: "To be the #1 most trusted IT partner for non-IT businesses in Indonesia",
  },
  {
    icon: "mission",
    title: "Mission",
    description: "Making technology easy, relevant, and impactful for every business we work with",
  },
];

export const ABOUT_PHILOSOPHY = {
  label: "Our Philoshophy",
  heading: "Technology must serve humanity",
  description:
    "We believe the best technology is the one that doesn't feel complicated — the one that works behind the scenes enough so you can focus on what matters: your business.",
  values: [
    {
      icon: "make-it-works",
      title: "Make IT Works",
      description:
        "Technology must have a real impact. No project is successful if it doesn't deliver measurable business results.",
    },
    {
      icon: "ai-driven",
      title: "AI-Driven",
      description: "We leverage artificial intelligence to deliver smarter, faster, and more accurate solutions.",
    },
    {
      icon: "professional",
      title: "Professional",
      description: "High standards of work on every project, from planning to delivery and support.",
    },
    {
      icon: "approachable",
      title: "Approachable",
      description: "Technically proficient, easy to understand for everyone — from owners to operational staff.",
    },
  ] satisfies { icon: AboutIcon; title: string; description: string }[],
};
