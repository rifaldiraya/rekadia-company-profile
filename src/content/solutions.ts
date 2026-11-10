import { IMAGES } from "@/content/images";
import { ROUTES } from "@/content/site";
import type { ProcessStep, SolutionCard, SolutionGroup } from "@/types/content";

export const SOLUTIONS_PAGE = {
  title: "Solutions",
  description: "Rekadia helps you drive business growth through the implementation of digital transformation today.",
};

export const AI_SOLUTIONS_INTRO = {
  label: "Rekadia AI Solutions",
  title: "AI Solutions",
  description:
    "Manual QA processes are slow and prone to errors / Customers need a quick response 24/7 / CV screening is time-consuming for HR / Audits require significant resources",
};

export const AI_SOLUTION_CARDS: SolutionCard[] = [
  {
    title: "Agentic \nAI",
    description:
      "AI that can make decisions and perform tasks automatically—operational efficiency without the need for constant manual intervention.",
    image: IMAGES.solutionsAiAgenticAi,
  },
  {
    title: "AI \nChatbot",
    description:
      "Serve your customers 24/7 without expanding your team. An AI chatbot that understands your business context and can answer questions, guide transactions, and even escalate issues to a human agent.",
    image: IMAGES.solutionsAiChatbot,
  },
  {
    title: "AI \nQuality Assurance",
    description:
      "Ensure product/service quality with AI-powered automated detection—faster, more accurate, and more cost-effective than manual QA.",
    image: IMAGES.solutionsAiQualityAssurance,
  },
  {
    title: "AI \nAudit",
    description: "A more efficient audit process: AI analyzes the data in minutes—all you have to do is make a decision.",
    image: IMAGES.solutionsAiAudit,
  },
  {
    title: "AI \nCV Screening",
    description: "Filter through hundreds of resumes in minutes and find the best candidates based on your criteria.",
    image: IMAGES.solutionsAiCvScreening,
  },
  {
    title: "AI \nVoice Analytics",
    description:
      "Turn recorded conversations into business insights—analyze service quality, identify patterns, and improve team performance.",
    image: IMAGES.solutionsAiVoiceAnalytics,
  },
];

export const PROCESS_INTRO = {
  label: "Rekadia AI Solutions",
  title: "How it works?",
};

export const PROCESS_STEPS: ProcessStep[] = [
  { title: "1. Needs Assessment", image: IMAGES.stepNeedsAssessment },
  { title: "2. AI Configuration", image: IMAGES.stepAiConfiguration },
  { title: "3. System Integration", image: IMAGES.stepSystemIntegration },
  { title: "4. Go Live & Monitor", image: IMAGES.stepGoLive },
];

export const BUSINESS_APPLICATIONS: SolutionGroup = {
  id: "business-applications",
  label: "Rekadia Business Applications",
  title: "Business Applications",
  description:
    "Business processes are still manual and inefficient / We need a custom application tailored to our workflow / Systems are not integrated with one another",
  cards: [
    {
      title: "Web & \nMobile App",
      description: "Web and mobile apps built to meet your business’s specific needs—not generic templates.",
      image: IMAGES.businessWebMobileApp,
    },
    {
      title: "Business Intelligence",
      description:
        "Dashboards and real-time reports that management can understand at a glance—no Excel expertise required.",
      image: IMAGES.businessIntelligence,
    },
    {
      title: "System Integration",
      description:
        "Connect all the systems you’re already using so that data flows seamlessly without manual intervention.",
      image: IMAGES.businessSystemIntegration,
    },
    {
      title: "Workflow Automation",
      description: "Automate repetitive workflows to save your team time and reduce human error.",
      image: IMAGES.businessWorkflowAutomation,
    },
  ],
};

export const RESULTS_STRIP = {
  title: "We focus on results, not features—we build apps that your team will actually use.",
  cta: { label: "Discuss Your Application Needs", href: ROUTES.contactUs },
};

export const OFFICE_SOLUTIONS: SolutionGroup = {
  id: "office-solutions",
  label: "Rekadia Office Solutions",
  title: "Office Solution",
  description:
    "Productivity tools are not well managed / Software licenses are disorganized / Corporate data security is vulnerable",
  link: { label: "Optimize Team Productivity & Safety", href: ROUTES.contactUs },
  cards: [
    {
      title: "Microsoft\n365",
      description:
        "Official Microsoft 365 licenses and implementation for optimal team productivity—Teams, SharePoint, OneDrive, and more.",
      image: IMAGES.officeMicrosoft365,
    },
    {
      title: "Google Workspace",
      description: "Google Workspace setup and management for seamless team collaboration from anywhere.",
      image: IMAGES.officeGoogleWorkspace,
    },
    {
      title: "Adobe & AutoDesk",
      description:
        "Creative software solutions and professional design services for teams in need of industry-standard tools.",
      image: IMAGES.officeAdobeAutodesk,
    },
    {
      title: "Cyber Security (S1 & Acronis)",
      description:
        "Comprehensive protection: SentinelOne for endpoint security, Acronis for data backup and recovery.",
      image: IMAGES.officeCyberSecurity,
    },
  ],
};

export const DEVICES: SolutionGroup = {
  id: "devices",
  label: "Rekadia Device",
  title: "Device",
  description: "Work devices do not support productivity / Specialized devices are needed for industrial or field use",
  link: { label: "Device & Hardware Needs Consultation", href: ROUTES.contactUs },
  cards: [
    {
      title: "Business\nLaptop",
      description:
        "Top business laptops for professional performance—we’ll help you choose the right one for your team’s needs.",
      image: IMAGES.deviceBusinessLaptop,
    },
    {
      title: "Industrial\nDevices",
      description: "Rugged hardware for industrial, warehouse, and field environments.",
      image: IMAGES.deviceIndustrial,
    },
    {
      title: "Commercial Display",
      description: "Commercial displays for meeting rooms, lobbies, digital signage, and operational needs.",
      image: IMAGES.deviceCommercialDisplay,
    },
    {
      title: "NAS (Network Attached Storage)",
      description: "A centralized and secure data storage solution for team access from anywhere.",
      image: IMAGES.deviceNas,
    },
  ],
};

export const IT_INFRASTRUCTURE: SolutionGroup = {
  id: "it-infrastructure",
  label: "Rekadia IT Infrastructure",
  title: "IT Infrastructure",
  description: "IT infrastructure is not scalable / Risk of data loss / Downtime that harms the business",
  // The original reuses the Device section's link text here.
  link: { label: "Device & Hardware Needs Consultation", href: ROUTES.contactUs },
  cards: [
    {
      title: "Cloud \nServer",
      description:
        "Flexible, scalable cloud servers ready to support your business growth without the need for major hardware investments.",
      image: IMAGES.infraCloudServer,
    },
    {
      title: "Physical Server\n& GPU",
      description: "Reliable physical servers for on-premises data needs, offering full performance and control.",
      image: IMAGES.infraPhysicalServer,
    },
    {
      title: "Cloud Backup & Disaster Recovery",
      description:
        "Protect your business data from the risk of loss—with automatic backups and fast recovery when needed.",
      image: IMAGES.infraCloudBackup,
    },
  ],
};
