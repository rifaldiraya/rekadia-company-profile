import type { ImageAsset } from "@/types/content";

/**
 * Every image on the public site resolves through this map.
 * All entries currently point to dummy placeholders; see docs/ASSETS.md for the
 * original Rekadia asset behind each key. Replace `src` (and the size if it differs)
 * to switch to the real asset.
 */
const placeholder = (file: string, width: number, height: number, alt: string): ImageAsset => ({
  src: `/images/placeholders/${file}`,
  width,
  height,
  alt,
});

export const IMAGES = {
  logo: placeholder("logo.svg", 260, 80, "Rekadia"),
  logoWhite: placeholder("logo-white.svg", 260, 80, "Rekadia"),
  ogImage: placeholder("og-image.png", 1200, 630, "Rekadia"),

  hero: placeholder("hero.svg", 1600, 1066, "Business team working with an AI assistant and data dashboards"),

  featureExpert: placeholder("feature-expert.svg", 800, 800, "Friendly IT expert illustration"),
  featureEasy: placeholder("feature-easy.svg", 800, 800, "Easy-to-understand AI illustration"),
  featureSolution: placeholder("feature-solution.svg", 800, 800, "Ready-to-use solutions illustration"),
  featurePartner: placeholder("feature-partner.svg", 800, 800, "Long term partner illustration"),

  aiBgQualityAssurance: placeholder("ai-bg-quality-assurance.svg", 442, 800, ""),
  aiBgAudit: placeholder("ai-bg-audit.svg", 442, 800, ""),
  aiBgChatbot: placeholder("ai-bg-chatbot.svg", 442, 800, ""),
  aiBgCvScreening: placeholder("ai-bg-cv-screening.svg", 442, 800, ""),
  aiBgVoiceAnalytics: placeholder("ai-bg-voice-analytics.svg", 442, 800, ""),

  aiSlideQualityAssurance: placeholder("ai-slide-quality-assurance.svg", 884, 1600, "AI Quality Assurance"),
  aiSlideAudit: placeholder("ai-slide-audit.svg", 884, 1600, "AI Audit"),
  aiSlideChatbot: placeholder("ai-slide-chatbot.svg", 884, 1600, "AI Chatbot"),
  aiSlideCvScreening: placeholder("ai-slide-cv-screening.svg", 884, 1600, "AI CV Screening"),
  aiSlideVoiceAnalytics: placeholder("ai-slide-voice-analytics.svg", 884, 1600, "AI Voice Analytics"),

  productDelva: placeholder("product-delva.svg", 1400, 748, "Delva by Rekadia dashboard"),
  productEOfficeEmail: placeholder("product-e-office-email.svg", 503, 343, "E-Office Email inbox"),
  productEOffice: placeholder("product-e-office.svg", 463, 373, "E-Office document workspace"),

  clientTheEnergy: placeholder("client-the-energy.svg", 384, 160, "The Energy Building"),
  clientAskrindo: placeholder("client-askrindo.svg", 384, 160, "Askrindo"),
  clientBankIndonesia: placeholder("client-bank-indonesia.svg", 384, 160, "Bank Indonesia"),
  clientBca: placeholder("client-bca.svg", 384, 160, "Bank BCA"),
  clientBtn: placeholder("client-btn.svg", 384, 160, "Bank BTN"),
  clientBukitAsam: placeholder("client-bukit-asam.svg", 384, 160, "Bukit Asam"),
  clientCityvision: placeholder("client-cityvision.svg", 384, 160, "CityVision"),

  avatarNataliaOdang: placeholder("avatar-natalia-odang.svg", 160, 160, "Natalia Odang"),
  avatarKartika: placeholder("avatar-kartika.svg", 160, 160, "Kartika"),
  avatarHermenBustaman: placeholder("avatar-hermen-bustaman.svg", 160, 160, "Hermen Bustaman"),
  avatarAriefJauhari: placeholder("avatar-arief-jauhari.svg", 160, 160, "Arief Jauhari"),
  avatarDediSahendra: placeholder("avatar-dedi-sahendra.svg", 160, 160, "Dedi Sahendra"),

  solutionsAiAgenticAi: placeholder("solutions-ai-agentic-ai.svg", 533, 800, ""),
  solutionsAiChatbot: placeholder("solutions-ai-chatbot.svg", 800, 533, ""),
  solutionsAiQualityAssurance: placeholder("solutions-ai-quality-assurance.svg", 800, 533, ""),
  solutionsAiAudit: placeholder("solutions-ai-audit.svg", 800, 533, ""),
  solutionsAiCvScreening: placeholder("solutions-ai-cv-screening.svg", 640, 800, ""),
  solutionsAiVoiceAnalytics: placeholder("solutions-ai-voice-analytics.svg", 568, 800, ""),

  stepNeedsAssessment: placeholder("step-needs-assessment.svg", 800, 800, "Consultant assessing business needs"),
  stepAiConfiguration: placeholder("step-ai-configuration.svg", 800, 800, "Robot configuring an AI system on a tablet"),
  stepSystemIntegration: placeholder("step-system-integration.svg", 800, 800, "Person connecting dashboards and systems"),
  stepGoLive: placeholder("step-go-live.svg", 800, 800, "Team reviewing live performance charts"),

  businessWebMobileApp: placeholder("business-web-mobile-app.svg", 796, 500, ""),
  businessIntelligence: placeholder("business-intelligence.svg", 796, 566, ""),
  businessSystemIntegration: placeholder("business-system-integration.svg", 796, 597, ""),
  businessWorkflowAutomation: placeholder("business-workflow-automation.svg", 796, 530, ""),

  officeMicrosoft365: placeholder("office-microsoft-365.svg", 796, 530, ""),
  officeGoogleWorkspace: placeholder("office-google-workspace.svg", 796, 530, ""),
  officeAdobeAutodesk: placeholder("office-adobe-autodesk.svg", 796, 530, ""),
  officeCyberSecurity: placeholder("office-cyber-security.svg", 796, 530, ""),

  deviceBusinessLaptop: placeholder("device-business-laptop.svg", 530, 796, ""),
  deviceIndustrial: placeholder("device-industrial.svg", 1096, 500, ""),
  deviceCommercialDisplay: placeholder("device-commercial-display.svg", 530, 796, ""),
  deviceNas: placeholder("device-nas.svg", 796, 530, ""),

  infraCloudServer: placeholder("infra-cloud-server.svg", 796, 448, ""),
  infraPhysicalServer: placeholder("infra-physical-server.svg", 796, 530, ""),
  infraCloudBackup: placeholder("infra-cloud-backup.svg", 796, 530, ""),

  logoEOffice: placeholder("logo-e-office.svg", 112, 32, "E-Office"),
  logoDelva: placeholder("logo-delva.svg", 97, 30, "Delva"),
  eOfficeEmailHero: placeholder("e-office-email-hero.svg", 631, 429, "E-Office Email inbox on a laptop"),
  delvaHero: placeholder("delva-hero.svg", 504, 269, "Delva maintenance dashboard on a laptop and phone"),
  delvaHeroBackground: placeholder("delva-hero-background.svg", 2880, 1332, ""),
  delvaCaseStudyBackground: placeholder("delva-case-study-background.svg", 2880, 1752, ""),
  delvaFeatureDashboard: placeholder("delva-feature-dashboard.svg", 1877, 910, "Delva findings dashboard"),
  delvaFeatureMaintenancePlan: placeholder(
    "delva-feature-maintenance-plan.svg",
    1903,
    906,
    "Delva task schedule calendar",
  ),
  delvaFeatureChecksheet: placeholder("delva-feature-checksheet.svg", 720, 1600, "Delva checksheet on the mobile app"),
  delvaFeatureFinding: placeholder("delva-feature-finding.svg", 1882, 905, "Delva findings management screen"),

  caseStudyNotarisKartika: placeholder("case-study-notaris-kartika.svg", 1920, 1080, ""),
  caseStudyPlnEnergiGas: placeholder("case-study-pln-energi-gas.svg", 1078, 604, ""),
  caseStudyKapBep: placeholder("case-study-kap-bep.svg", 1280, 720, ""),
  logoNotarisKartika: placeholder("logo-notaris-kartika.svg", 96, 10, "Notaris Kartika"),
  logoPlnEnergiGas: placeholder("logo-pln-energi-gas.svg", 2098, 876, "PLN Energi Gas"),
  logoKapBep: placeholder("logo-kap-bep.svg", 300, 125, "KAP BEP"),

  benefitTimeEfficiency: placeholder("benefit-time-efficiency.svg", 1009, 568, ""),
  benefitSecurity: placeholder("benefit-security.svg", 1009, 568, ""),
  benefitVisibility: placeholder("benefit-visibility.svg", 1009, 568, ""),
  benefitPaperless: placeholder("benefit-paperless.svg", 1009, 568, ""),

  clientDapenBki: placeholder("client-dapen-bki.svg", 384, 160, "Dana Pensiun Biro Klasifikasi Indonesia"),
  clientSorikMarapi: placeholder("client-sorik-marapi.svg", 384, 160, "PT Sorik Marapi Geothermal Power"),
  clientStepPoint: placeholder("client-step-point.svg", 384, 160, "PT Step Point Indonesia"),

  avatarAndiPratama: placeholder("avatar-andi-pratama.svg", 160, 160, "Andi Pratama"),
  avatarNovitaSari: placeholder("avatar-novita-sari.svg", 160, 160, "Novita Sari"),
  avatarRoni: placeholder("avatar-roni.svg", 160, 160, "Roni"),

  industryCorporate: placeholder("industry-corporate.svg", 442, 800, ""),
  industryEducation: placeholder("industry-education.svg", 442, 800, ""),
  industryFinance: placeholder("industry-finance.svg", 442, 800, ""),
  industryHealthcare: placeholder("industry-healthcare.svg", 442, 800, ""),
  industryManufacturing: placeholder("industry-manufacturing.svg", 442, 800, ""),

  aboutTeam1: placeholder("about-team-1.svg", 800, 600, "The Rekadia team"),
  aboutTeam2: placeholder("about-team-2.svg", 1380, 891, "The Rekadia team"),
  aboutTeam3: placeholder("about-team-3.svg", 800, 600, "The Rekadia team"),

  blogCover: placeholder("blog-cover.svg", 1200, 630, ""),

  ctaBackground: placeholder("cta-background.svg", 1920, 920, ""),
  pageBanner: placeholder("page-banner.svg", 1920, 504, ""),
  officeMap: placeholder("office-map.svg", 1072, 400, "Map to the Rekadia office at AIA Central, Jakarta"),
} satisfies Record<string, ImageAsset>;
