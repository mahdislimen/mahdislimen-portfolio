/**
 * Data model for the interactive architecture diagrams (FlowDiagramComponent).
 * A diagram is a linear request path; consecutive nodes that share a `zone`
 * are wrapped in a labelled lane so the reader sees which runtime owns them.
 */
export type FlowTone = 'neutral' | 'ai' | 'deterministic' | 'data';

export interface FlowNode {
  id: string;
  label: string;
  /** Short technology caption under the label. */
  tech?: string;
  /** Explanation shown in the detail panel when the node is active. */
  detail: string;
  zone?: string;
  /** Icon key, resolved by the diagram component. */
  icon: FlowIcon;
}

export interface FlowZone {
  id: string;
  label: string;
  tone: FlowTone;
}

export interface FlowDiagram {
  id: string;
  title: string;
  caption?: string;
  nodes: FlowNode[];
  zones: FlowZone[];
  /** Optional cross-cutting concern rendered as a rail under the flow (e.g. tracing). */
  rail?: { label: string; detail: string };
}

export type FlowIcon =
  | 'user' | 'app' | 'agent' | 'llm' | 'tool' | 'service' | 'database'
  | 'output' | 'document' | 'split' | 'vector' | 'search' | 'inject' | 'queue';
