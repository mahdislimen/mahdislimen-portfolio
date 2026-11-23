import { CareerStage, Experience } from '@/core/models/experience.interface';

// Dates and titles match docs/MahdiSlimen-Cv.pdf.
// AI responsibilities come from the redesign brief, confirmed by Mahdi.
export const experiences: Experience[] = [
  {
    id: 1,
    title: 'Technical Consultant – Java JEE / Financial ERP',
    company: 'UniQ Soft Technology',
    duration: 'Dec 2024 – Jun 2026',
    location: 'Tunis, Tunisia',
    stage: 'ai',
    featured: true,
    summary:
      'Brought AI agents and an AI chatbot into an enterprise financial ERP for banking and financial-sector clients, and owned backend services from architecture to production.',
    groups: [
      {
        label: 'AI integration',
        items: [
          'Integrated AI agents and an AI chatbot into an enterprise financial ERP.',
          'Designed agent orchestration with LangGraph.',
          'Connected AI agents to ERP business tools through MCP (Model Context Protocol).',
          'Built a RAG system with LangChain to retrieve relevant information from ERP data and business documents.',
          'Integrated LLM capabilities into enterprise business workflows.',
        ],
      },
      {
        label: 'Backend & platform',
        items: [
          'Developed backend services and REST APIs with Java and Spring Boot for GL, AP, AR and Fixed Assets modules.',
          'Implemented microservices and event-driven integration with Apache Kafka.',
          'Automated financial and accounting processes.',
          'Owned backend services from architecture and implementation to production deployment and support.',
          'Shipped with Docker, Kubernetes, Microsoft Azure and CI/CD pipelines.',
        ],
      },
    ],
    highlights: [],
    aiTech: ['LangChain', 'LangGraph', 'LangSmith', 'MCP', 'RAG', 'LLM APIs', 'AI Agents'],
    tech: ['Java', 'Spring Boot', 'Apache Kafka', 'Docker', 'Kubernetes', 'Microsoft Azure'],
  },
  {
    id: 2,
    title: 'Full Stack Java Developer',
    company: 'HUBER+SUHNER',
    duration: 'Feb 2024 – Jul 2024',
    location: 'Sousse, Tunisia',
    stage: 'enterprise',
    summary:
      'Built a Quality Defect Management & Analytics Platform for industrial production, then extended it with AI: defect-sheet scanning, a defect-analysis chatbot and defect-reduction recommendations.',
    highlights: [
      'Built an industrial application to track production defects and PPM indicators.',
      'Designed interactive Angular dashboards with ApexCharts for production information and KPIs.',
      'Developed secure Spring Boot REST APIs with JWT authentication and role-based access control.',
      'Automated build and deployment through CI/CD on Microsoft Azure.',
    ],
    aiHighlights: [
      'Added defect-sheet scanning that parses defect data automatically, removing the need for manual entry through forms.',
      'Integrated an AI chatbot that analyses defects in the production unit.',
      'Built a recommendation system that suggests actions to reduce production defects.',
    ],
    aiTech: ['AI Chatbot', 'Recommendation System', 'Document Parsing', 'Agentic AI'],
    tech: ['Java', 'Spring Boot', 'Angular', 'ApexCharts', 'MySQL', 'Docker', 'Kubernetes', 'Microsoft Azure', 'CI/CD'],
  },
  {
    id: 3,
    title: 'Web Developer – Java / Angular',
    company: 'INOVTECH ENGINEERING',
    duration: 'Jun 2023 – Oct 2023',
    location: 'Sousse, Tunisia',
    stage: 'development',
    summary: 'Delivered an industrial platform to production that collects and visualizes real-time machine data.',
    highlights: [
      'Collected and visualized real-time industrial machine data.',
      'Built Spring Boot APIs exchanging machine data over MQTT.',
    ],
    tech: ['Java', 'Spring Boot', 'Angular', 'MQTT', 'Chart.js'],
  },
  {
    id: 4,
    title: 'IT Support Technician',
    company: 'Sartex Groupe',
    duration: 'Aug 2021 – Jan 2023',
    location: 'Ksar Hellal, Tunisia',
    stage: 'support',
    summary: 'First-level IT support, system maintenance, backup management and software updates.',
    highlights: [],
    tech: [],
  },
];

export interface CareerStep {
  stage: CareerStage;
  label: string;
  period: string;
  company: string;
}

/** Career arc shown above the detailed timeline (oldest to newest). */
export const careerArc: CareerStep[] = [
  { stage: 'support', label: 'IT Support', period: '2021', company: 'Sartex Groupe' },
  { stage: 'development', label: 'Software Development', period: '2023', company: 'INOVTECH' },
  { stage: 'enterprise', label: 'Enterprise Engineering', period: '2024', company: 'HUBER+SUHNER' },
  { stage: 'ai', label: 'AI Integration', period: '2024 – now', company: 'UniQ Soft · Independent' },
];
