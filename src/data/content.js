// ─────────────────────────────────────────────────────────────
//  All site content lives here. Edit copy, metrics, and links in
//  one place — the components read from this file.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Tharun Derangula',
  initials: 'TD',
  role: 'Full-Stack Software Engineer',
  focus: ['AI / ML Integration', 'Distributed Systems'],
  location: 'United States',
  status: 'Open to Senior / Staff roles',
  email: 'dtharun209@gmail.com',
  phone: '+1 (408) 652-9472',
  tagline:
    'I build AI products and event-driven systems that stay calm under load and ship them at Walmart scale.',
  intro:
    'Full-stack engineer with 4+ years turning ambiguous product ideas into production systems that serve millions. Lately I live where AI meets distributed infrastructure: RAG and LLM features on top of resilient, observable, event-driven backends. I own features end to end, mentor the engineers around me, and move fast without leaving a mess.',
  links: [
    { label: 'GitHub', href: 'https://github.com/', handle: '@tharun' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/', handle: 'in/tharun' },
    { label: 'Email', href: 'mailto:dtharun209@gmail.com', handle: 'dtharun209@gmail.com' },
  ],
}

// Headline stats for the hero ribbon + metrics band
export const headlineStats = [
  { value: 4, suffix: '+', label: 'Years shipping production systems' },
  { value: 35, suffix: '%', label: 'p95 latency cut on hot-path APIs' },
  { value: 50, suffix: '%', label: 'Faster, zero-downtime deploys' },
  { value: 85, suffix: '%', label: 'Test coverage held on owned services' },
]

export const projects = [
  {
    id: 'sparky',
    index: '01',
    company: 'Walmart Global Tech',
    project: 'Sparky — Walmart’s AI Shopping Agent',
    period: 'Apr 2025 — Present',
    region: 'USA',
    narrative: [
      'Sparky is Walmart’s AI-powered shopping assistant that helps customers discover products, compare options, and receive personalized recommendations through natural-language conversations. It was built to make product discovery feel intuitive and conversational for millions of Walmart customers across web and mobile.',
      'As a Full-Stack Software Engineer, I work on the backend services, event-driven workflows, and AI integration layers that power product retrieval, recommendation pipelines, and the conversational shopping experience. I design APIs, integrate distributed systems, build reliable data flows, and improve the performance and resiliency of customer-facing services.',
      'I work extensively with event-driven architecture, real-time messaging, AI-powered retrieval pipelines, and cloud-native infrastructure so the platform handles large-scale traffic while holding low latency and high availability. My work supports an experience used by millions of customers while enabling faster feature delivery, improved reliability, and seamless AI-driven interactions.',
    ],
    stack: ['Java', 'Spring Boot', 'Kafka', 'GraphQL', 'React', 'Next.js', 'PostgreSQL', 'pgvector', 'Redis', 'Kubernetes', 'Terraform', 'gRPC', 'LLM / RAG', 'AWS', 'GitHub Actions', 'Observability'],
  },
  {
    id: 'ksu',
    index: '02',
    company: 'Kennesaw State University',
    project: 'Campus Hub — One Platform for a University',
    period: 'Jan 2024 — Dec 2024',
    region: 'USA',
    narrative: [
      'Campus Hub is a unified student and faculty platform that brings Owl Express, D2L Brightspace, DegreeWorks, and KSUMail together behind a single responsive interface. Before it, students juggled several disconnected systems to register for classes, track grades, and check financial aid — slow, confusing, and error-prone, especially during peak registration.',
      'I built the platform end to end: the React, Next.js, and TypeScript front end, the Node.js and Spring Boot APIs behind it, and the integrations into Ellucian Banner and DegreeWorks with query tuning and caching to keep dashboards fast. I owned the Java/Spring Boot services over PostgreSQL and the reconciliation layer that keeps enrollment, grades, and financial-aid data consistent across every connected system.',
      'The result was one calm front door to the university: dashboards loaded noticeably faster, manual data corrections across systems dropped sharply, and zero-downtime deploys on AWS with Docker and GitHub Actions let us ship through peak registration without disrupting students.',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Spring Boot', 'PostgreSQL', 'Redis', 'REST APIs', 'AWS', 'Docker', 'GitHub Actions'],
  },
  {
    id: 'hcl',
    index: '03',
    company: 'HCL Tech',
    project: 'Enterprise Banking — Payments at Scale',
    period: 'May 2020 — Dec 2022',
    region: 'India',
    narrative: [
      'This was an enterprise banking platform for invoice tracking and payment workflows used by corporate banking customers across regions. Payments at this scale cannot drop or double-charge, so the system needed exactly-once processing and resilience under heavy, bursty load — while a legacy monolith underneath was slowing every release down to days.',
      'I worked across the stack: responsive React and TypeScript interfaces backed by Java and Spring Boot APIs, and the event-driven payment engine built on Kafka with idempotent retries and dead-letter queues so transactions stayed correct under pressure. I also built ETL pipelines in Python and BigQuery that fed clean data to downstream finance, analytics, and compliance teams.',
      'I helped modernize the legacy backend into microservices on Docker, Terraform, and Google Cloud (Cloud Run and GKE), which cut release cycles from days to hours, reduced peak-period response times, and brought down production defects after the migration — a more reliable payments platform that the business could evolve quickly.',
    ],
    stack: ['React', 'TypeScript', 'Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Python', 'BigQuery', 'Docker', 'Terraform', 'GKE', 'Cloud Run'],
  },
]

export const stackGroups = [
  {
    label: 'Languages',
    items: ['Java', 'TypeScript', 'JavaScript (ES6+)', 'Python', 'Go', 'SQL'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Next.js (SSR)', 'Redux', 'Tailwind CSS', 'HTML5', 'CSS3', 'Jest', 'React Testing Library', 'Cypress'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express.js', 'Spring Boot', 'REST APIs', 'GraphQL', 'gRPC', 'Kafka', 'Redis', 'Microservices'],
  },
  {
    label: 'AI / ML',
    items: ['LLM Integration', 'RAG', 'pgvector', 'Vector Retrieval', 'LangChain', 'OpenAI API', 'Anthropic API', 'Prompt Engineering'],
  },
  {
    label: 'Cloud & DevOps',
    items: ['GCP', 'AWS (EC2, S3, CloudWatch, DynamoDB)', 'Docker', 'Kubernetes', 'Terraform', 'Helm', 'GitHub Actions', 'Prometheus', 'Grafana'],
  },
  {
    label: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Snowflake', 'Elasticsearch', 'DynamoDB'],
  },
  {
    label: 'Engineering Practices',
    items: ['System Design', 'Distributed Systems', 'Event-Driven Architecture', 'Domain-Driven Design', 'Microservices', 'TDD', 'CI/CD', 'Agile / Scrum'],
  },
  {
    label: 'AI Developer Tools',
    items: ['Claude Code', 'GitHub Copilot', 'Cursor', 'Codex'],
  },
]

export const principles = [
  {
    k: 'Calm under load',
    v: 'Idempotent retries, dead-letter queues, graceful degradation, and caching layers so the system holds its shape when traffic doesn’t.',
  },
  {
    k: 'Own it end to end',
    v: 'From the React surface to the Kafka consumer to the Terraform that ships it — I take features the whole way and stay accountable for them in production.',
  },
  {
    k: 'Measure, then move',
    v: 'Every change earns its place against p95s, coverage, and A/B lift. Observability first, opinions second.',
  },
  {
    k: 'Build with AI, deliberately',
    v: 'Claude Code, Copilot, Cursor, and Codex for scaffolding and refactors — paired with judgment, tests, and review, not in place of them.',
  },
]

export const timeline = [
  { kind: 'work', role: 'Software Engineer', org: 'Walmart Global Tech', period: 'Apr 2025 — Present', place: 'USA' },
  { kind: 'work', role: 'Software Engineer', org: 'Kennesaw State University', period: 'Jan 2024 — Dec 2024', place: 'USA' },
  { kind: 'edu', role: 'M.S. Information Technology', org: 'Kennesaw State University', period: '2023 — 2024', place: 'USA' },
  { kind: 'work', role: 'Software Engineer', org: 'HCL Tech', period: 'May 2020 — Dec 2022', place: 'India' },
  { kind: 'edu', role: 'B.S. Computer Science & Engineering', org: 'Lovely Professional University', period: '2018 — 2022', place: 'India' },
]

export const certifications = [
  'Google Professional Cloud Architect',
  'Google AI Essentials Specialization',
  'AWS Certified Solutions Architect - Professional',
  'Microsoft Generative AI Engineering Professional',
  'Anthropic - Al Fluency Framework & Foundations',
  'Anthropic - Claude code 101',
]

// Tech words for the hero marquee
export const marqueeItems = [
  'Distributed Systems', 'Event-Driven Architecture', 'RAG', 'Kafka', 'Spring Boot',
  'React / Next.js', 'pgvector', 'Kubernetes', 'GraphQL', 'Domain-Driven Design',
  'LLM Integration', 'Redis', 'Terraform', 'gRPC', 'Observability',
]
