export const PERSONAL = {
  name: 'Fagun Raithatha',
  title: 'ML Engineer - AI Systems',
  location: 'Indianapolis, Indiana, USA',
  email: 'fagun.raithatha28@gmail.com',
  linkedin: 'https://www.linkedin.com/in/fagun-raithatha-4365a2178/',
  github: 'https://github.com/fagun98/',
  product: 'https://smartpal.org/',
  tagline: 'I build the AI layer. From retrieval pipelines to agentic workflows, production to compliance.',
  footerNote: 'Built with Next.js, Three.js, and GSAP',
  year: '2026',
}

export const SITE_META = {
  title: 'Fagun Raithatha - ML Engineer | AI Systems',
  description:
    'Portfolio of Fagun Raithatha, ML Engineer specializing in RAG pipelines, multi-agent systems, cloud AI infrastructure, and compliance-aware AI architecture.',
  keywords: ['ML Engineer', 'AI Systems', 'RAG', 'LangGraph', 'Multi-Agent', 'LLM', 'NumInformatics', 'SmartPAL'],
  url: 'https://fagunraithatha.dev',
  twitterDescription: 'ML Engineer building RAG pipelines, multi-agent systems, and production AI infrastructure.',
}

export const SECTION_IDS = ['about', 'experience', 'projects', 'services', 'education', 'connect'] as const

export const SECTION_LABELS: Record<(typeof SECTION_IDS)[number], string> = {
  about: '01 - About',
  experience: '02 - Experience',
  projects: '03 - Projects',
  services: '04 - Services',
  education: '05 - Education',
  connect: '06 - Connect',
}

export const NAV_ITEMS = [
  { id: 'about', label: 'About', ariaLabel: 'Scroll to About section' },
  { id: 'experience', label: 'Experience', ariaLabel: 'Scroll to Experience section' },
  { id: 'projects', label: 'Projects', ariaLabel: 'Scroll to Projects section' },
  { id: 'services', label: 'Services', ariaLabel: 'Scroll to Services section' },
  { id: 'education', label: 'Education', ariaLabel: 'Scroll to Education section' },
  { id: 'connect', label: 'Connect', ariaLabel: 'Scroll to Connect section' },
] satisfies Array<{ id: (typeof SECTION_IDS)[number]; label: string; ariaLabel: string }>

export const UI_COPY = {
  monogram: 'FR',
  homeAria: 'Scroll to top of page',
  menuOpenAria: 'Open navigation menu',
  menuCloseAria: 'Close navigation menu',
  mobileMenuLabel: 'Mobile navigation',
  scrollPrompt: 'Scroll to explore',
  scrollTiny: 'scroll',
  keyboardHint: 'press keys to jump',
  linkedIn: 'LinkedIn',
  github: 'GitHub',
  getInTouch: 'Get in touch',
  viewProfile: 'View profile',
  seeCode: 'See the code',
  connectHeading: "Let's build something together.",
  portraitForwardAlt: 'Black and white sketch portrait of Fagun Raithatha facing forward',
  portraitUpwardAlt: 'Black and white sketch portrait of Fagun Raithatha looking upward',
  fallbackPortraitTitle: 'Portrait fallback',
  productLink: 'Product',
  liveLink: 'Live',
  sourceLink: 'Source',
  expandRole: 'Expand role details',
  collapseRole: 'Collapse role details',
}

export const KEYBOARD_NAV_ITEMS = [
  {
    type: 'link',
    label: 'Li',
    tooltip: 'LinkedIn',
    icon: 'Linkedin',
    href: PERSONAL.linkedin,
    highlight: true,
    ariaLabel: 'Open LinkedIn',
  },
  {
    type: 'link',
    label: 'Gh',
    tooltip: 'GitHub',
    icon: 'Github',
    href: PERSONAL.github,
    highlight: false,
    ariaLabel: 'Open GitHub',
  },
  {
    type: 'section',
    label: 'Ex',
    tooltip: 'Experience',
    icon: 'Briefcase',
    targetSection: 'experience',
    keyShortcut: 'e',
    highlight: false,
    accent: 'amber',
    ariaLabel: 'Navigate to Experience',
  },
  {
    type: 'section',
    label: 'Pr',
    tooltip: 'Projects',
    icon: 'FolderOpen',
    targetSection: 'projects',
    keyShortcut: 'p',
    highlight: false,
    accent: 'violet',
    ariaLabel: 'Navigate to Projects',
  },
  {
    type: 'section',
    label: 'Se',
    tooltip: 'Services',
    icon: 'Cpu',
    targetSection: 'services',
    keyShortcut: 's',
    highlight: false,
    accent: 'teal',
    ariaLabel: 'Navigate to Services',
  },
  {
    type: 'section',
    label: 'Ed',
    tooltip: 'Education',
    icon: 'GraduationCap',
    targetSection: 'education',
    keyShortcut: 'd',
    highlight: false,
    accent: 'rose',
    ariaLabel: 'Navigate to Education',
  },
] as const

export const HERO_AMBIENT = {
  codeFile: 'agent.py',
  codeLines: [
    'from langgraph import StateGraph',
    'from agents import StudentAgent',
    '',
    'def build_pipeline(',
    '    config: PipelineConfig',
    ') -> StateGraph:',
    '    graph = StateGraph(AgentState)',
    '    graph.add_node("student", StudentAgent(config))',
    '    graph.add_conditional_edges("router", route_intent)',
    '    return graph.compile()',
  ],
  autocomplete: ['add_node', 'add_edge', 'add_conditional_edges', 'compile'],
  thoughtTrace: [
    'classifying student intent...',
    'routing to RAG retrieval node',
    'embedding query [dim=1536]',
    'top-k=5 from Pinecone index',
    'reranking with cross-encoder',
    'synthesizing citation response',
    'evaluating factual grounding',
    'token budget: 312 / 512',
    'streaming to client...',
    'response confidence: 0.91',
  ],
} as const

export const MARGIN_WIDGETS = {
  experience: {
    label: 'accuracy',
    value: '60% -> 85%',
    delta: '+25pp',
  },
  projects: ['$ git push origin main', 'smartpal-v2 deployed', 'latency: 4.2s down', 'build passing'],
  services: ['RAG pipeline', 'Vector store', 'Agent loop', 'FERPA logging'],
} as const

export const METRICS = [
  { value: '60% -> 85%', label: 'Answer accuracy', highlight: true },
  { value: '9s -> <5s', label: 'Response latency', highlight: true },
  { value: '-40%', label: 'Token usage' },
  { value: '-70%', label: 'Non-prod infrastructure cost' },
]

export interface ExperienceItem {
  company: string
  title: string
  dates: string
  location: string
  summary: string
  bullets: string[]
  techChips: string[]
  subProjects: string[]
}

export interface ProjectItem {
  name: string
  subtitle: string
  description: string
  outcomes: string[]
  stack: string[]
  links: {
    product?: string
    github?: string
    live?: string
  }
}

export interface ServiceItem {
  title: string
  icon: 'BrainCircuit' | 'Search' | 'Cloud' | 'ShieldCheck'
  body: string
  capabilities: string[]
}

export interface EducationItem {
  university: string
  initials: string
  brand: 'purdue' | 'sppu'
  link: string
  degree: string
  dates: string
  location: string
  gpa: string
  achievement?: string
  coursework: string[]
  copy: string
}

export const ABOUT_COPY =
  'Over 2 years designing and deploying production AI systems across RAG, multi-agent workflows, cloud infrastructure, and compliance-aware logging. Currently AI/ML Developer at NumInformatics, Indianapolis, building the AI layer for SmartPAL - a higher education assistant platform used in production.'

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'NumInformatics Inc',
    title: 'AI / ML Developer',
    dates: 'Feb 2024 - Present',
    location: 'Indianapolis, IN',
    summary:
      'Re-architected SmartPAL from a single-prompt chatbot to a multi-agent hybrid RAG platform. Accuracy up from 60% to 85%, latency down from 9s to under 5s.',
    bullets: [
      "Re-architected SmartPAL's AI system end-to-end: from single-prompt chatbot to multi-agent hybrid RAG platform. Accuracy 60% -> 85%, latency 9s -> under 5s.",
      'Designed cloud-agnostic architecture spanning AWS, Azure, and GCP. Refactored monolithic components into microservices using Lambda, Fargate, JWT-secured APIs, and S3-based ingestion.',
      'Implemented contextual chunking, hybrid semantic + keyword search, and classifier-level caching - reducing token usage by 40% and repeated LLM calls by ~70%.',
      'Engineered FERPA-compliant encrypted logging pipeline organizing 10,000+ logs into structured S3 paths.',
      'Integrated Langfuse to monitor 5,000+ monthly LLM calls. Improved model stability by 20%.',
      'Architected Terraform-based multi-account AWS foundation: 200+ IaC files, 4 environments, strict least-privilege access controls.',
      'Designed Aurora Serverless v2, DynamoDB, KMS data infrastructure - cutting non-prod costs by 70% while maintaining production-grade compliance.',
      'Leading Teacher Agent development: LangGraph-based agent for course-level insights, student progress reasoning, and safe human-in-the-loop LMS operations.',
    ],
    techChips: [
      'Python',
      'LangGraph',
      'LangChain',
      'Langfuse',
      'Pinecone',
      'AWS Lambda',
      'Fargate',
      'Terraform',
      'Aurora v2',
      'DynamoDB',
      'KMS',
      'Docker',
      'pgvector',
    ],
    subProjects: ['SmartPAL AI - Production, 2024-Present'],
  },
  {
    company: 'Indiana University',
    title: 'Software Engineer',
    dates: 'Jul 2023 - Feb 2024',
    location: 'Indianapolis, IN',
    summary:
      'Built automated TensorFlow pipelines processing 500GB+ of high-dimensional research data for clinical teams. Analysis time reduced by 35%.',
    bullets: [
      'Built automated TensorFlow pipelines and RESTful APIs processing 500GB+ of high-dimensional (5D) research data.',
      'Reduced clinical analysis time by 35%.',
      'Developed Holoviews-based interactive visual tools used by 10+ medical researchers to explore multidimensional imaging and patient datasets.',
      'Reduced manual data-cleaning workload by 50% through automated preprocessing and model-ready data formatting.',
    ],
    techChips: ['Python', 'TensorFlow', 'Keras', 'Holoviews', 'REST APIs', 'Pandas', 'NumPy', 'Scikit-learn'],
    subProjects: [],
  },
]

export const PROJECTS: ProjectItem[] = [
  {
    name: 'SmartPAL AI',
    subtitle: 'Multi-Agent RAG Chatbot Platform',
    description: 'Production AI assistant platform for higher education, architected end-to-end.',
    outcomes: [
      'Accuracy 60% -> 85%',
      'Latency 9s -> under 5s',
      'Token usage down 40%',
      'Redundant LLM calls down 70%',
    ],
    stack: ['LangGraph', 'LangChain', 'Pinecone', 'AWS', 'Terraform', 'Langfuse', 'Aurora Serverless v2'],
    links: { product: PERSONAL.product },
  },
  {
    name: 'SEC-Crypto Knowledge Base',
    subtitle: 'Autonomous Regulatory Intelligence System',
    description: 'Autonomous SEC crypto intelligence pipeline that turns official SEC sources into a searchable compliance knowledge base.',
    outcomes: [
      '5,000+ pages processed',
      'Redundant ingest down 90% via SHA deduplication',
      'Manual research time down 80%',
      '10+ N8N workflows built',
    ],
    stack: ['N8N', 'Web scraping', 'PDF ingestion', 'YouTube transcripts', 'Pinecone', 'Embeddings', 'Metadata search'],
    links: {},
  },
  {
    name: 'AuditInsight',
    subtitle: 'Graph-RAG Audit Intelligence System',
    description: 'Neo4j-powered audit intelligence enabling cross-company reasoning via shared auditors and correlated entities.',
    outcomes: [
      '10,000+ nodes and edges in knowledge graph',
      'Multi-document reasoning accuracy up 40% vs standard vector RAG',
      'Hallucination rate down 30%',
    ],
    stack: ['Neo4j', 'Graph Data Science', 'Embedding enrichment', 'PDF ingestion pipeline', 'Graph-RAG'],
    links: {},
  },
]

export const SERVICES: ServiceItem[] = [
  {
    title: 'AI system design',
    icon: 'BrainCircuit',
    body: 'I architect AI systems end-to-end: from data ingestion and retrieval design to agent orchestration and evaluation. I think in production constraints, not demos.',
    capabilities: [
      'Multi-agent orchestration',
      'LangGraph workflow design',
      'Semantic routing and intent classification',
      'LLM evaluation frameworks',
      'Agentic tool and memory design',
    ],
  },
  {
    title: 'RAG and retrieval pipelines',
    icon: 'Search',
    body: 'I build retrieval systems that work at scale - hybrid search, contextual chunking, reranking, corrective RAG loops, and citation-accurate responses.',
    capabilities: [
      'Hybrid semantic + keyword search',
      'Pinecone, FAISS, pgvector vector indexing',
      'Chunking strategy design',
      'Embedding model selection and evaluation',
      'Corrective RAG and retrieval loop design',
    ],
  },
  {
    title: 'Cloud and MLOps infrastructure',
    icon: 'Cloud',
    body: 'I build the infrastructure that keeps AI systems running reliably: serverless, containerized, monitored, and cost-aware.',
    capabilities: [
      'AWS (Lambda, Fargate, S3, API Gateway, CloudWatch)',
      'Terraform IaC across multi-account environments',
      'Docker and Kubernetes',
      'GitHub Actions CI/CD pipelines',
      'Langfuse LLM observability',
      'Aurora Serverless v2 and DynamoDB',
    ],
  },
  {
    title: 'Compliance-aware AI architecture',
    icon: 'ShieldCheck',
    body: 'I design AI systems that operate within legal and institutional constraints - FERPA, HIPAA, SOC 2 adjacency - without sacrificing capability.',
    capabilities: [
      'Encrypted logging pipelines',
      'Structured audit trails',
      'Least-privilege IAM design',
      'Data residency and access controls',
      'FERPA-compliant LLM call logging',
    ],
  },
]

export const EDUCATION: EducationItem[] = [
  {
    university: 'Purdue University',
    initials: 'PU',
    brand: 'purdue',
    link: 'https://www.purdue.edu/',
    degree: 'Master of Science, Computer Information Science',
    dates: '2021 - 2023',
    location: 'United States',
    gpa: '3.57 / 4.0',
    achievement: "Dean's Scholarship recipient",
    coursework: [
      'Data Mining',
      'Natural Language Processing',
      'Deep Learning',
      'Big Data Analytics',
      'Image Processing / Computer Vision',
      'Intelligent Systems',
      'Computer System Security',
    ],
    copy:
      'My graduate work at Purdue focused on machine learning, NLP, deep learning, big data analytics, computer vision, intelligent systems, and security.',
  },
  {
    university: 'Savitribai Phule Pune University',
    initials: 'SPPU',
    brand: 'sppu',
    link: 'https://www.unipune.ac.in/',
    degree: 'Bachelor of Engineering, Computer Engineering',
    dates: '2016 - 2020',
    location: 'India',
    gpa: '8.15 / 10',
    coursework: [
      'AI and Robotics',
      'Machine Learning',
      'Data Analytics',
      'Data Mining and Warehousing',
      'System Programming and Operating Systems',
      'Information and Cyber Security',
      'Human Computer Interface',
    ],
    copy:
      'My undergraduate foundation in computer engineering gave me strong grounding in systems, machine learning, data analytics, operating systems, and human-computer interaction.',
  },
]

export const SOCIAL_LINKS = [
  {
    platform: 'LinkedIn',
    href: PERSONAL.linkedin,
    icon: 'Linkedin',
    cta: 'View profile',
    external: true,
  },
  {
    platform: 'GitHub',
    href: PERSONAL.github,
    icon: 'Github',
    cta: 'See the code',
    external: true,
  },
  {
    platform: 'Email',
    href: `mailto:${PERSONAL.email}`,
    icon: 'Mail',
    cta: PERSONAL.email,
    external: false,
  },
] as const
