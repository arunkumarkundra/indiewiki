export const categories = [
  { id: 'start', label: 'Start', icon: '↗', description: 'Choose a problem worth your attention and find a starting point.' },
  { id: 'validate', label: 'Validate', icon: '◉', description: 'Learn from potential customers before overbuilding.' },
  { id: 'product', label: 'Product', icon: '▤', description: 'Shape a useful product and keep scope intentional.' },
  { id: 'build', label: 'Build', icon: '⌘', description: 'Make implementation decisions you can maintain.' },
  { id: 'ai-building', label: 'AI building', icon: '✳', description: 'Work effectively with coding assistants and agents.' },
  { id: 'tech-stack', label: 'Tech stack', icon: '▦', description: 'Choose tools around constraints, not hype.' },
  { id: 'quality', label: 'Quality', icon: '✓', description: 'Make software accessible, secure, clear, and dependable.' },
  { id: 'ship', label: 'Ship', icon: '↑', description: 'Release safely and learn from real use.' },
  { id: 'grow', label: 'Grow', icon: '⌁', description: 'Find and reach the people who need your product.' },
  { id: 'sales', label: 'Sales', icon: '↗', description: 'Have useful conversations and make clear offers.' },
  { id: 'monetize', label: 'Monetize', icon: '$', description: 'Price and package around value and sustainability.' },
  { id: 'retain', label: 'Retain', icon: '↻', description: 'Help users reach value and keep getting it.' },
  { id: 'operate', label: 'Operate', icon: '⚙', description: 'Keep a small product and team healthy over time.' },
  { id: 'business', label: 'Business', icon: '□', description: 'Understand the operating work around a product.' },
  { id: 'recipes', label: 'Recipes', icon: '≋', description: 'Repeatable workflows for common builder tasks.' },
  { id: 'checklists', label: 'Checklists', icon: '☷', description: 'Practical prompts for high-leverage reviews.' },
  { id: 'case-studies', label: 'Case studies', icon: '◌', description: 'Context-rich examples, with limits made explicit.' },
  { id: 'tools', label: 'Tools', icon: '⌕', description: 'Evaluate tool categories with clear criteria.' },
  { id: 'templates', label: 'Templates', icon: '▧', description: 'Starting documents you can adapt to your context.' },
  { id: 'reference', label: 'Reference', icon: '≡', description: 'Definitions and durable concepts in one place.' },
] as const;

export type CategoryId = (typeof categories)[number]['id'];
export const categoryById = new Map(categories.map((category) => [category.id, category]));
