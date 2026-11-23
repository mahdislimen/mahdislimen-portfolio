import { FlowDiagram } from '@/core/models/flow.interface';

/** Project 1: hybrid AI + deterministic accounting architecture. */
export const accountingFlow: FlowDiagram = {
  id: 'accounting',
  title: 'Hybrid agent architecture',
  caption: 'Agents reason and orchestrate. Financial logic stays deterministic.',
  zones: [
    { id: 'client', label: 'Client', tone: 'neutral' },
    { id: 'ai', label: 'AI services · FastAPI', tone: 'ai' },
    { id: 'core', label: 'Accounting core · Spring Boot', tone: 'deterministic' },
    { id: 'out', label: 'Result', tone: 'neutral' },
  ],
  nodes: [
    {
      id: 'user', label: 'User', tech: 'Natural language', icon: 'user', zone: 'client',
      detail: 'An accountant asks in plain language, for example to review open payables or prepare an entry, instead of navigating forms.',
    },
    {
      id: 'agent', label: 'AI Agent', tech: 'FastAPI · async', icon: 'agent', zone: 'ai',
      detail: 'An asynchronous FastAPI service runs the agent. It keeps conversation state, decides which steps are needed and orchestrates the tools.',
    },
    {
      id: 'llm', label: 'LLM', tech: 'Claude API · Ollama', icon: 'llm', zone: 'ai',
      detail: 'Reasoning comes from the Anthropic Claude API, with Ollama available for local model execution. The model never computes balances itself.',
    },
    {
      id: 'tools', label: 'Tool Calling', tech: 'Typed tool schemas', icon: 'tool', zone: 'ai',
      detail: 'The model selects tools with typed arguments. Each tool maps to a deterministic backend operation, so actions are explicit and reviewable.',
    },
    {
      id: 'services', label: 'Financial Services', tech: 'Spring Boot · REST', icon: 'service', zone: 'core',
      detail: 'Spring Boot services own all accounting rules (GL, AP, AR and core workflows), so calculations stay deterministic and testable.',
    },
    {
      id: 'db', label: 'PostgreSQL', tech: 'Multi-tenant data', icon: 'database', zone: 'core',
      detail: 'PostgreSQL persists tenants, users, roles and ledgers. Only the accounting core writes to it.',
    },
    {
      id: 'out', label: 'Structured Response', tech: 'Validated schema', icon: 'output', zone: 'out',
      detail: 'The agent replies with structured output validated against a schema, which the Angular frontend can render safely.',
    },
  ],
};

/** Project 2: compact RAG pipeline used on the DocChat card. */
export const docChatFlow: FlowDiagram = {
  id: 'docchat',
  title: 'RAG pipeline',
  zones: [
    { id: 'ingest', label: 'Ingestion', tone: 'data' },
    { id: 'answer', label: 'Retrieval & generation', tone: 'ai' },
  ],
  nodes: [
    { id: 'docs', label: 'Documents', icon: 'document', zone: 'ingest', detail: 'The custom knowledge base the assistant answers from.' },
    { id: 'load', label: 'Loading', tech: 'LangChain loaders', icon: 'document', zone: 'ingest', detail: 'Document loaders read the source files into a common format.' },
    { id: 'chunk', label: 'Chunking', icon: 'split', zone: 'ingest', detail: 'Documents are split into overlapping chunks small enough to retrieve precisely.' },
    { id: 'embed', label: 'Embeddings', tech: 'Azure OpenAI', icon: 'vector', zone: 'ingest', detail: 'Each chunk is turned into an embedding vector with Azure OpenAI.' },
    { id: 'retrieve', label: 'Vector retrieval', tech: 'pgvector', icon: 'search', zone: 'answer', detail: 'The question is embedded and the most similar chunks are retrieved from PostgreSQL with pgvector.' },
    { id: 'inject', label: 'Context injection', icon: 'inject', zone: 'answer', detail: 'Retrieved chunks are injected into the prompt as the only context the model should use.' },
    { id: 'llm', label: 'LLM', tech: 'Azure OpenAI', icon: 'llm', zone: 'answer', detail: 'The model writes an answer from the injected context.' },
    { id: 'answer', label: 'Grounded answer', icon: 'output', zone: 'answer', detail: 'The answer is grounded in the knowledge base rather than in the model\'s general memory.' },
  ],
};

/** Section 8, tab A: enterprise AI engineering workflow. */
export const enterpriseFlow: FlowDiagram = {
  id: 'enterprise',
  title: 'Enterprise AI integration',
  caption: 'How I add agents to an existing business application without bypassing its rules.',
  zones: [
    { id: 'edge', label: 'Existing application', tone: 'neutral' },
    { id: 'ai', label: 'Agent layer · LangGraph', tone: 'ai' },
    { id: 'biz', label: 'Business systems', tone: 'deterministic' },
  ],
  nodes: [
    { id: 'user', label: 'User', icon: 'user', zone: 'edge', detail: 'A business user works inside the application they already know.' },
    { id: 'app', label: 'Application', tech: 'ERP · AI chatbot', icon: 'app', zone: 'edge', detail: 'The chatbot is embedded in the existing ERP interface, so AI is part of the workflow instead of a separate tool.' },
    { id: 'agent', label: 'AI Agent', tech: 'LangGraph', icon: 'agent', zone: 'ai', detail: 'LangGraph models the agent as an explicit graph of steps, branches and retries, which keeps multi-step workflows predictable.' },
    { id: 'llm', label: 'LLM', tech: 'LLM APIs', icon: 'llm', zone: 'ai', detail: 'The LLM interprets intent and plans. RAG over ERP data and business documents grounds its answers.' },
    { id: 'tools', label: 'Tools', tech: 'MCP', icon: 'tool', zone: 'ai', detail: 'Business capabilities are exposed as MCP tools, giving the agent one standard, permissioned interface to ERP operations.' },
    { id: 'services', label: 'Business Services', tech: 'Spring Boot · Kafka', icon: 'service', zone: 'biz', detail: 'Existing Spring Boot microservices run the action, applying the same validation and events (Apache Kafka) as any other client.' },
    { id: 'db', label: 'Database', icon: 'database', zone: 'biz', detail: 'Data is only changed through business services, never written to directly by the model.' },
  ],
  rail: {
    label: 'LangSmith tracing',
    detail: 'Every agent run, LLM call and tool invocation is traced in LangSmith for debugging and evaluation.',
  },
};

/** Section 8, tab B: full RAG architecture with offline ingestion + online query. */
export const ragIngestFlow: FlowDiagram = {
  id: 'rag-ingest',
  title: 'Ingestion (offline)',
  zones: [{ id: 'ingest', label: 'Indexing pipeline', tone: 'data' }],
  nodes: [
    { id: 'docs', label: 'Sources', tech: 'Docs · ERP data', icon: 'document', zone: 'ingest', detail: 'Business documents and application data that the assistant should know about.' },
    { id: 'load', label: 'Load & clean', icon: 'document', zone: 'ingest', detail: 'Loaders extract text and metadata and normalise formats.' },
    { id: 'chunk', label: 'Chunk', tech: 'Chunking strategy', icon: 'split', zone: 'ingest', detail: 'Text is split by size and structure, with overlap, so each chunk carries enough context to stand alone.' },
    { id: 'embed', label: 'Embed', icon: 'vector', zone: 'ingest', detail: 'Each chunk is converted into an embedding vector.' },
    { id: 'index', label: 'Vector store', tech: 'PostgreSQL · pgvector', icon: 'database', zone: 'ingest', detail: 'Vectors are stored with their metadata in PostgreSQL using pgvector, ready for similarity search.' },
  ],
};

export const ragQueryFlow: FlowDiagram = {
  id: 'rag-query',
  title: 'Query (online)',
  zones: [{ id: 'query', label: 'Answering pipeline', tone: 'ai' }],
  nodes: [
    { id: 'q', label: 'Question', icon: 'user', zone: 'query', detail: 'The user asks in natural language.' },
    { id: 'qe', label: 'Embed query', icon: 'vector', zone: 'query', detail: 'The question is embedded in the same vector space as the chunks.' },
    { id: 'ret', label: 'Retrieve', tech: 'Semantic search', icon: 'search', zone: 'query', detail: 'The most relevant chunks are retrieved by similarity.' },
    { id: 'ctx', label: 'Inject context', icon: 'inject', zone: 'query', detail: 'Retrieved chunks are added to the prompt with instructions to answer only from them.' },
    { id: 'llm', label: 'LLM', icon: 'llm', zone: 'query', detail: 'The model writes the answer from the provided context.' },
    { id: 'ans', label: 'Grounded answer', icon: 'output', zone: 'query', detail: 'The response is based on retrieved knowledge, not the model\'s general memory.' },
  ],
};
