export enum SnippetCategory {
  FRACTIONS = 'fractions',
  MATRICES = 'matrices',
  OPERATORS = 'operators',
  GREEK = 'greek',
  SETS = 'sets',
  CALCULUS = 'calculus',
  PROBABILITY = 'probability',
  BRACKETS = 'brackets',
  SUBSCRIPTS = 'subscripts',
}

export interface Placeholder {
  index: number;
  default: string;
  start: number;
  end: number;
}

export interface Snippet {
  id: string;
  label: string;
  category: SnippetCategory;
  latex: string;
  description?: string;
  preview?: string;
  placeholders?: Placeholder[];
  keywords: string[];
}
