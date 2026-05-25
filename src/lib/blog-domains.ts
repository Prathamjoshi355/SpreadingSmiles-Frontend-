export const blogDomains = [
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'animal-welfare', label: 'Animal Welfare' },
  { value: 'education', label: 'Education' },
  { value: 'awareness', label: 'Awareness' },
  { value: 'elderly-care', label: 'Elderly Care' },
  { value: 'environment', label: 'Environment' },
  { value: 'child-welfare', label: 'Child Welfare' },
] as const;

export type BlogDomain = (typeof blogDomains)[number]['value'];
