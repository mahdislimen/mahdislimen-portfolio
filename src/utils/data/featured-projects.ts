import { FlowDiagram } from '@/core/models/flow.interface';
import { accountingFlow, docChatFlow } from './architectures';

/**
 * Featured projects. These run locally and are not deployed publicly, so
 * there are deliberately no demo or repository links. See the redesign brief.
 */
export interface FeaturedProject {
  id: string;
  name: string;
  tagline: string;
  status: string;
  statusTone: 'building' | 'independent' | 'delivered';
  period?: string;
  context?: string;
  description: string;
  problem: string;
  architecture: string[];
  features: string[];
  aiTech: string[];
  tech: string[];
  visual: 'flow' | 'dashboard';
  diagram?: FlowDiagram;
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'accounting',
    name: 'AI-Powered Accounting Management Platform',
    tagline: 'Autonomous agents on top of deterministic financial logic.',
    status: 'Independent Product · In Development',
    statusTone: 'building',
    period: 'Jun 2026 – Present',
    description:
      'A multi-tenant SaaS accounting platform that combines AI agents for natural-language interaction, reasoning and orchestration with deterministic Spring Boot services for every financial calculation.',
    problem:
      'Accounting needs both conversational help and exact numbers. An LLM should never be the one computing a balance, so the agent works through tools and the arithmetic stays in tested code.',
    architecture: [
      'Python and FastAPI asynchronous AI services, kept separate from the accounting logic.',
      'Agents built on the Anthropic Claude API, with Ollama for local LLM execution.',
      'Tool calling and structured outputs as the only bridge between agent and ledger.',
      'Java and Spring Boot own GL, AP, AR and core financial workflows, exposed as tools.',
      'PostgreSQL persistence, Angular frontend, Docker and GitHub Actions delivery.',
    ],
    features: [
      'Multi-tenant accounts with users, roles and permissions',
      'General Ledger, Accounts Payable and Accounts Receivable workflows',
      'Natural-language assistant for accounting tasks',
      'Schema-validated agent responses',
    ],
    aiTech: ['Claude API', 'Ollama', 'AI Agents', 'Tool Calling', 'Structured Outputs'],
    tech: ['Python', 'FastAPI', 'Java', 'Spring Boot', 'PostgreSQL', 'Angular', 'Docker', 'GitHub Actions'],
    visual: 'flow',
    diagram: accountingFlow,
  },
  {
    id: 'docchat',
    name: 'DocChat: RAG Knowledge Assistant',
    tagline: 'Ask questions, get answers grounded in your own documents.',
    status: 'Independent Project',
    statusTone: 'independent',
    description:
      'A document-based AI assistant that answers questions from a custom knowledge base using retrieval-augmented generation.',
    problem:
      'General-purpose LLMs do not know an organisation\'s documents and may invent answers. DocChat retrieves the relevant passages first and answers from them.',
    architecture: [
      'LangChain document loaders and chunking.',
      'Azure OpenAI embeddings stored in PostgreSQL with pgvector for semantic retrieval.',
      'Retrieved context injected into the prompt for grounded generation.',
    ],
    features: ['Document loading', 'Chunking', 'Semantic retrieval', 'Grounded answers'],
    aiTech: ['LangChain', 'Azure OpenAI', 'Embeddings', 'RAG'],
    tech: ['Python', 'PostgreSQL', 'pgvector'],
    visual: 'flow',
    diagram: docChatFlow,
  },
  {
    id: 'quality',
    name: 'Quality Defect Management & Analytics Platform',
    tagline: 'Defect tracking, PPM analytics and AI-assisted defect reduction.',
    status: 'Professional · HUBER+SUHNER',
    statusTone: 'delivered',
    period: 'Feb 2024 – Jul 2024',
    description:
      'A full-stack industrial application for recording production defects, monitoring PPM indicators and exploring quality KPIs, extended with AI features that help analyse defects and reduce them.',
    problem:
      'Defects are entered through forms, which is slow when operators work from paper defect sheets. Quality teams also need help understanding why defects occur, not just counting them.',
    architecture: [
      'Spring Boot REST APIs secured with JWT and role-based access control.',
      'Angular frontend with interactive ApexCharts dashboards.',
      'Defect-sheet scanning that parses the data automatically, so no manual form entry is needed.',
      'AI chatbot for production defect analysis, plus a recommendation system to reduce defects.',
      'MySQL persistence; CI/CD to Microsoft Azure.',
    ],
    features: ['Production defect tracking', 'PPM monitoring', 'KPI dashboards', 'Defect-sheet scanning', 'Defect-analysis chatbot', 'Defect-reduction recommendations'],
    aiTech: ['AI Chatbot', 'Recommendation System', 'Document Parsing'],
    tech: ['Spring Boot', 'Angular', 'ApexCharts', 'MySQL', 'JWT', 'Azure'],
    visual: 'dashboard',
  },
];
