import { IMAGES } from "@/content/images";
import { LIVE_SITE_URL } from "@/content/pending-pages";
import type { ImageAsset } from "@/types/content";

export const ARTICLES_BANNER_DESCRIPTION =
  "Rekadia helps you drive business growth through the implementation of digital transformation today.";

export interface CaseStudyCard {
  category: string;
  title: string;
  summary: string;
  href: string;
  logo: ImageAsset;
  image: ImageAsset;
}

/** Case study detail pages are not migrated yet, so cards link to the live website. */
export const CASE_STUDIES: CaseStudyCard[] = [
  {
    category: "finance",
    title: "Notary Kartika: E-Office as an Integrated Solution for Various Office Challenges",
    summary:
      "Notary Kartika operates a notary practice in the field of legal and notarial services. For over a decade, her office has managed thousands of deed documents and client records that continue to grow daily. As a small-to-medium-sized professional services firm, operational efficiency and data security are two non-negotiables.",
    href: `${LIVE_SITE_URL}/case-study/notary-office-with-over-10-years-of-experience-`,
    logo: IMAGES.logoNotarisKartika,
    image: IMAGES.caseStudyNotarisKartika,
  },
  {
    category: "corporate",
    title: "Energy Companies with Large-Scale and Complex Operations",
    summary:
      "PLN Energi Gas is a company operating in the energy and gas sector with a rapidly expanding business. As business needs and activities grow, the company must manage large volumes of data, documents, and work processes on a daily basis. As a company that prioritizes operational efficiency and reliability, an integrated workflow system and optimal data management are of critical importance.",
    href: `${LIVE_SITE_URL}/case-study/energy-companies-with-large-scale-and-complex-operations`,
    logo: IMAGES.logoPlnEnergiGas,
    image: IMAGES.caseStudyPlnEnergiGas,
  },
  {
    category: "corporate",
    title: "Public Accounting Firm with High Audit Demands",
    summary:
      "KAP BEP is a public accounting firm handling audit and financial reporting for its clients. As the number of clients grew, the need for document management, work efficiency, and team monitoring became increasingly crucial.",
    href: `${LIVE_SITE_URL}/case-study/public-accounting-firms-with-high-audit-demands`,
    logo: IMAGES.logoKapBep,
    image: IMAGES.caseStudyKapBep,
  },
];

export const CASE_STUDY_PAGE = {
  title: "Case Study",
  metaTitle: "Case Study | Rekadia",
  metaDescription:
    "See how Rekadia helps companies across finance, energy, and accounting solve operational challenges with E-Office and integrated digital solutions.",
  label: "Case Study",
  heading: "Find the Case Study You Need",
  searchPlaceholder: "Find case study here",
};

export interface BlogPost {
  category: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  title: string;
  summary: string;
  href: string;
}

export const BLOG_PAGE = {
  title: "Blog",
  metaTitle: "Blog | Rekadia",
  metaDescription:
    "News, events, and practical insights from Rekadia on AI, business software, cloud, and digital transformation.",
  label: "Rekadia Blog",
  heading: "Search for the Topics or News You Need",
  searchPlaceholder: "Find blog here",
  postsPerPage: 10,
  cover: IMAGES.blogCover,
};

/** In the order the live CMS lists them. Detail pages are not migrated yet, so posts link to the live website. */
export const BLOG_POSTS: BlogPost[] = [
  {
    category: "News",
    date: "2026-11-01",
    title: "Your Website Is More Than Just a Digital Business Card",
    summary:
      "A website does more than show your business info. Learn how it builds credibility, supports operations, and helps your business grow.",
    href: `${LIVE_SITE_URL}/news/your-website-is-more-than-just-a-digital-business-card`,
  },
  {
    category: "News",
    date: "2026-11-01",
    title: "From Manual Maintenance to Smarter Asset Management",
    summary:
      "Discover how Delva helps businesses move from manual maintenance to structured, digital asset management with work orders, scheduling, and real-time reports.",
    href: `${LIVE_SITE_URL}/news/from-manual-maintenance-to-smarter-asset-management`,
  },
  {
    category: "News",
    date: "2026-10-19",
    title: "Meet Delva: What It Is, Who Needs It, and What Problems It Solves",
    summary:
      "Meet Delva, a digital solution that helps businesses manage assets and maintenance activities more efficiently. Discover how Delva helps teams monitor asset conditions, report equipment issues, and organize maintenance workflows to support smoother daily operations.",
    href: `${LIVE_SITE_URL}/news/meet-delva-asset-management-and-maintenance-software`,
  },
  {
    category: "News",
    date: "2026-09-29",
    title: "AI in the Workplace: Myths vs Facts You Should Know",
    summary:
      "Will AI replace your job? Separate AI myths from facts at work and learn how to use AI to boost productivity and grow your career.",
    href: `${LIVE_SITE_URL}/news/ai-at-work-myths-vs-facts-you-need-to-know`,
  },
  {
    category: "News",
    date: "2026-09-23",
    title: "Rekadia x MiiTel Host Leaders Table on \"AI Quality Assurance\" to Transform Customer Service",
    summary:
      "Rekadia partners with MiiTel for an exclusive Leaders Table on AI Quality Assurance, helping businesses elevate customer service through AI-driven insights.",
    href: `${LIVE_SITE_URL}/news/rekadia-and-miitel-collaborate-to-present-leaders-table-ai-quality-assurance`,
  },
  {
    category: "News",
    date: "2026-09-15",
    title: "Delva & Qualif.AI: Rekadia IT Solutions for Digital Business",
    summary:
      "Rekadia's Delva and Qualif.AI help companies work faster, smarter, and more efficiently through digital operations and AI-powered recruitment.",
    href: `${LIVE_SITE_URL}/news/meet-rekadias-it-solutions-delva-qualif-ai-for-business-digital-transformation-2`,
  },
  {
    category: "News",
    date: "2026-08-03",
    title: "Still Creating Business Reports Manually Every Month? It’s Time for Business Intelligence.",
    summary:
      "Still creating business reports manually every month? Business Intelligence turns scattered data into faster, clearer, and more actionable business insights.",
    href: `${LIVE_SITE_URL}/news/still-creating-business-reports-manually-every-month-its-time-for-business-intelligence`,
  },
  {
    category: "News",
    date: "2026-06-04",
    title: "5 Signs Your Business Needs a Maintenance Management Application",
    summary:
      "Discover five signs your business needs a maintenance management system and improve efficiency with Delva's real-time reporting solution.",
    href: `${LIVE_SITE_URL}/news/5-signs-your-business-needs-a-maintenance-management-application-switch-to-delva-for-real-time-and-integrated-reporting`,
  },
  {
    category: "News",
    date: "2026-06-11",
    title: "Is Your Software No Longer Meeting Business Needs? The Benefits of Custom Software",
    summary:
      "Custom software helps businesses improve efficiency through solutions designed specifically for their operational needs and growth objectives.",
    href: `${LIVE_SITE_URL}/news/is-your-software-no-longer-meeting-business-needs-consider-custom-software`,
  },
  {
    category: "News",
    date: "2026-04-21",
    title: "Jerome Polin & Menantea Case: $2M Loss, Why ERP and AI Are Crucial to Prevent Business Fraud",
    summary:
      "Jerome Polin’s Rp34B loss highlights why businesses need ERP and AI to prevent fraud, ensure transparency, and secure financial operations.",
    href: `${LIVE_SITE_URL}/news/jerome-polin-menantea-case-2m-loss-why-erp-and-ai-are-crucial-to-prevent-business-fraud`,
  },
  {
    category: "News",
    date: "2026-04-17",
    title: "Vertical AI for Business: Benefits, Use Cases, and Industry Applications",
    summary:
      "Vertical AI is industry-specific AI that helps businesses improve efficiency, accuracy, and data-driven decision-making across sectors.",
    href: `${LIVE_SITE_URL}/news/vertical-ai-for-business-benefits-use-cases-and-industry-applications`,
  },
  {
    category: "News",
    date: "2026-04-10",
    title: "AI Regulations 2026: Global Trends and Their Impact on Businesses in Indonesia",
    summary:
      "AI regulations in 2026 are tightening globally. Discover key trends and how they impact your business strategy.",
    href: `${LIVE_SITE_URL}/news/ai-regulations-2026-global-trends-and-their-impact-on-businesses-in-indonesia`,
  },
  {
    category: "News",
    date: "2026-04-03",
    title: "SMEs Using AI Can Increase Revenue by Up to 26%",
    summary:
      "SMEs using AI can increase revenue up to 26%. Learn the benefits, strategies, and implementation for your business.",
    href: `${LIVE_SITE_URL}/news/the-secret-behind-26-revenue-growth-its-ai`,
  },
  {
    category: "News",
    date: "2026-02-06",
    title: "Tech Investment That Delivers Fast ROI for Business Growth",
    summary:
      "The right tech investment helps businesses improve efficiency, reduce operational costs, and achieve faster ROI through smart digital solutions. In today’s competitive market, technology investment is no longer about adopting the latest trend. It’s about choosing solutions that create real impact. Businesses are now prioritizing tech investments that deliver fast ROI and measurable results.",
    href: `${LIVE_SITE_URL}/news/tech-investment-that-delivers-fast-roi-for-business-growth`,
  },
  {
    category: "News",
    date: "2025-11-03",
    title: "Why Instagram Ads Feel So Connected to What You Just Talked About – Explained by the Instagram Bos",
    summary:
      "Ever feel like Instagram reads your mind? Here's what Adam Mosseri, Head of Instagram, says about it.",
    href: `${LIVE_SITE_URL}/news/why-instagram-ads-feel-so-connected-to-what-you-just-talked-about---explained-by-the-instagram-boss`,
  },
  {
    category: "Event",
    date: "2026-03-13",
    title: "Strengthening Commitment to Digital Transformation, RekadiaParticipates in the Success of IAPI & ISCA International Conference 2025 in Jakarta",
    summary:
      "Rekadia proudly supports the IAPI & ISCA International Conference 2025 in Jakarta, showcasing the E-Office solution for secure sustainability reporting by accountants.",
    href: `${LIVE_SITE_URL}/news/strengthening-commitment-to-digital-transformation-rekadia-participates-in-the-success-of-iapi-isca-international-conference-2025-in-jakarta`,
  },
  {
    category: "Tech",
    date: "2026-01-30",
    title: "AWS vs Azure vs Google Cloud 2025: Which Cloud Platform is Best?",
    summary:
      "Confused about choosing between AWS, Azure, or Google Cloud in 2025? Get an in-depth analysis of service comparisons, pricing, and the advantages and disadvantages of each cloud platform to find the best solution for your business in Indonesia.",
    href: `${LIVE_SITE_URL}/news/aws-vs-azure-vs-google-cloud-2025-which-cloud-platform-is-best`,
  },
  {
    category: "Education",
    date: "2026-01-23",
    title: "Do You Want Your Business Website To Load Faster? Here's How",
    summary:
      "Your business website is slow? Don't lose customers. Learn how to make your website load faster with hosting, image, and code optimization.",
    href: `${LIVE_SITE_URL}/news/do-you-want-your-business-website-to-load-faster-heres-how`,
  },
  {
    category: "Tech",
    date: "2025-09-11",
    title: "Getting to Know About SaaS and Its License Types",
    summary:
      "Understand what SaaS (Software as a Service) is, how it works, and the different types of licenses. An in-depth analysis of the strengths and weaknesses of each model for vendors and customers.",
    href: `${LIVE_SITE_URL}/news/getting-to-know-about-saas-and-its-license-types`,
  },
  {
    category: "Education",
    date: "2025-09-10",
    title: "How to Choose a Strategic IT Vendor to Drive Business Growth in the Digital Age",
    summary:
      "Learn 8 ways to choose a strategic IT vendor to support digital transformation and sustainable business growth.",
    href: `${LIVE_SITE_URL}/news/how-to-choose-a-strategic-it-vendor-to-drive-business-growth-in-the-digital-age`,
  },
  {
    category: "Tech",
    date: "2025-09-02",
    title: "Cloud Server vs Private Server: Which Is the Right Choice for Your Business?",
    summary:
      "Cloud server vs. private server: which is right for your business? Explore the key differences in cost, security, and management to make the best choice.",
    href: `${LIVE_SITE_URL}/news/cloud-server-vs-private-server-which-is-the-right-choice-for-your-business`,
  },
  {
    category: "Education",
    date: "2025-08-29",
    title: "Getting to Know Portfolio Management: The Key to Success in Developing a More Systematic Business",
    summary:
      "Understand the definitions, functions, and objectives of portfolio management to align projects with business strategies. Learn how to systematically grow your company and maximize ROI with the right solutions.",
    href: `${LIVE_SITE_URL}/news/getting-to-know-portfolio-management-the-key-to-success-in-developing-a-more-systematic-business`,
  },
  {
    category: "Education",
    date: "2026-02-20",
    title: "5 Trusted IT Companies 2025 Edition",
    summary:
      "Guide to choosing 5 trusted IT companies 2025. Find the best technology partners for the stability and growth of your business in the digital age.",
    href: `${LIVE_SITE_URL}/news/5-trusted-it-companies-2025-edition`,
  },
  {
    category: "Tech",
    date: "2025-08-19",
    title: "Power BI vs Looker Studio: Which One Is Right For Your Business Data Visualization?",
    summary:
      "Choosing between Power BI and Looker Studio? This guide explores a comparison of features, costs, and ideal use scenarios to help you make strategic decisions.",
    href: `${LIVE_SITE_URL}/news/power-bi-vs-looker-studio-which-one-is-right-for-your-business-data-visualization`,
  },
  {
    category: "Tech",
    date: "2025-08-14",
    title: "Comparison of Storage Media vs E-Office Alternatives for Company Data Security",
    summary:
      "Confused about choosing between Google Drive, Dropbox, NAS, or E-Office? Compare these company's data storage solutions to find the best way to prevent file theft and secure your business's digital assets.",
    href: `${LIVE_SITE_URL}/news/comparison-of-storage-media-vs-e-office-alternatives-for-company-data-security`,
  },
  {
    category: "News",
    date: "2026-01-16",
    title: "Amid the AI Craze, NVIDIA CEO Says He’d Choose Physics Over Software?",
    summary:
      "NVIDIA CEO Jensen Huang says the future of AI isn't just code, it's physics. Find out which skills will truly matter for the next tech revolution.",
    href: `${LIVE_SITE_URL}/news/amid-the-ai-craze-nvidia-ceo-says-hed-choose-physics-over-software`,
  },
  {
    category: "News",
    date: "2026-01-02",
    title: "Zuckerberg's Big Move: Meet Meta's AI Super Team, a Serious Challenger to ChatGPT",
    summary:
      "Meta forms an AI \"super team\" to challenge OpenAI's ChatGPT, aiming to accelerate innovation and create more advanced, open artificial intelligence models.",
    href: `${LIVE_SITE_URL}/news/zuckerbergs-big-move-meet-metas-ai-super-team-a-serious-challenger-to-chatgpt-`,
  },
  {
    category: "Event",
    date: "2025-07-02",
    title: "CMMS UAT at PT Timah: Real-World Simulation to Ensure System Readiness",
    summary:
      "UAT ensures systems meet real-world needs. PT Timah Tbk used it to validate CMMS-SAP integration and improve user experience.",
    href: `${LIVE_SITE_URL}/news/cmms-uat-at-pt-timah-real-world-simulation-to-ensure-system-readiness`,
  },
  {
    category: "Education",
    date: "2026-01-09",
    title: "Baidu AI Trials Technology to \"Talk\" with Animals",
    summary:
      "Chinese tech giant Baidu is currently developing artificial intelligence (AI) technology designed to enable communication between humans and animals. Though still in the early stages, this innovation could mark a significant leap in cross-species interaction.",
    href: `${LIVE_SITE_URL}/news/baidu-ai-trials-technology-to-talk-with-animals`,
  },
  {
    category: "Event",
    date: "2025-05-28",
    title: "POC Closing: 3 Months of Collaboration at RU V Balikpapan",
    summary:
      "After a three-month trial period, the Proof of Concept (POC) officially concluded on May 21, 2025. Running from February 19 to May 19, 2025, this initiative was part of the broader effort to enhance operational optimization and digitalization at Refinery Unit V Balikpapan (RU V).",
    href: `${LIVE_SITE_URL}/news/poc-closing-3-months-of-collaboration-at-ru-v-balikpapan`,
  },
  {
    category: "News",
    date: "2025-06-21",
    title: "16 Billion Apple-Google Password Leaks: Threats & Solutions for Entrepreneurs",
    summary:
      "A massive 2025 data breach leaked 16 billion logins. Caused by malware, not hacked servers. Learn the 9 strategic steps to protect your company data.",
    href: `${LIVE_SITE_URL}/news/16-billion-apple-google-password-leaks-threats-solutions-for-entrepreneurs`,
  },
  {
    category: "Education",
    date: "2025-06-19",
    title: "Practical Tips 2025 Office Hack for Entrepreneurs",
    summary:
      "Discover 5 tips office hacks from Rekadia for entrepreneurs in 2025 to improve work efficiency, minimize distractions, and maximize team productivity.",
    href: `${LIVE_SITE_URL}/news/practical-tips-2025-office-hack-for-entrepreneurs`,
  },
  {
    category: "News",
    date: "2025-05-07",
    title: "Recognize the Dangers of Pineapple WiFi, The Fake Network That Can Steal Your Data",
    summary:
      "Pineapple WiFi is a device that can steal user data through public networks. Beware of the risks—especially when using free WiFi.",
    href: `${LIVE_SITE_URL}/news/recognize-the-dangers-of-pineapple-wifi-the-fake-network-that-can-steal-your-data`,
  },
  {
    category: "Tech",
    date: "2025-04-29",
    title: "Marketplace vs Website Comparison: Which One is Better for Your Business?",
    summary:
      "Confused about choosing between a marketplace and a professional website for your business? Find a complete comparison of the advantages and disadvantages of each platform. Learn why having a Custom Website Company Profile is an important step to build a stronger brand, increase customer trust, and take full control of your business digitally.",
    href: `${LIVE_SITE_URL}/news/marketplace-vs-website-comparison-which-one-is-better-for-your-business`,
  },
  {
    category: "News",
    date: "2025-04-28",
    title: "KFC Launches Revolutionary Ads 100% Created by AI Without Actors",
    summary:
      "KFC made a new breakthrough by launching the first ad created entirely by artificial intelligence (AI) without involving human actors. This innovative move marks a new era in the world of digital advertising.",
    href: `${LIVE_SITE_URL}/news/kfc-launched-revolutionary-ads-100-made-by-ai-without-actors`,
  },
  {
    category: "Education",
    date: "2025-04-22",
    title: "Steps to Prepare Entrepreneurs in Making Custom Software",
    summary:
      "A complete guide for business people in preparing for the development of custom software that is appropriate and according to business needs.",
    href: `${LIVE_SITE_URL}/news/steps-to-prepare-entrepreneurs-in-making-custom-software`,
  },
  {
    category: "News",
    date: "2025-04-16",
    title: "Is It Time for Your Business to Go Digital? These are 5 Signs That Should Not Be Ignored",
    summary:
      "Recognize the 5 important signs that your business is time to digitally transform to increase efficiency, productivity, and competitiveness.",
    href: `${LIVE_SITE_URL}/news/is-it-time-for-your-business-to-go-digital-these-are-5-signs-that-should-not-be-ignored`,
  },
  {
    category: "News",
    date: "2025-04-08",
    title: "The Importance of Business Support Software to Increase Business Efficiency",
    summary:
      "Increase business efficiency and productivity with supporting software such as ERP, CRM, and collaboration tools for competitive advantage.",
    href: `${LIVE_SITE_URL}/news/the-importance-of-business-support-software-to-increase-business-efficiency`,
  },
  {
    category: "News",
    date: "2025-04-03",
    title: "Grok vs DeepSeek AI: Which is More Powerful?",
    summary:
      "Grok vs. DeepSeek AI: Which is more powerful? Discover a comparison of the speed, intelligence, flexibility, and efficiency of these two advanced AI models!",
    href: `${LIVE_SITE_URL}/news/grok-vs-deepseek-ai-which-is-more-powerful`,
  },
  {
    category: "News",
    date: "2025-03-24",
    title: "Why E-Office is the Best Solution for Your Business",
    summary:
      "Improve business efficiency & security with E-Office. Digital solutions for file management, communication, & collaboration are more effective.",
    href: `${LIVE_SITE_URL}/news/why-e-office-is-the-best-solution-for-your-business`,
  },
  {
    category: "Event",
    date: "2025-03-24",
    title: "Cara Efektif Melindungi Data Perusahaan dari Ancaman Siber",
    summary:
      "Rekadia sukses gelar webinar mengenai cara efektif melindungi data perusahaan dari ancaman siber bersama dengan Chandra S. Oemarjadi dan Alberto Evan Argya.",
    href: `${LIVE_SITE_URL}/news/cara-efektif-melindungi-data-perusahaan-dari-ancaman-siber`,
  },
  {
    category: "News",
    date: "2025-03-11",
    title: "Ingin Branding yang Kuat? Begini Cara Membangun Brand Lewat Website!",
    summary:
      "Bangun branding melalui website dengan warna & tipografi konsisten, desain responsif, visual berkualitas, keamanan untuk bisnis lebih kredibel.",
    href: `${LIVE_SITE_URL}/news/ingin-branding-yang-kuat-begini-cara-membangun-brand-lewat-website`,
  },
  {
    category: "News",
    date: "2025-03-04",
    title: "Uji Coba Teknologi AI CCTV di PT KPI RU 5: Langkah Strategis Menuju Pengawasan Keamanan yang Lebih Canggih",
    summary:
      "PT Kilang Pertamina Internasional (KPI) Refinery Unit 5 (RU 5) bersama Rekadia menguji AI CCTV dalam Proof of Concept (POC) selama dua hari untuk meningkatkan keamanan dan efisiensi pengawasan di area kilang.",
    href: `${LIVE_SITE_URL}/news/uji-coba-teknologi-ai-cctv-di-pt-kpi-ru-5-langkah-strategis-menuju-pengawasan-keamanan-yang-lebih-canggih`,
  },
  {
    category: "News",
    date: "2025-02-20",
    title: "Peluang dan Tantangan Bisnis di Era Digital",
    summary:
      "Era digital membuka peluang bisnis dengan akses pasar luas, efisiensi operasional, dan pemasaran digital. Namun, tantangan seperti persaingan ketat, keamanan data, dan adaptasi teknologi harus diatasi. Strategi tepat akan menjaga bisnis tetap kompetitif.",
    href: `${LIVE_SITE_URL}/news/peluang-dan-tantangan-bisnis-di-era-digital`,
  },
  {
    category: "News",
    date: "2025-02-12",
    title: "Hindari Kebiasaan Ini! Penyebab Turunnya Produktivitas & Solusinya",
    summary:
      "Produktivitas adalah kunci dalam mencapai tujuan dan kesuksesan. Namun, tanpa disadari, ada beberapa kebiasaan buruk yang justru membuat kita sulit untuk bekerja secara efektif. Jika dibiarkan, kebiasaan ini bisa menghambat perkembangan pribadi dan profesional.",
    href: `${LIVE_SITE_URL}/news/hindari-kebiasaan-ini-penyebab-turunnya-produktivitas-solusinya`,
  },
  {
    category: "News",
    date: "2025-02-07",
    title: "Kebiasaan Buruk yang Membuat Kamu Tidak Produktif dan Cara Mengatasinya",
    summary:
      "Produktivitas adalah kunci dalam mencapai tujuan dan kesuksesan. Namun, tanpa disadari, ada beberapa kebiasaan buruk yang justru membuat kita sulit untuk bekerja secara efektif. Jika dibiarkan, kebiasaan ini bisa menghambat perkembangan pribadi dan profesional.",
    href: `${LIVE_SITE_URL}/news/kebiasaan-buruk-yang-membuat-kamu-tidak-produktif-dan-cara-mengatasinya-`,
  },
  {
    category: "Event",
    date: "2025-01-23",
    title: "Rekadia Hadir dalam Rapat Koordinasi IKPI 2025!",
    summary:
      "Rekadia dengan bangga hadir dan ikut serta dalam Rapat Koordinasi Ikatan Konsultan Pajak Indonesia (IKPI) 2025! Kehadiran kami dalam acara ini menjadi bukti nyata komitmen Rekadia dalam mendukung pengembangan layanan konsultan pajak di era digital.",
    href: `${LIVE_SITE_URL}/news/rekadia-hadir-dalam-rapat-koordinasi-ikpi-2025`,
  },
  {
    category: "News",
    date: "2025-01-14",
    title: "Fleksibilitas Kerja dari Mana Saja dengan E-Office: Solusi Modern untuk Bisnis Masa Kini",
    summary:
      "Di era digital seperti sekarang, fleksibilitas kerja menjadi kebutuhan utama banyak perusahaan. Model kerja tradisional yang mengharuskan karyawan hadir di kantor kini bertransformasi, membuka peluang untuk bekerja dari mana saja. Namun, fleksibilitas kerja ini membutuhkan sistem yang andal, aman, dan efisien. Di sinilah E-Office hadir sebagai solusi utama.",
    href: `${LIVE_SITE_URL}/news/fleksibilitas-kerja-dari-mana-saja-dengan-e-office-solusi-modern-untuk-bisnis-masa-kini`,
  },
  {
    category: "News",
    date: "2025-01-07",
    title: "Karyawan Resign? Tetap Tenang, File Perusahaan Aman dengan E-Office!",
    summary:
      "Pergantian karyawan merupakan tantangan yang tak terhindarkan bagi perusahaan. Namun, ada satu hal yang kini tidak perlu lagi menjadi kekhawatiran: keamanan file penting perusahaan tetap terjaga!",
    href: `${LIVE_SITE_URL}/news/karyawan-resign-tetap-tenang-file-perusahaan-aman-dengan-e-office`,
  },
  {
    category: "Event",
    date: "2024-12-13",
    title: "Workshop Rekadia x TGI",
    summary:
      "For 3 days full of energy and collaboration, Rekadia and TGI successfully held a workshop to prepare for the launch of the FIMS Mobile application! 📱✨ Great collaboration, big step! 🙌",
    href: `${LIVE_SITE_URL}/news/rekadia-x-tgi-workshop-preparation-launch-application-fims-mobile`,
  },
  {
    category: "Event",
    date: "2024-12-06",
    title: "CEO of Rekadia, Attends Canalys Forum 2024 in Bali",
    summary:
      "Chandra S. Oemarjadi, CEO of Rekadia, participated in the Canalys Forum 2024, a prestigious event in the information technology (IT) industry that brings together the world's leading thinkers, business partners, and vendors. The event discusses future IT trends, predictions, and strategies, while strengthening global collaboration through interactive sessions and in-depth discussions.",
    href: `${LIVE_SITE_URL}/news/chandra-s-oemarjadi-ceo-of-rekadia-attends-canalys-forum-2024-in-bali`,
  },
  {
    category: "News",
    date: "2024-11-29",
    title: "8 Reasons Why Your Business Needs IT Consulting!",
    summary:
      "IT Consulting helps businesses improve efficiency, manage security risks, and accelerate digital transformation with the right, cost-effective technology solutions. With expert support, you can focus on your core business while ensuring sustainability in the digital age.",
    href: `${LIVE_SITE_URL}/news/digital-transformation-in-sight-heres-why-your-business-needs-it-consulting`,
  },
  {
    category: "News",
    date: "2024-11-22",
    title: "Effective Tips to Protect Work Files from Malware That You Should Know!",
    summary:
      "Find practical and effective tips from Rekadia to protect your work files from malware threats. A complete guide to data security in the digital world.",
    href: `${LIVE_SITE_URL}/news/protect-your-work-files-from-malware`,
  },
  {
    category: "Event",
    date: "2024-11-13",
    title: "Flashback Webinar \"KAP 4.0: Cloud Storage + AI\" – Digital Transformation in the Auditing Industry",
    summary:
      "The \"KAP 4.0: Cloud Storage + AI\" webinar held by PT. Rekadia on October 31, 2024 successfully attracted the attention of KAP professionals.",
    href: `${LIVE_SITE_URL}/news/webinar-kap-4-0-cloud-storage-ai-`,
  },
];
