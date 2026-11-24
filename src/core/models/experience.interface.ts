export type CareerStage = 'support' | 'development' | 'enterprise' | 'ai';

export interface ExperienceGroup {
    label: string;
    items: string[];
}

export interface Experience {
    id: number;
    duration: string;
    title: string;
    company: string;
    location: string;
    summary: string;
    /** Stage of the career arc this role belongs to (drives the timeline). */
    stage: CareerStage;
    featured?: boolean;
    /** Pill label shown on a featured card (e.g. "AI Integration"). */
    badge?: string;
    groups?: ExperienceGroup[];
    highlights: string[];
    /** AI-specific achievements, rendered with the violet AI accent. */
    aiHighlights?: string[];
    tech: string[];
    aiTech?: string[];
}
