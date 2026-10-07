export const QUESTION_TOPICS = [
  "Islamic Economics",
  "Dars / Quran",
  "Lectures",
  "Books",
  "General",
] as const;

export type QuestionTopic = (typeof QUESTION_TOPICS)[number];
