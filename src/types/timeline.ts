export type MemoryMediaType = 'photo' | 'video';
export type MemoryCategory =
  | 'photo'
  | 'video'
  | 'chat_screenshot'
  | 'document_screenshot'
  | 'general'
  | 'present';

export type CardVisualVariant = 'polaroid' | 'print' | 'strip' | 'diary' | 'phone';

export interface MemoryItem {
  id: string;
  year: number | 'CURRENT' | 'FUTURE';
  date: string;
  title: string;
  subtitle: string;
  description?: string; // Story context
  category: MemoryCategory;
  type: MemoryMediaType; // 'photo' | 'video' for underlying media element
  media: string;
  gallery?: string[]; // Multiple photos if applicable
  location?: string;
  quote?: string;
  cardStyle?: CardVisualVariant;
  rotation?: number;
  aspectRatio?: '4/3' | '1/1' | '16/9' | '3/4' | '9/16' | 'auto';
  duration?: string; // For video memories
  featured?: boolean;
  transcript?: string; // Full text for document/chat readability
  sender?: string; // For chat screenshots e.g. "Prachi"
}

export interface YearChapterData {
  year: number | 'CURRENT' | 'FUTURE';
  displayYear: string;
  title: string;
  theme: string;
  description: string;
  memories: MemoryItem[];
}

