import type {
  EducationEntry,
  ExperienceItem,
  ExternalLinks,
  MetricItem,
  NavItem,
  ProjectItem,
  SkillGroup,
} from '../types/content'

const baseUrl = import.meta.env.BASE_URL

export const siteMeta = {
  name: 'Mann Parekh',
  title: 'Finance & Analytics Portfolio',
  headline: 'Quantitative finance and analytics, built with technical rigor.',
  subheadline:
    'I build financial models, executive-ready analysis, and AI-enabled workflows that turn complex data into clear decisions.',
  intro:
    'Finance/FP&A-focused student at the University of Maryland with experience across capital planning, forecasting, ML systems, and research analytics.',
}

export const navItems: NavItem[] = [
  { id: 'top', label: 'Overview' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'resume', label: 'Resume' },
]

export const metrics: MetricItem[] = [
  {
    label: 'Client Retention Impact',
    value: '30%+',
    detail: 'Helped retain a mutual fund client base through churn and dividend forecasting workflows.',
  },
  {
    label: 'Capital Raise Support',
    value: 'JPMorgan',
    detail: 'Supported executive FP&A and data synthesis for a high-profile capital raising round.',
  },
  {
    label: 'Major GPA',
    value: '3.55',
    detail: 'Applied Mathematics + Economics double major at UMD.',
  },
  {
    label: 'Dean’s Merit List',
    value: '2x',
    detail: 'Recognized in Spring 2025 and Fall 2025.',
  },
]

export const experience: ExperienceItem[] = [
  {
    id: 'healthy-amplified',
    role: 'Project Lead & FP&A Analyst Intern',
    organization: 'Healthy Amplified',
    location: 'College Park, MD',
    start: 'Nov 2025',
    end: 'Jan 2026',
    category: 'FP&A / Strategy',
    summary:
      'Directed financial planning and analysis initiatives for a med-tech business, partnering with leadership on capital efficiency and commercialization decisions.',
    highlights: [
      'Partnered with C-suite leadership to refine commercialization roadmaps using financial modeling and valuation analysis.',
      'Synthesized clinical and operational data into executive dashboards for investor due diligence.',
      'Coordinated strategic outreach and events tied to a high-profile JPMorgan capital raising process.',
    ],
    impactMetrics: ['Executive dashboards', 'Capital raise support', 'Market expansion analysis'],
    tags: ['FP&A', 'Financial Modeling', 'Valuation', 'Executive Reporting'],
    featured: true,
  },
  {
    id: 'handshake-ai',
    role: 'AI Researcher',
    organization: 'Handshake AI Fellowship',
    location: 'Remote',
    start: 'Oct 2025',
    end: 'Dec 2025',
    category: 'AI Evaluation',
    summary:
      'Validated and improved LLM outputs across mathematics, statistics, and data analysis using reproducible evaluation methods.',
    highlights: [
      'Designed rubric-based evaluations for math and data-analysis outputs.',
      'Computed inter-rater agreement and analyzed error classes to improve reliability.',
      'Tracked data lineage and edge-case test sets for audit-ready evaluation workflows.',
    ],
    impactMetrics: ['Reproducible QA', 'A/B evaluation', 'Rubric design'],
    tags: ['LLM Evaluation', 'Data Quality', 'Analytics', 'Experimentation'],
    featured: true,
  },
  {
    id: 'umd-research',
    role: 'Undergraduate Researcher',
    organization: 'University of Maryland — Computing and Society',
    location: 'College Park, MD',
    start: 'Aug 2023',
    end: 'Dec 2024',
    category: 'Research Analytics',
    summary:
      'Researched AI effectiveness in business analytics and portfolio management using Python and R, translating model outputs into decision-support insights.',
    highlights: [
      'Built and evaluated predictive models for analytics and finance use cases.',
      'Interpreted model performance for decision support, emphasizing practical application.',
      'Selected for UMD’s competitive FIRE faculty-mentored research program.',
    ],
    impactMetrics: ['Predictive modeling', 'Finance analytics research', 'FIRE program'],
    tags: ['Research', 'Python', 'R', 'Portfolio Analytics'],
    featured: true,
  },
  {
    id: 'mirae-asset',
    role: 'AI Developer',
    organization: 'Mirae Asset',
    location: 'Mumbai, India',
    start: 'May 2024',
    end: 'Jul 2024',
    category: 'Applied AI / Finance',
    summary:
      'Built and deployed attrition prediction and dividend forecasting workflows to support retention strategy for a mutual fund business.',
    highlights: [
      'Contributed to churn prediction and dividend forecasting pipelines in Python and R.',
      'Partnered with a 20+ person AI team to identify client turnover drivers.',
      'Supported retention strategy linked to preserving over 30% of the client base.',
    ],
    impactMetrics: ['30%+ retention support', 'Forecasting pipeline', 'Supervised ML'],
    tags: ['Finance Analytics', 'Time Series', 'Python', 'R'],
    featured: true,
  },
  {
    id: 'vphrase',
    role: 'Data Analysis & Operations Intern',
    organization: 'vPhrase Analytics Solutions',
    location: 'Remote',
    start: 'Jan 2023',
    end: 'Apr 2023',
    category: 'Operations Analytics',
    summary:
      'Improved data quality and reporting workflows for AI-driven BI products, focusing on validation and process scalability.',
    highlights: [
      'Validated and cleansed large datasets to support NLG model training.',
      'Collaborated with engineering teams to automate reporting pipelines.',
    ],
    impactMetrics: ['Data quality', 'NLG training support'],
    tags: ['Operations', 'BI', 'Data Validation'],
    featured: false,
  },
  {
    id: 'nhsjs-blockchain',
    role: 'Blockchain Development Researcher',
    organization: 'National High School Journal of Science',
    location: 'Remote',
    start: 'May 2022',
    end: 'Sep 2022',
    category: 'Publication',
    summary:
      'Published research on blockchain opportunities, risks, and applications with a focus on performance, security, and adoption incentives.',
    highlights: [
      'Evaluated blockchain platforms for security, performance, and applicability.',
      'Analyzed economic incentives shaping adoption and usage patterns.',
    ],
    impactMetrics: ['Published research', 'Security + economics lens'],
    tags: ['Blockchain', 'Research', 'Publication'],
    featured: false,
  },
  {
    id: 'clevered',
    role: 'Machine Learning Engineer',
    organization: 'Clevered',
    location: 'Remote',
    start: 'Mar 2022',
    end: 'May 2022',
    category: 'Applied ML',
    summary:
      'Contributed to applied AI projects under Dr. Ken Kahn, strengthening experimentation, interpretation, and reporting skills.',
    highlights: [
      'Supported ML experimentation workflows and result interpretation.',
      'Improved documentation and reporting discipline for applied AI work.',
    ],
    impactMetrics: ['Experimentation', 'Model interpretation'],
    tags: ['ML', 'Experimentation'],
    featured: false,
  },
  {
    id: 'zaio',
    role: 'Software Intern',
    organization: 'Zaio',
    location: 'South Africa',
    start: 'May 2021',
    end: 'Jul 2021',
    category: 'Software / Education',
    summary:
      'Supported engineering and curriculum tasks for a beginner programming platform and marketplace initiative in a 30+ person team.',
    highlights: [
      'Contributed to Ingenious Faces Marketplace support work.',
      'Assisted on curriculum and platform tasks for programming learners.',
    ],
    impactMetrics: ['30+ person team', 'Platform support'],
    tags: ['Software', 'EdTech'],
    featured: false,
  },
]

export const projects: ProjectItem[] = [
  {
    id: 'tailored',
    title: 'Tailored — Thrifting App',
    role: 'Application Developer',
    period: 'Apr 2024 — May 2025',
    summary:
      'Created and launched Tailored on the App Store with personalized recommendations powered by web scraping and machine learning.',
    businessRelevance:
      'Mirrors production-style data collection and recommendation workflows used in consumer finance and e-commerce analytics.',
    tech: ['Python', 'Web Scraping', 'Machine Learning', 'Mobile App'],
    highlights: [
      'Shipped an end-to-end product with user-facing recommendation features.',
      'Built recommendation logic informed by scraped product/item data.',
      'Translated analytics logic into a real consumer application experience.',
    ],
    featured: true,
    detailSections: [
      {
        title: 'Problem & Product',
        bullets: [
          'Designed a thrift-shopping experience that improves discovery through personalization rather than manual browsing alone.',
          'Focused on practical recommendation quality and launch-readiness over prototype-only experimentation.',
        ],
      },
      {
        title: 'Data & Modeling',
        bullets: [
          'Collected item data via web scraping workflows to build recommendation inputs.',
          'Used machine learning logic to personalize item recommendations and ranking behavior.',
          'Maintained an iterative loop between observed results and recommendation tuning.',
        ],
      },
      {
        title: 'Why It Matters for Finance/Analytics',
        bullets: [
          'Demonstrates data pipeline thinking: collection, cleaning, scoring, and serving outputs to end users.',
          'Shows product-oriented analytics execution with measurable decision logic behind recommendations.',
        ],
      },
    ],
  },
  {
    id: 'object-detection-accessibility',
    title: 'AI-Based Object Detection System',
    role: 'AI for Accessibility Project',
    period: 'Aug 2021 — May 2022',
    summary:
      'Developed AI/ML prototypes for object and shape detection and built a cane-sensor-assisted obstacle detection concept for visually impaired users.',
    businessRelevance:
      'Shows early systems thinking, applied ML prototyping, and user-centered problem framing under hardware constraints.',
    tech: ['Python', 'Machine Learning', 'Sensors', 'Accessibility'],
    highlights: [
      'Built prototypes for object and shape detection tasks.',
      'Integrated ML logic with cane sensor inputs for obstacle awareness.',
      'Focused on real-world usability and assistive outcomes.',
    ],
    featured: true,
    detailSections: [
      {
        title: 'System Concept',
        bullets: [
          'Combined sensor data and detection logic to flag nearby obstacles and improve situational awareness.',
          'Framed the project around accessibility outcomes, not just model performance metrics.',
        ],
      },
      {
        title: 'Technical Work',
        bullets: [
          'Developed ML prototypes for object and shape detection tasks.',
          'Iterated on detection performance and integration behavior in a constrained prototype setup.',
        ],
      },
      {
        title: 'Transferable Skills',
        bullets: [
          'Applied structured experimentation and iterative debugging to a real user problem.',
          'Built confidence in connecting model outputs to operational decisions and hardware inputs.',
        ],
      },
    ],
  },
  {
    id: 'blockchain-publication',
    title: 'Blockchain Research Publication',
    role: 'NHSJS Researcher',
    period: 'May 2022 — Sep 2022',
    summary:
      'Published “Blockchain: Opportunities, Risks, and Applications,” evaluating platform performance, security tradeoffs, and adoption economics.',
    businessRelevance:
      'Highlights analytical writing, structured comparative evaluation, and an economics lens on emerging technology adoption.',
    tech: ['Research', 'Technical Writing', 'Comparative Analysis', 'Economics'],
    highlights: [
      'Published a mentored research piece in NHSJS.',
      'Compared blockchain platforms across performance and security dimensions.',
      'Connected technical architecture choices to economic incentives and adoption.',
    ],
    featured: true,
    detailSections: [
      {
        title: 'Research Focus',
        bullets: [
          'Evaluated blockchain platforms for performance, security, and practical applicability.',
          'Assessed where blockchain solutions fit and where they create unnecessary complexity.',
        ],
      },
      {
        title: 'Analytical Lens',
        bullets: [
          'Connected system design and token/economic incentives to adoption behavior.',
          'Balanced technical and business risk perspectives in the written analysis.',
        ],
      },
      {
        title: 'Why It Strengthens This Portfolio',
        bullets: [
          'Demonstrates structured argumentation and evidence-based comparison.',
          'Supports a finance/analytics narrative with quantitative reasoning and communication skills.',
        ],
      },
    ],
  },
]

export const skillGroups: SkillGroup[] = [
  {
    id: 'finance',
    label: 'Finance & FP&A',
    items: [
      'Financial Analysis & Modeling',
      'Budgeting & Cash Flow Management',
      'Accounting Fundamentals',
      'Valuation & Investment Principles',
      'Executive Reporting',
      'Excel (PivotTables, VLOOKUP, Financial Modeling)',
    ],
  },
  {
    id: 'data-ai',
    label: 'Data & AI',
    items: [
      'Python',
      'R',
      'SQL',
      'PyTorch',
      'Pandas / NumPy / Matplotlib',
      'Keras',
      'Machine Learning',
      'Forecasting',
      'Data Visualization',
      'LLM Evaluation & Rubrics',
    ],
  },
  {
    id: 'engineering-tools',
    label: 'Engineering & Tools',
    items: [
      'Java',
      'JavaScript',
      'C / C++',
      'MATLAB',
      'HTML / CSS',
      'x86-64 Assembly',
      'Google Cloud',
      'Jupyter Notebook',
      'VS Code / Visual Studio / PyCharm / IntelliJ / Eclipse',
      'QuickBooks',
    ],
  },
]

export const education: EducationEntry = {
  school: 'University of Maryland, College Park',
  degreeLine: 'Double Major: Applied Mathematics and Economics',
  gradTerm: 'Expected Spring 2027',
  gpa: 'Major GPA: 3.55',
  honors: ['Dean’s Merit List (Spring 2025, Fall 2025)'],
  coursework: [
    'Advanced Calculus (MATH 410)',
    'Linear Optimization (MATH 423)',
    'Applications of Linear Algebra (MATH 401)',
    'Applied Probability & Statistics I/II (STAT 400/401)',
    'Economics of Big Data (ECON 433)',
    'Money and Banking (ECON 330)',
    'Intermediate Micro/Macro (ECON 326/325)',
    'Object-Oriented Programming I/II (CMSC 131/132)',
    'Computer Systems (CMSC 216)',
    'Discrete Structures (CMSC 250)',
  ],
}

export const links: ExternalLinks = {
  email: 'msparekh25@gmail.com',
  location: 'College Park, MD',
  resumeUrl: `${baseUrl}Mann_Parekh_Resume.pdf`,
  githubUrl: 'https://github.com/msparekh25',
}

export const resumeHighlights = [
  'FP&A internship experience supporting executive capital strategy and investor diligence outputs.',
  'Applied AI and forecasting work in financial services, including churn prediction and dividend forecasting.',
  'Strong quantitative foundation from Applied Mathematics + Economics coursework at UMD.',
]

export const workingStyle =
  'Structured, detail-oriented, and comfortable translating technical analysis into executive-ready recommendations.'
