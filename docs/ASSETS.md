# Image assets

Every image on the public site is resolved through `IMAGES` in `src/content/images.ts`.
All entries currently point to dummy placeholders in `public/images/placeholders/`.
Each placeholder has the same aspect ratio as the original asset, so layouts stay identical when the real files are swapped in.

## Swapping in a real asset

1. Get the licensed source file from the Rekadia design team. The CDN URLs below show which asset each key replaced; they are references, not files to hotlink.
2. Save it under `public/images/` (for example `public/images/hero.png`).
3. Update the entry in `src/content/images.ts`, replacing the `placeholder(...)` call with a plain object:
   ```ts
   hero: { src: "/images/hero.png", width: 2300, height: 1532, alt: "..." },
   ```
   Use the file's real pixel size so `next/image` reserves the correct space.

Decorative images (AI card backgrounds, CTA background, contact banner) intentionally have an empty `alt`.

## Mapping

`A/` = `https://cdn.prod.website-files.com/66f21effa25b0bca5e3e5064/`
`B/` = `https://cdn.prod.website-files.com/66f3eec754ff513c4e1bd0cc/`

| Key | Placeholder | Original |
| --- | --- | --- |
| `logo` | `logo.svg` | `A/6848d4a2f92103372bdd5604_LOGO-final-21.png` |
| `logoWhite` | `logo-white.svg` | `A/6848d53f51ff2e0ba248404e_LOGO-final-white.png` |
| `ogImage` | `og-image.png` | `A/683530c5da5b098570dfc078_Logo%20Rekadia%20For%20Facebook%20Profile%20Picture.jpg` |
| `hero` | `hero.svg` | `A/69b8ca3d8d5176a0151fbf7c_hero.png` |
| `featureExpert` | `feature-expert.svg` | `A/69b8d307575789f645fdb5ff_expert.png` |
| `featureEasy` | `feature-easy.svg` | `A/69b8d418198fb716a066700a_easy.png` |
| `featureSolution` | `feature-solution.svg` | `A/69b8d497680454450bb4fdac_solution.png` |
| `featurePartner` | `feature-partner.svg` | `A/69b8d4c1abddb90095d11aa3_partner.png` |
| `aiBgQualityAssurance` | `ai-bg-quality-assurance.svg` | `A/69f99656666d64f6200d02c2_11.png` |
| `aiBgAudit` | `ai-bg-audit.svg` | `A/69f99656ea049aca680b3af8_12.png` |
| `aiBgChatbot` | `ai-bg-chatbot.svg` | `A/69f9965632f4605c7b34c2cc_13.png` |
| `aiBgCvScreening` | `ai-bg-cv-screening.svg` | `A/69f99656fc3e7a0185821db8_14.png` |
| `aiBgVoiceAnalytics` | `ai-bg-voice-analytics.svg` | `A/69cb2cdad6d9ca7c80bbcb35_d0834f137af6876c9cf4a5c7d1f72605474feffc.jpg` |
| `aiSlideQualityAssurance` | `ai-slide-quality-assurance.svg` | `A/69b8fc94a55ca9bc0ff439df_ai-quality.png` |
| `aiSlideAudit` | `ai-slide-audit.svg` | `A/69c3576556287464a8c7e49f_ai-audit.png` |
| `aiSlideChatbot` | `ai-slide-chatbot.svg` | `A/69c357c0027fe7a570a6e3bd_ai-chatbot.png` |
| `aiSlideCvScreening` | `ai-slide-cv-screening.svg` | `A/69c358352f03bffc9c95d505_ai-cv-screening.png` |
| `aiSlideVoiceAnalytics` | `ai-slide-voice-analytics.svg` | `A/69b8fcbc30087ffb73c2aa68_ai-voice-analytics.png` |
| `productDelva` | `product-delva.svg` | `A/69b994dac6a6500e5be54ec9_delva.png` |
| `productEOfficeEmail` | `product-e-office-email.svg` | `A/69cca0193396eb61cfc96bf2_cbc269e42c90a0734d2e3e54544b152b91292465.png` |
| `productEOffice` | `product-e-office.svg` | `A/69cca04c0a1e9849f3100047_Frame%201686553475.png` |
| `clientTheEnergy` | `client-the-energy.svg` | `B/6712190686c957b0043be1d8_The%20Energy%20Building%20-%20Your%20Reliable%20Business%20Partner.avif` |
| `clientAskrindo` | `client-askrindo.svg` | `B/673c146f6c897580687ab039_Pertamina%20Internationa%20Shipping%20(7).avif` |
| `clientBankIndonesia` | `client-bank-indonesia.svg` | `B/673c139d9bc593837b172468_Pertamina%20Internationa%20Shipping%20(6).avif` |
| `clientBca` | `client-bca.svg` | `B/673c13be25533c6e03eb227f_Bank%20BCA.avif` |
| `clientBtn` | `client-btn.svg` | `B/688826f3c0c777db9ab65ee7_logo-btn-square.png` |
| `clientBukitAsam` | `client-bukit-asam.svg` | `B/66ffa72fd441ad252048b0d0_image%2021.avif` |
| `clientCityvision` | `client-cityvision.svg` | `B/673c1637ca503bfb1f13d587_Pertamina%20Internationa%20Shipping%20(9).avif` |
| `avatarNataliaOdang` | `avatar-natalia-odang.svg` | `B/67bd6fba3d3b6c09d4c4065d_6736bd04dd0822b7d57e170d_Untitled%2520design%2520(1).avif` |
| `avatarKartika` | `avatar-kartika.svg` | `B/67bd6fb80a9619db137b54f1_6736bc0c2ab151520c80f562_Untitled%2520design.avif` |
| `avatarHermenBustaman` | `avatar-hermen-bustaman.svg` | `B/67bd6fb93d3b6c09d4c4055d_6731cf33b328c51c97c75a5e_Untitled%2520design.avif` |
| `avatarAriefJauhari` | `avatar-arief-jauhari.svg` | `B/67d793711d22f035244931bd_Arief%20Jauhari%20PNG.avif` |
| `avatarDediSahendra` | `avatar-dedi-sahendra.svg` | `B/67d79362ac7150f21a0bf900_PLN%20Energi%20Gas%20PNG.avif` |
| `ctaBackground` | `cta-background.svg` | `A/69b993211e47c710ef1aec41_consult-bg.jpg` |
| `pageBanner` | `page-banner.svg` | `A/69c499d793463b443a03465b_BG%20Header%20(1).png` (shared by every subpage banner) |
| `officeMap` | `office-map.svg` | `A/69c9ed2921c8ed9ab6316b07_Rectangle%206.png` |

### Solutions page

The dark placeholders on this page have no text, so they don't collide with the white card copy drawn on top of them. Cards that use them render `alt=""` because the photos are decorative backgrounds (the original uses CSS backgrounds).

| Key | Placeholder | Original |
| --- | --- | --- |
| `solutionsAiAgenticAi` | `solutions-ai-agentic-ai.svg` | `A/69c5ee120073e2c6b3e46eb3_431f98f9b511ca07cb7bedd970924c08d06b31e0.jpg` |
| `solutionsAiChatbot` | `solutions-ai-chatbot.svg` | `A/69c5ef24f33db620b9870fbc_205c662c80f72fc5ee58979446332a9d0fbef1c6.jpg` |
| `solutionsAiQualityAssurance` | `solutions-ai-quality-assurance.svg` | `A/69c5ef4ae0621ef3314e3881_5538e25b2f764d95c385de302a7ed4e4f65a340c.jpg` |
| `solutionsAiAudit` | `solutions-ai-audit.svg` | `A/69c5ef7835bf2d28bb6c86fe_df567e231d15f7db06d541f01854f6c23b1abb49.jpg` |
| `solutionsAiCvScreening` | `solutions-ai-cv-screening.svg` | `A/69c5efb3217bf60756f334b4_fe4b862f187848d3201c0c2404731b169755a669.jpg` |
| `solutionsAiVoiceAnalytics` | `solutions-ai-voice-analytics.svg` | `A/69cb2cdad6d9ca7c80bbcb35_d0834f137af6876c9cf4a5c7d1f72605474feffc.jpg` |
| `stepNeedsAssessment` | `step-needs-assessment.svg` | `A/69c5f17cb2b532df9d9720c9_4e9c448bfa0a0b93fe3d0ca154339fb5ff4c12fb.png` |
| `stepAiConfiguration` | `step-ai-configuration.svg` | `A/69c5f2105f587abac1d39de3_01bf933b35227e1b9bc60848809621cab8c10e3f.png` |
| `stepSystemIntegration` | `step-system-integration.svg` | `A/69c5f2105c735f8eae44fad9_006e0ca3a0421758cec10628ba08303d749ca50c.png` |
| `stepGoLive` | `step-go-live.svg` | `A/69c5f2101f2a20a365e30490_71a8d02230214ab22613141b0c6ffa3a6ab81a9a.png` |
| `businessWebMobileApp` | `business-web-mobile-app.svg` | `A/69c5f3e0eeea080e771be3c8_0d07cb15424be3b3cd34c1173281efe91378cf14.jpg` |
| `businessIntelligence` | `business-intelligence.svg` | `A/69c5f3e0def88b9da4fc57c2_4622950b95c835d7572fbaf6ccece144284168d3.jpg` |
| `businessSystemIntegration` | `business-system-integration.svg` | `A/69c5f3e0a9d83eee8a3ee8a7_57fbf1c5fa87b904281bef8d118401bc2f270003.jpg` |
| `businessWorkflowAutomation` | `business-workflow-automation.svg` | `A/69c5f3e05c735f8eae452906_21ab2b215b5ee96a967b4a941a88f4a1899c41af.jpg` |
| `officeMicrosoft365` | `office-microsoft-365.svg` | `A/69c5fa8f0cd22d01d2186f9e_3f37d330ab655fd5347e28e7d761741671a85c5f.jpg` |
| `officeGoogleWorkspace` | `office-google-workspace.svg` | `A/69c5fa8ff0c7e40714c72664_ee91cdf7cdc38dadce4bbd4b2379a69e54264235.jpg` |
| `officeAdobeAutodesk` | `office-adobe-autodesk.svg` | `A/69c5fa8fd442302359640fcb_05255aa2f6f7718438083a80408193f331f0d5b6.jpg` |
| `officeCyberSecurity` | `office-cyber-security.svg` | `A/69c5fa8f494d31cb053273f4_cf1c277cfe0a51563083094fa946e12ef0e4dda6.jpg` |
| `deviceBusinessLaptop` | `device-business-laptop.svg` | `A/69c5ff4b34296071f217527a_76b665db607c8f6df56fe349cf6631958f1b5427.jpg` |
| `deviceIndustrial` | `device-industrial.svg` | `A/69c5ff4d1a7e95b1802969fb_5a02208361295ff681fc214cab1bc520c3e630cd.png` |
| `deviceCommercialDisplay` | `device-commercial-display.svg` | `A/69c5ff4c22ef854ccde7d4da_2cefa50e4f6958f3644482132e42968fa8cfc8f4.jpg` |
| `deviceNas` | `device-nas.svg` | `A/69c5ff4c6a549393ec64667e_f55dad1dbd0af52025edeae05815efc044fb22a5.jpg` |
| `infraCloudServer` | `infra-cloud-server.svg` | `A/69c9c12e21e24c773ca00845_d8878a493987d96b7202b8346d209d10166a3335.jpg` |
| `infraPhysicalServer` | `infra-physical-server.svg` | `A/69c9c12e932f0bdd8912351b_9edc48a0d28c7aba087495bb425df88b5714e438.jpg` |
| `infraCloudBackup` | `infra-cloud-backup.svg` | `A/69c9c12d98e4bc2e42448425_3960fc26fba691d128f8fb5fd7f78761a2a03721.jpg` |

The results strip on this page reuses `ctaBackground` (the original uses the same `consult-bg.jpg`).

### Product pages (E-Office, E-Office Email, Delva)

The E-Office hero reuses `productEOffice`, and the E-Office and E-Office Email contact sections reuse `ctaBackground`. The benefit photos are CSS backgrounds in the original, so they render with `alt=""`.

| Key | Placeholder | Original |
| --- | --- | --- |
| `logoEOffice` | `logo-e-office.svg` | `A/68b1be027a17bf11c9c222df_Logo%20E-Office%20Berwarna.webp` |
| `logoDelva` | `logo-delva.svg` | `A/69c9c5621328e43547e50c6a_Logo%20Delva.png` |
| `eOfficeEmailHero` | `e-office-email-hero.svg` | `A/69ba55c23abb57a11906717f_e-office-hero.png` |
| `delvaHero` | `delva-hero.svg` | `A/69c9c53ba3b4cf31be131683_Frame%201686553936.png` |
| `benefitTimeEfficiency` | `benefit-time-efficiency.svg` | `A/69cb3fe507869e9b39af3616_3aa1ba72bb83c770a4a5dc01185227593388e504.jpg` |
| `benefitSecurity` | `benefit-security.svg` | `A/69cb3fe5877c685cac205cd4_111fc9e11f649c3b022c93bc6cefff1e4566e6a9%20(1).jpg` |
| `benefitVisibility` | `benefit-visibility.svg` | `A/69cb3fe5f18f05eced4fda90_ec14c540fb09b0e8e14ed8239519987877c3e6b8.jpg` |
| `benefitPaperless` | `benefit-paperless.svg` | `A/69cb3fe5da172d625f626cd2_9483dc853b51a2ca36d0f3247b08156415ea9331%20(1).jpg` |
| `clientDapenBki` | `client-dapen-bki.svg` | `B/68e3860c878888e2da7c59a8_Dana%20Pensiun%20Biro%20Klasifikasi%20Indonesia.png` |
| `clientSorikMarapi` | `client-sorik-marapi.svg` | `B/68e3858b5f4d57ffa5d62b3b_PT%20Sorik%20Marapi%20Geothermal%20Power.png` |
| `clientStepPoint` | `client-step-point.svg` | `B/68e385d0d2184c5306a3fe42_PT%20Step%20Point%20Indonesia.jpg` |
| `avatarAndiPratama` | `avatar-andi-pratama.svg` | `B/69f0821380fe31d4a223ca0f_sjs.png` |
| `avatarNovitaSari` | `avatar-novita-sari.svg` | `B/69f082fce6d17f969c7d5482_images.jpg` |
| `avatarRoni` | `avatar-roni.svg` | `B/69f085c3460eef64000c4d9d_logo.png` |

The Delva page follows the redesigned staging page at `https://rekadia.webflow.io/products/delva`. Its section backgrounds and case-study photos are decorative, so they render with `alt=""`.

| Key | Placeholder | Original |
| --- | --- | --- |
| `delvaHeroBackground` | `delva-hero-background.svg` | `A/6aed43d0c24c48749c07f786_delva-hero-background.jpg` |
| `delvaFeatureDashboard` | `delva-feature-dashboard.svg` | `A/6aec797222785981fd4c565f_dashboard.png` |
| `delvaFeatureMaintenancePlan` | `delva-feature-maintenance-plan.svg` | `A/6aec7a2a7875a89ef62c1b19_maintenance%20plan.png` |
| `delvaFeatureChecksheet` | `delva-feature-checksheet.svg` | `A/6aec7f9981c0a11b8aeb1e38_checksheet.png` |
| `delvaFeatureFinding` | `delva-feature-finding.svg` | `A/6aec7ab57a5a9fe3ac198fe6_finding.png` |
| `delvaCaseStudyBackground` | `delva-case-study-background.svg` | `A/6aed4519732741b3144466bf_delva-case-study-background.jpg` |
| `logoNotarisKartika` | `logo-notaris-kartika.svg` | `B/69f95993f000149dab4a76d5_NotarisKartika%20Logo.png` |
| `caseStudyNotarisKartika` | `case-study-notaris-kartika.svg` | `B/69f954112e1b3430eaec5bc8_67176be75db3b60a54dd5f6b_Website%20-%20Testimonial%20Video.jpg` |
| `logoPlnEnergiGas` | `logo-pln-energi-gas.svg` | `B/69f99e98146fd2d220c3ce83_logo%20pln%20eg.png` |
| `caseStudyPlnEnergiGas` | `case-study-pln-energi-gas.svg` | `B/69f99ebbbfd87ab497ccad56_0aqq7NMj3CBpykaGWFtYA4nt5Cs8rOhgHLiZYGfh.png` |
| `logoKapBep` | `logo-kap-bep.svg` | `B/69f9a95fb200f1314661ad73_Untitled%20(96%20x%2040%20px).png` |
| `caseStudyKapBep` | `case-study-kap-bep.svg` | `B/69f9a36536e9d18ece9454e9_consulting-3031678_1280-1.webp` |

The original feature icons are raster images. Here they are drawn with Lucide icons (E-Office) and emoji (E-Office Email), so they need no entry in `IMAGES`. To use the originals instead, add keys for these files and render them in place of the icons:

- E-Office features: `A/69cb3528c9d0edcf54a811ec_Icon%20Manajemen%20Dokumen.png`, `A/69cb35a95fd5f484e03a74e3_Icon%20Approval%20Workflow%20(1).png`, `A/69cb3528af7b71c7b59edf23_Icon%20Keamanan%20Data.png`, `A/69cb3528aa075cb161f95b75_Icon%20Notifikasi%20Realtime.png`, `A/69cb35febfad98afc632fff4_Icon%20Integrasi%20Sistem%20(1).png`
- E-Office Email features: `A/69c23f1d4ac3b9f74dd7e88a_save.png`, `A/69c240cfbd112597e0a3bcc0_globe.png`, `A/69c240cf34c08996f5ea0a7b_anti-spam.png`, `A/69c240ce5ede223c3c61cd99_user.png`, `A/69c240ce52e1cbffd04fc103_device.png`, `A/69cb2e33543685ef1df6defd_%F0%9F%8E%AF.png`

### Industries, About, Blog and Case Study pages

The banners reuse `pageBanner` and the closing section reuses `ctaBackground`. The Case Study listing reuses the Delva case study keys (`logo*` and `caseStudy*` above). The industry photos are CSS backgrounds in the original, so they render with `alt=""`.

| Key | Placeholder | Original |
| --- | --- | --- |
| `industryCorporate` | `industry-corporate.svg` | `B/69f95b7c00cc3634b2b59f71_1.png` |
| `industryEducation` | `industry-education.svg` | `B/69f98db8fc3e7a018580e458_2.png` |
| `industryFinance` | `industry-finance.svg` | `B/69f98e071edcf14114f6e5e9_3.png` |
| `industryHealthcare` | `industry-healthcare.svg` | `B/69f98e24b7086717cc3fee91_4.png` |
| `industryManufacturing` | `industry-manufacturing.svg` | `B/69f98e467e417987a3cfc649_5.png` |
| `aboutTeam1` | `about-team-1.svg` | `B/670f7b4d229bf8a18fb8343c_IMG_3646.jpeg` |
| `aboutTeam2` | `about-team-2.svg` | `B/69d8cb761b284ac89ba0b7df_Capture.JPG` |
| `aboutTeam3` | `about-team-3.svg` | `B/69d8c7c440cd18912c56737c_Image.jpg` |
| `blogCover` | `blog-cover.svg` | One cover per post in the Webflow "News" CMS collection (1200×630, CDN `B/`) |

Every blog card uses the single `blogCover` placeholder. To show real covers, add an `image` field to `BlogPost` in `src/content/articles.ts` and render it in `BlogPostCard` instead of `BLOG_PAGE.cover`.

The About icons are raster images in the original and are drawn with Lucide icons here: `A/69c49cbc030cd18a4458d828_mingcute_love-line.png` (Vision), `A/69c49d857d8d4bf23f2d21fc_covid_transmission-virus-crowd.png` (Mission), `A/69c49f2d8911debe6310bb41_Vector.png` (Make IT Works), `A/69c4a009855adf3a72cb62a2_hugeicons_ai-network.png` (AI-Driven), `A/69c49fff53733c7f2393fca5_uil_suitcase.png` (Professional), `A/69c49fffa632cf84d008e216_fa7-regular_handshake.png` (Approachable). The search field icon `A/69d8659ab770576f7b644c00_Vector.png` is the Lucide `Search` icon.

Several original client logo file names are misleading (for example the Askrindo logo is stored as "Pertamina Internationa Shipping (7)"). The mapping above follows the order the logos appear on the live homepage, which is the same order as `CLIENTS` in `src/content/home.ts`.
