/** AI Engineering Expertise (section 4) and Technology Ecosystem (section 7). */

export type ExpertiseIcon =
  | 'llm' | 'rag' | 'agent' | 'observability' | 'backend' | 'infra' | 'frontend' | 'database';

export interface ExpertiseGroup {
  id: string;
  title: string;
  icon: ExpertiseIcon;
  blurb: string;
  items: string[];
  /** AI groups are visually emphasised in the bento grid. */
  ai: boolean;
  /** Grid footprint on large screens. */
  size: 'lg' | 'md' | 'sm';
}

export const expertise: ExpertiseGroup[] = [
  {
    id: 'llm', title: 'LLM Engineering', icon: 'llm', ai: true, size: 'lg',
    blurb: 'Adding language models to products with typed, predictable interfaces.',
    items: ['Large Language Models', 'Anthropic Claude API', 'Azure OpenAI', 'Ollama', 'Prompt Engineering', 'Structured Outputs', 'Tool Calling', 'LLM Integration'],
  },
  {
    id: 'agentic', title: 'Agentic AI', icon: 'agent', ai: true, size: 'lg',
    blurb: 'Multi-step agents that act on real business systems.',
    items: ['AI Agents', 'LangGraph', 'Agent Orchestration', 'Tool Calling', 'Multi-step Workflows', 'MCP (Model Context Protocol)', 'Business Process Automation'],
  },
  {
    id: 'rag', title: 'RAG Engineering', icon: 'rag', ai: true, size: 'md',
    blurb: 'Grounded assistants over documents and enterprise data.',
    items: ['Retrieval-Augmented Generation', 'LangChain', 'Embeddings', 'Document Processing', 'Chunking Strategies', 'Semantic Search', 'pgvector', 'Context Retrieval', 'Grounded LLM Responses'],
  },
  {
    id: 'observability', title: 'AI Observability', icon: 'observability', ai: true, size: 'sm',
    blurb: 'Seeing what agents actually do.',
    items: ['LangSmith', 'LLM Tracing', 'Debugging & Evaluation'],
  },
  {
    id: 'backend', title: 'Backend Engineering', icon: 'backend', ai: false, size: 'md',
    blurb: 'Services that hold the business logic.',
    items: ['Python', 'FastAPI', 'Java', 'Spring Boot', 'REST APIs', 'Microservices', 'Apache Kafka'],
  },
  {
    id: 'infra', title: 'Infrastructure & DevOps', icon: 'infra', ai: false, size: 'md',
    blurb: 'From container to production.',
    items: ['Docker', 'Kubernetes', 'Microsoft Azure', 'GitHub Actions', 'Jenkins', 'CI/CD', 'Linux'],
  },
  {
    id: 'frontend', title: 'Frontend Development', icon: 'frontend', ai: false, size: 'sm',
    blurb: 'Interfaces for complex data.',
    items: ['Angular', 'TypeScript', 'JavaScript', 'React (basic)'],
  },
  {
    id: 'databases', title: 'Databases', icon: 'database', ai: false, size: 'sm',
    blurb: 'Relational data, modelled carefully.',
    items: ['PostgreSQL', 'MySQL', 'SQL Server', 'Oracle'],
  },
];

/** Technology ecosystem map: five clusters around the engineer. */
export interface EcosystemCluster {
  id: string;
  label: string;
  color: string;
  items: string[];
}

export const ecosystem: EcosystemCluster[] = [
  { id: 'ai', label: 'AI', color: '#8B6CFF', items: ['LangChain', 'LangGraph', 'LangSmith', 'MCP', 'Claude API', 'Azure OpenAI', 'Ollama'] },
  { id: 'backend', label: 'Backend', color: '#4C8DFF', items: ['Python', 'FastAPI', 'Java', 'Spring Boot', 'Kafka'] },
  { id: 'infra', label: 'Infrastructure', color: '#2DD4BF', items: ['Docker', 'Kubernetes', 'Azure', 'GitHub Actions', 'Jenkins', 'Linux'] },
  { id: 'data', label: 'Data', color: '#F5B454', items: ['PostgreSQL', 'pgvector', 'MySQL', 'SQL Server', 'Oracle'] },
  { id: 'frontend', label: 'Frontend', color: '#F472B6', items: ['Angular', 'TypeScript', 'JavaScript', 'React (basic)'] },
];
