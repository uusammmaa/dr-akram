import {
  BookOpen,
  Building2,
  GraduationCap,
  Landmark,
  Mic,
  Newspaper,
  type LucideIcon,
} from "lucide-react";

export type CareerMilestone = {
  id: string;
  year: string;
  titleKey:
    | "timeline.headDept"
    | "timeline.textbook"
    | "timeline.afaq"
    | "timeline.afkar"
    | "timeline.punjab"
    | "timeline.2020";
  icon: LucideIcon;
};

export const careerMilestones: CareerMilestone[] = [
  {
    id: "headDept",
    year: "—",
    titleKey: "timeline.headDept",
    icon: Landmark,
  },
  {
    id: "textbook",
    year: "—",
    titleKey: "timeline.textbook",
    icon: BookOpen,
  },
  {
    id: "afaq",
    year: "—",
    titleKey: "timeline.afaq",
    icon: Building2,
  },
  {
    id: "afkar",
    year: "—",
    titleKey: "timeline.afkar",
    icon: Newspaper,
  },
  {
    id: "punjab",
    year: "—",
    titleKey: "timeline.punjab",
    icon: GraduationCap,
  },
  {
    id: "2020",
    year: "2020",
    titleKey: "timeline.2020",
    icon: GraduationCap,
  },
];

export const credentialsKeys = [
  "credentials.phd",
  "credentials.msc",
  "credentials.ma",
] as const;

export type ServiceConfig = {
  id: string;
  icon: LucideIcon;
  titleKey: "home.dars" | "home.economics" | "home.speaking";
  descKey: "home.darsDesc" | "home.economicsDesc" | "home.speakingDesc";
  href: "/services";
};

export const servicesConfig: ServiceConfig[] = [
  {
    id: "dars",
    icon: BookOpen,
    titleKey: "home.dars",
    descKey: "home.darsDesc",
    href: "/services",
  },
  {
    id: "economics",
    icon: GraduationCap,
    titleKey: "home.economics",
    descKey: "home.economicsDesc",
    href: "/services",
  },
  {
    id: "speaking",
    icon: Mic,
    titleKey: "home.speaking",
    descKey: "home.speakingDesc",
    href: "/services",
  },
];

export type FeaturedItem = {
  id: string;
  titleKey: "home.featuredBooks" | "home.featuredHonors";
  href: "/books" | "/honors";
  icon: LucideIcon;
};

export const featuredItems: FeaturedItem[] = [
  {
    id: "books",
    titleKey: "home.featuredBooks",
    href: "/books",
    icon: BookOpen,
  },
  {
    id: "honors",
    titleKey: "home.featuredHonors",
    href: "/honors",
    icon: Landmark,
  },
  {
    id: "books2",
    titleKey: "home.featuredBooks",
    href: "/books",
    icon: BookOpen,
  },
  {
    id: "honors2",
    titleKey: "home.featuredHonors",
    href: "/honors",
    icon: Landmark,
  },
];

export type LatestItem = {
  id: string;
  titleKey:
    | "home.latestLectures"
    | "home.latestQuestions"
    | "home.latestAfkar";
  href: "/lectures" | "/questions" | "/afkar";
  icon: LucideIcon;
};

export const latestItems: LatestItem[] = [
  {
    id: "lectures",
    titleKey: "home.latestLectures",
    href: "/lectures",
    icon: Mic,
  },
  {
    id: "questions",
    titleKey: "home.latestQuestions",
    href: "/questions",
    icon: BookOpen,
  },
  {
    id: "afkar",
    titleKey: "home.latestAfkar",
    href: "/afkar",
    icon: Newspaper,
  },
];
